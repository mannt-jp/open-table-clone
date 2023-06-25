"use client";

import { useState } from "react";
import useReservation from "../../../../../hooks/useReservation";
import { CircularProgress } from "@mui/material";

export default function Form({
  slug,
  day,
  time,
  partySize,
}: {
  slug: string;
  day: string;
  time: string;
  partySize: string;
}) {
  const { loading, error, alreadyBooked, fetchReversation } = useReservation();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    occasion: "",
    requests: "",
  });

  const isFormValid =
    input.firstName !== "" &&
    input.lastName !== "" &&
    input.phoneNumber !== "" &&
    input.email !== "";

  const handleClick = async () => {
    const data = await fetchReversation({
      slug,
      day,
      time,
      partySize: parseInt(partySize),
      bookerFirstName: input.firstName,
      bookerLastName: input.lastName,
      bookerEmail: input.email,
      bookerOccasion: input.occasion,
      bookerRequest: input.requests,
      bookerPhone: input.phoneNumber,
    });
    console.log(data);
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {alreadyBooked ? (
        <div>
          <h1>You are all booked up!</h1>
          <p>Enjoy your meal!</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            value={input.firstName}
            onChange={(e) => setInput({ ...input, firstName: e.target.value })}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            value={input.lastName}
            onChange={(e) => setInput({ ...input, lastName: e.target.value })}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            value={input.phoneNumber}
            onChange={(e) =>
              setInput({ ...input, phoneNumber: e.target.value })
            }
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            value={input.occasion}
            onChange={(e) => setInput({ ...input, occasion: e.target.value })}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            value={input.requests}
            onChange={(e) => setInput({ ...input, requests: e.target.value })}
          />
          <button
            disabled={!isFormValid || loading}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress></CircularProgress>
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
}
