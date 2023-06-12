"use client";

import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import validator from "validator";
import { useDispatch } from "react-redux";

export default function AuthModalInputs({ isSignIn, handleClose }: { isSignIn: Boolean, handleClose: () => void }) {
  const { signIn, signUp } = useAuth();
  const [buttonWasClicked, setButtonWasClicked] = useState(false)
  const handleClick = async () => {
    setButtonWasClicked(true);
    if (isSignIn) {
      const response = await signIn({
        email: inputVals.email,
        password: inputVals.password,
      }, handleClose);
    } else {
      signUp({
        email: inputVals.email,
        password: inputVals.password,
        firstName: inputVals.firstName,
        lastName: inputVals.lastName,
        phone: inputVals.phone,
        city: inputVals.city,
      }, handleClose);
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

  const inputFieldIsInvalid = {
    firstName: inputVals.firstName.trim().length == 0,
    lastName: inputVals.lastName.trim().length == 0,
    email: !validator.isEmail(inputVals.email),
    phone: inputVals.phone.trim().length == 0,
    city: inputVals.city.trim().length == 0,
    password: !validator.isStrongPassword(inputVals.password),
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
  };

  return (
    <div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            name="firstName"
            className={`border rounded p-2 p-3 w-[49%] `}
            placeholder="First Name"
            onChange={inputChangeHandler}
            value={inputVals.firstName}
          ></input>
          <input
            type="text"
            name="lastName"
            className={`border rounded p-2 p-3 w-[49%] `}
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
          className={`border rounded p-2 p-3 w-full `}
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
            className={`border rounded p-2 p-3 w-[49%] 
              `}
            placeholder="Phone"
            onChange={inputChangeHandler}
            value={inputVals.phone}
          ></input>
          <input
            type="text"
            name="city"
            className={`border rounded p-2 p-3 w-[49%]`}
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
          className={`border rounded p-2 p-3 w-full `}
          placeholder="Password"
          onChange={inputChangeHandler}
          value={inputVals.password}
        ></input>
      </div>
      <button
        className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
        onClick={handleClick}
        disabled={!inputFormIsValid && buttonWasClicked}
      >
        {isSignIn ? "Log in" : "Create account"}
      </button>
    </div>
  );
}
