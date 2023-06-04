"use client";

import axios from "axios";

export default function useAuth() {
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const signUp = async ({
    email,
    password,
    phone,
    firstName,
    lastName,
    city,
  }: {
    email: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    city: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          phone,
          firstName,
          lastName,
          city,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return { signIn, signUp };
}
