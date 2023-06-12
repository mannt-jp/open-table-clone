"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/AuthSlice";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useEffect } from "react";
import { RootState } from "../store";
import { Button } from "@mui/material";
import AuthModal from "./AuthModal";
import useAuth from "../../../hooks/useAuth";

export default function NavBar() {
  const { loading, data } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { logOut } = useAuth();
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
        {loading ? null : (
          <div className="flex">
            {data ? (
              <button
                className="bg-blue-500 text-white border p-1 px-4 rounded mr-3"
                onClick={logOut}
              >
                Log out
              </button>
            ) : (
              <>
                <AuthModal isSignIn={true}></AuthModal>
                <AuthModal isSignIn={false}></AuthModal>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
