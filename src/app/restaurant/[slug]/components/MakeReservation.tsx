"use client";
import { partySize, times } from "@/data";
import { useState } from "react";
import DatePicker from "react-datepicker";
import useAvailabilities from "../../../../../hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
export default function MakeReservation({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState(openTime);
  const [selectedPartySize, setSelectedPartySize] = useState(1);

  const { loading, data, error, fetchAvailability } = useAvailabilities();

  const filterTime = () => {
    let isWithinWindow = false;
    const filteredTimes: typeof times = [];
    times.forEach((time) => {
      if (time.time === openTime) isWithinWindow = true;
      if (time.time === closeTime) isWithinWindow = false;
      if (isWithinWindow) filteredTimes.push(time);
    });
    return filteredTimes;
  };

  const handleClick = () => {
    fetchAvailability({
      slug,
      day: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      partySize: selectedPartySize,
    });
    console.log(data);
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
            value={selectedPartySize}
            onChange={(e) => setSelectedPartySize(parseInt(e.target.value))}
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
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date ? date : new Date())}
              className="text-center py-3 border-b font-light w-full"
              dateFormat="MMMM dd"
            ></DatePicker>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Time</label>
            <select
              name=""
              id=""
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="text-center py-3 border-b font-light"
            >
              {filterTime().map((time) => (
                <option value={time.time}>{time.displayTime}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            disabled={loading}
            className={`bg-red-600 rounded w-full px-4 text-white font-bold h-16 ${
              loading ? "bg-gray-500" : ""
            }`}
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit"></CircularProgress>
            ) : (
              "Find a time"
            )}
          </button>
          {data && data.length ? (
            <div className="mt-4">
              <p className="text-reg">Select a time</p>
              <div className="flex flex-wrap mt-2">
                {data.map((item) =>
                  item.availability ? (
                    <Link
                      href={`/reserve/${slug}?date=${selectedDate.toDateString()}T${item.time}&partySize=${selectedPartySize}`}
                      className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                    >
                      <p className="text-sm font-bold">{item.time}</p>
                    </Link>
                  ) : (
                    <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></p>
                  )
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
