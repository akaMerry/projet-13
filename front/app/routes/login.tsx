import { isFulfilled, isRejected } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getToken, getUser, useAppDispatch, useAppSelector } from "~/store";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const user = useAppSelector((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget as HTMLFormElement)
    ) as {
      email: string;
      password: string;
    };

    const tokenStorage = (e.currentTarget as HTMLFormElement).tokenStorage
      .checked;

    const token = await dispatch(getToken({ ...formData, tokenStorage }));
    if (isFulfilled(token)) {
      await dispatch(getUser());
      if (isFulfilled(token)) {
        setError(false);
        navigate("/dashboard");
      }
    } else if (isRejected(token)) {
      setError(true);
    }
  };

  return (
    <section className="sign-in-content flex relative min-w-full min-h-full justify-center bg-slate-200">
      <form
        onSubmit={handleSubmit}
        className="flex static flex-col justify-center h-fit w-75 bg-white p-8 mt-12"
      >
        <div className="flex w-full items-center justify-center">
          <i className="fa fa-user-circle text-gray-700 flex m-3"></i>
        </div>
        <h1 className="text-center text-2xl font-bold text-gray-700">
          Sign In
        </h1>
        <label htmlFor="email" className="pt-3 text-gray-700 text-md font-bold">
          Username
        </label>
        <input
          className={`border p-1 rounded-sm ${error ? "border-red-600" : "border-gray-700"}`}
          type="text"
          name="email"
          id="email"
          required
        ></input>
        <label
          htmlFor="password"
          className="pt-3 text-gray-700 text-md font-bold"
        >
          Password
        </label>
        <input
          className={`border p-1 rounded-sm ${error ? "border-red-600" : "border-gray-700"}`}
          type="password"
          name="password"
          id="password"
          required
        ></input>
        {error === true ? (
          <>
            <div className="pt-1 pb-1">
              <p className="text-red-600 text-xs font-bold">
                L'identifiant ou le mot de passe est incorrect
              </p>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="inline-flex pt-3">
          <input type="checkbox" id="tokenStorage" className="mr-1.5"></input>
          <label>Remember me</label>
        </div>
        <button
          type="submit"
          className="bg-emerald-500 p-2 mt-4 cursor-pointer"
        >
          <p className="text-white text-lg font-bold underline">Sign In</p>
        </button>
      </form>
    </section>
  );
}
