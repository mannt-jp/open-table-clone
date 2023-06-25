"use client";

import axios from "axios";
import { useState } from "react";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const fetchReversation = async ({
    slug,
    day,
    time,
    partySize,
    bookerFirstName,
    bookerLastName,
    bookerEmail,
    bookerOccasion,
    bookerRequest,
    bookerPhone,
  }: {
    slug: string;
    day: string;
    time: string;
    partySize: number;
    bookerFirstName: string;
    bookerLastName: string;
    bookerEmail: string;
    bookerOccasion: string;
    bookerRequest: string;
    bookerPhone: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerEmail,
          bookerOccasion,
          bookerRequest,
          bookerPhone,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setAlreadyBooked(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { loading, error, alreadyBooked, fetchReversation };
}
