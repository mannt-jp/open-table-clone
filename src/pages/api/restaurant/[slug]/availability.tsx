import { times } from "@/data";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
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
      select: { id: true, tables: true, open_time: true, close_time: true },
      where: { slug },
    });

    if (!restaurant)
      return res.status(400).json({ errorMessage: "Invalid query" });

    let searchTimes = times.find((t) => {
      return t.time === time;
    })?.searchTimes;

    if (!searchTimes) {
      return res.status(400).json({ errorMessage: "Invalid query" });
    }

    searchTimes = searchTimes.filter(
      (searchTime) =>
        new Date(`${day}T${searchTime}`) <
          new Date(`${day}T${restaurant.close_time}`) &&
        new Date(`${day}T${searchTime}`) >=
          new Date(`${day}T${restaurant.open_time}`)
    );

    let notAvailableTime: string[] = [];

    const seatOfTables = restaurant.tables.map((table) => {
      return { id: table.id, seats: table.seats };
    });

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

    const table_ids = restaurant.tables.map((table) => table.id);

    bookings.forEach((booking) => {
      const booked_table_ids = booking.tables.map((table) => table.table_id);
      const available_table_ids = table_ids.filter(
        (table) => !booked_table_ids.includes(table)
      );
      const totalSeats = seatOfTables
        .filter((table) => available_table_ids.includes(table.id))
        .reduce((prev, cur) => (prev += cur.seats), 0);
      if (totalSeats < parseInt(partySize)) {
        notAvailableTime.push(booking.booking_time.toISOString().split("T")[1]);
      }
    });

    let availability: any = [];
    searchTimes.forEach((time) => {
      availability.push({
        time,
        availability: !notAvailableTime.includes(time),
      });
    });
    return res.status(200).json(availability);
  }
}
