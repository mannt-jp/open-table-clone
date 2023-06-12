"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { authActions } from "@/app/store/AuthSlice";
import { getCookie, removeCookies } from "cookies-next";

export default function useAuth() {
  const dispatch = useDispatch();
  const signIn = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
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
  const signUp = async (
    {
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
    },
    handleClose: () => void
  ) => {
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
      dispatch(authActions.setLoading(false));
      dispatch(authActions.setData(response.data));
      handleClose();
    } catch (e: any) {
      dispatch(authActions.setLoading(false));
      dispatch(authActions.setError(e.response.data.errorMessage));
    }
  };
  const logOut = () => {
    removeCookies("jwt");
    dispatch(authActions.setData(null));
  }
  return { signIn, signUp, logOut};
}
