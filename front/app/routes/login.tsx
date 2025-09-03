import React from "react";
import { useNavigate } from "react-router";
import { getUser, useAppDispatch } from "~/store";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget as HTMLFormElement)
    ) as {
      email: string;
      password: string;
    };

    const result = await dispatch(getUser(formData));

    if (getUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };
  return (
    <section className="sign-in-content flex relative min-w-full min-h-full justify-center bg-slate-200 dark:bg-[#12002b]">
      <form
        onSubmit={handleSubmit}
        className="flex static flex-col justify-center h-90 w-75 bg-white p-8 mt-12"
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
          className="border border-gray-700 p-1 rounded-sm"
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
          className="border border-gray-700 p-1 rounded-sm"
          type="password"
          name="password"
          id="password"
          required
        ></input>
        <div className="inline-flex pt-3 pb-3">
          <input type="checkbox"></input>
          <label>Remember me</label>
        </div>
        <button type="submit" className="bg-emerald-500 p-2">
          <p className="text-white text-lg font-bold underline">Sign In</p>
        </button>
      </form>
    </section>
  );
}
