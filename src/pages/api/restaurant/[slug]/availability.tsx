import { times } from "@/data";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };
  if (!day || !time || !partySize) {
    return res.status(400).json({ errorMessage: "Invalid query" });
  }

  const restaurant = await prisma.restaurant.findUnique({
    select: { id: true, tables: true },
    where: { slug },
  });

  if (!restaurant) {
    return res.status(400).json({ errorMessage: "Invalid query" });
  }

  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({ errorMessage: "Invalid query" });
  }

  // Bookings of the restaurant in time window.
  const bookings = await prisma.booking.findMany({
    select: { booking_time: true, number_of_people: true, tables: true },
    where: {
      restaurant_id: restaurant.id,
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
  });

  const table_ids = restaurant.tables.map(table => table.id)

  bookings.forEach(booking => {
    const booking_table_ids = booking.tables.map(table => table.table_id)
    const available_table_ids = table_ids.filter(table => !booking_table_ids.includes(table));
    
  })

  return res.status(200).json({ searchTimes });
}
