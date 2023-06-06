"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInput";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Alert, CircularProgress } from "@mui/material";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: Boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  return (
    <div>
      <Button
        className={
          isSignIn
            ? "bg-blue-400 text-white "
            : "" + "border p-1 px-4 rounded mr-3"
        }
        onClick={handleOpen}
      >
        {isSignIn ? "Sign in" : "Sign up"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="text-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2">
              {error ? (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              ) : (
                ""
              )}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  {isSignIn ? "Sign In" : "Create Account"}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {isSignIn
                    ? "Log into your account"
                    : "Create your OpenTable account"}
                </h2>
                <AuthModalInputs isSignIn={isSignIn} handleClose={handleClose}></AuthModalInputs>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
