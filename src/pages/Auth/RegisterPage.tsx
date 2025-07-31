/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/cookie";
import { registerUser } from "./api";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: any) => {
      setToken(data.jwt);
      navigate("/");
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate({
      username: data.username,
      password: data.password,
      email: data.email,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-2/3 flex-col gap-4 items-center justify-center "
    >
      <h1 className="text-2xl">Register Page</h1>
      <input
        {...register("username", { required: "Username is required" })}
        value={username}
        placeholder="Username"
        className="border px-4 py-2 rounded-lg w-full"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        {...register("email", { required: "Email is required" })}
        value={email}
        placeholder="Email"
        className="border px-4 py-2 rounded-lg w-full"
        onChange={(e) => setEmail(e.target.value)}
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
        Register
      </button>
      <button onClick={() => navigate("/login")}>I have already account</button>
    </form>
  );
};

export default RegisterPage;
