"use client";

import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import validator from "validator";

export default function AuthModalInputs({ isSignIn }: { isSignIn: Boolean }) {
  const { signIn, signUp } = useAuth();
  const handleClick = () => {
    setInputValsWasTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      city: true,
      password: true,
    });
    if (isSignIn) {
      signIn({ email: inputVals.email, password: inputVals.password });
    } else {
      signUp({
        email: inputVals.email,
        password: inputVals.password,
        firstName: inputVals.firstName,
        lastName: inputVals.lastName,
        phone: inputVals.phone,
        city: inputVals.city,
      });
    }
  };

  const [inputVals, setInputVals] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const [inputValsWasTouched, setInputValsWasTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    city: false,
    password: false,
  });

  const inputFieldIsInvalid = {
    firstName:
      inputVals.firstName.trim().length == 0 && inputValsWasTouched.firstName,
    lastName:
      inputVals.lastName.trim().length == 0 && inputValsWasTouched.lastName,
    email: !validator.isEmail(inputVals.email) && inputValsWasTouched.email,
    phone: inputVals.phone.trim().length == 0 && inputValsWasTouched.phone,
    city: inputVals.city.trim().length == 0 && inputValsWasTouched.city,
    password:
      !validator.isStrongPassword(inputVals.password) &&
      inputValsWasTouched.password,
  };

  let inputFormIsValid = false;
  if (isSignIn) {
    inputFormIsValid =
      !inputFieldIsInvalid.email && !inputFieldIsInvalid.password;
  } else {
    inputFormIsValid =
      !inputFieldIsInvalid.firstName &&
      !inputFieldIsInvalid.lastName &&
      !inputFieldIsInvalid.phone &&
      !inputFieldIsInvalid.city &&
      !inputFieldIsInvalid.email &&
      !inputFieldIsInvalid.password;
  }
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVals((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setInputValsWasTouched((prev) => {
      return { ...prev, [e.target.name]: true };
    });
  };
  return (
    <div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            name="firstName"
            className={`border rounded p-2 p-3 w-[49%] ${
              inputFieldIsInvalid.firstName && "border-red-500"
            }`}
            placeholder="First Name"
            onChange={inputChangeHandler}
            value={inputVals.firstName}
          ></input>
          <input
            type="text"
            name="lastName"
            className={`border rounded p-2 p-3 w-[49%] ${
              inputFieldIsInvalid.lastName && "border-red-500"
            }`}
            placeholder="Last Name"
            onChange={inputChangeHandler}
            value={inputVals.lastName}
          ></input>
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          name="email"
          className={`border rounded p-2 p-3 w-full ${
            inputFieldIsInvalid.email && "border-red-500"
          }`}
          placeholder="Email"
          onChange={inputChangeHandler}
          value={inputVals.email}
        ></input>
      </div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            name="phone"
            className={`border rounded p-2 p-3 w-[49%] ${
              inputFieldIsInvalid.phone && "border-red-500"
            }`}
            placeholder="Phone"
            onChange={inputChangeHandler}
            value={inputVals.phone}
          ></input>
          <input
            type="text"
            name="city"
            className={`border rounded p-2 p-3 w-[49%] ${
              inputFieldIsInvalid.city && "border-red-500"
            }`}
            placeholder="City"
            onChange={inputChangeHandler}
            value={inputVals.city}
          ></input>
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          name="password"
          className={`border rounded p-2 p-3 w-full ${
            inputFieldIsInvalid.password && "border-red-500"
          }`}
          placeholder="Password"
          onChange={inputChangeHandler}
          value={inputVals.password}
        ></input>
      </div>
      <button
        className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
        onClick={handleClick}
        disabled={!inputFormIsValid}
      >
        {isSignIn ? "Log in" : "Create account"}
      </button>
    </div>
  );
}
