"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { authActions } from "@/app/store/AuthSlice";

export default function useAuth() {
  const { loading, data, error } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }, handleClose: () => void) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      dispatch(authActions.setLoading(false));
      dispatch(authActions.setData(response.data));
      handleClose();
    } catch (e: any) {
      dispatch(authActions.setLoading(false));
      dispatch(authActions.setError(e.response.data.errorMessage));
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
      const responseData = await response.data;
      return responseData;
    } catch (error) {
      throw new Error("There was an error :(");
    }
  };
  return { signIn, signUp };
}
