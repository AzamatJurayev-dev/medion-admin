/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "./api";
import { setToken } from "../../utils/cookie";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      setToken(data.jwt);
      navigate("/");
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate({ identifier: data.username, password: data.password });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-2/3 flex-col gap-4 items-center justify-center "
    >
      <h1 className="text-2xl">Login Page</h1>
      <input
        {...register("username", { required: "Username is required" })}
        value={identifier}
        placeholder="Username"
        className="border px-4 py-2 rounded-lg w-full"
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        type="password"
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
        className="border px-4 py-2 rounded-lg w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 px-4 py-2 rounded-lg text-white text-lg"
      >
        Login
      </button>
      <button onClick={() => navigate('/forgot-password')}>Forgot password</button>
      <button onClick={() => navigate("/register")}>Create accaunt</button>
    </form>
  );
};

export default LoginPage;
