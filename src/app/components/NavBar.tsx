"use client"

import Link from "next/link";
import LoginModal from "./AuthModal";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useEffect } from "react";
export default function NavBar() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    dispatch(authActions.setLoading(true));
    try {
      const jwt = getCookie("jwt");
      if (!jwt) {
        return dispatch(authActions.setLoading(false));
      }
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      dispatch(authActions.setLoading(false));
      dispatch(authActions.setData(response.data));
    } catch (e: any) {
      dispatch(authActions.setLoading(false));
      dispatch(authActions.setData(e.response.data.errorMessage));
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          <LoginModal isSignIn={true}></LoginModal>
          <LoginModal isSignIn={false}></LoginModal>
        </div>
      </div>
    </nav>
  );
}
