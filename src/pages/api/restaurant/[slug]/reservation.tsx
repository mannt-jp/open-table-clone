import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    const {
      bookerEmail,
      bookerPhone,
      bookerFirstName,
      bookerLastName,
      bookerOccasion,
      bookerRequest,
    } = req.body;

    if (!day || !time || !partySize) {
      return res.status(400).json({ errorMessage: "Invalid query" });
    }
    let intPartySize = 0;
    try {
      intPartySize = parseInt(partySize);
    } catch (e) {
      return res.status(400).json({ errorMessage: "Invalid query" });
    }

    const restaurant = await prisma.restaurant.findUnique({
      select: { id: true, tables: true, open_time: true, close_time: true },
      where: { slug },
    });

    if (!restaurant)
      return res
        .status(400)
        .json({ errorMessage: "Restaurant does not exist" });

    const isWithinOpeningTime =
      new Date(`${day}T${time}`) <
        new Date(`${day}T${restaurant.close_time}`) &&
      new Date(`${day}T${time}`) >= new Date(`${day}T${restaurant.open_time}`);

    if (!isWithinOpeningTime) {
      return res
        .status(400)
        .json({ errorMessage: "Time is not within opening time!" });
    }

    const seatOfTables = restaurant.tables.map((table) => {
      return { id: table.id, seats: table.seats };
    });

    const booking = await prisma.booking.findFirst({
      select: { booking_time: true, number_of_people: true, tables: true },
      where: {
        restaurant_id: restaurant.id,
        booking_time: new Date(`${day}T${time}`),
      },
    });

    const table_ids = restaurant.tables.map((table) => table.id);

    const bookedTableIds = booking
      ? booking.tables.map((table) => table.table_id)
      : [];
    const availableTableIds = table_ids.filter(
      (table) => !bookedTableIds.includes(table)
    );
    let availableTablesInfo = seatOfTables.filter((table) =>
      availableTableIds.includes(table.id)
    );
    const totalSeats = availableTablesInfo.reduce(
      (prev, cur) => (prev += cur.seats),
      0
    );
    if (totalSeats < intPartySize) {
      return res
        .status(400)
        .json({ errorMessage: "This time is not available!" });
    } else {
      // Reconstruct availableTablesInfo to seatWithTableIds
      // example of seatWithTableIds: {
      //   2: [1, 7, 9],
      //   4: [4, 6],
      //   6: [3, 5, 8],
      //   8: [2, 10, 11],
      // };
      let seatWithTableIds: {
        [tableType: number]: number[];
      } = {};
      availableTablesInfo.forEach((table) => {
        if (!seatWithTableIds[table.seats])
          seatWithTableIds[table.seats] = [table.id];
        else seatWithTableIds[table.seats].push(table.id);
      });

      // example of tableTypes: [8, 6, 4, 2];
      const tableTypes = Object.keys(seatWithTableIds)
        .map((t) => parseInt(t, 10))
        .sort((a, b) => b - a);

      // Define remainingSeats, which is the number of seats left to place tables.
      // Initially it would be intPartySize, if intPartySize is odd then add 1.
      // If remainingSeats is still less than x: the number of seats of the smallest table, assign it with x.
      let remainingSeats =
        intPartySize % 2 === 0 ? intPartySize : intPartySize + 1;
      if (remainingSeats < tableTypes[tableTypes.length - 1])
        remainingSeats = tableTypes[tableTypes.length - 1];

      let argMax = 0; // is the index of tableTypes, tableTypes[argMax] indicates the number of seats of largest table that is still leq than remainingSeats

      let chosenTableIds: number[] = [];
      while (remainingSeats > 0 && argMax < tableTypes.length) {
        console.log("Remaining seats: ", remainingSeats);
        if (remainingSeats < tableTypes[argMax]) {
          console.log(
            `Remaining seats ${remainingSeats} is lower than ${tableTypes[argMax]}`
          );
          console.log("------------------------");
          argMax++;
          continue;
        }
        console.log("Getting table of ", tableTypes[argMax]);
        const pickedTableId = seatWithTableIds[tableTypes[argMax]].shift();
        if (pickedTableId) chosenTableIds.push(pickedTableId);
        console.log("Chosen tables: ", chosenTableIds);
        remainingSeats -= tableTypes[argMax];
        if (seatWithTableIds[tableTypes[argMax]].length === 0) argMax++;
        console.log("------------------------");
      }
      const booking = await prisma.booking.create({
        data: {
          number_of_people: intPartySize,
          booking_time: new Date(`${day}T${time}`),
          restaurant_id: restaurant.id,
          booker_email: bookerEmail,
          booker_phone: bookerPhone,
          booker_first_name: bookerFirstName,
          booker_last_name: bookerLastName,
          booker_request: bookerRequest,
          booker_occasion: bookerOccasion,
        },
      });
      if (chosenTableIds) {
        const bookingsOnTablesData = chosenTableIds.map((table_id) => {
          return {
            table_id,
            booking_id: booking.id,
          };
        });

        await prisma.bookingsOnTables.createMany({
          data: bookingsOnTablesData,
        });
      }
    }
    return res.status(200).json(booking);
  }
}
