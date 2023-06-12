"use client";
import { partySize, times } from "@/data";
import { useState } from "react";
import DatePicker from "react-datepicker";
export default function MakeReservation({
  openTime,
  closeTime,
}: {
  openTime: string;
  closeTime: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  let isWithinWindow = false;

  const filterTime = () => {
    const filteredTimes: typeof times = [];
    times.forEach((time) => {
      if (time.time === openTime) isWithinWindow = true;
      if (time.time === closeTime) isWithinWindow = false;
      if (isWithinWindow) filteredTimes.push(time);
    });
    return filteredTimes;
  };

  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select
            name=""
            className="text-center py-3 border-b font-light"
            id=""
          >
            {partySize.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col w-full">
            <label htmlFor="">Date</label>
            {/* <input type="text" className="py-3 border-b font-light w-28" /> */}
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="text-center py-3 border-b font-light w-full"
              dateFormat="MMMM dd"
            ></DatePicker>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Time</label>
            <select
              name=""
              id=""
              className="text-center py-3 border-b font-light"
            >
              {filterTime().map((time) => (
                <option value={time.time}>{time.displayTime}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
            Find a Time
          </button>
        </div>
      </div>
    </div>
  );
}
