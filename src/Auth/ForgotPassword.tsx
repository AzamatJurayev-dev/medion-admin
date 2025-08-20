import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("To‘g‘ri email kiriting"),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: ForgotPasswordInput) => {
      const res = await axios.post(
        "http://localhost:1337/api/auth/forgot-password",
        data
      );
      return res.data;
    },
    onSuccess: () => {
      setSuccessMessage("Emailingizga tiklash linki yuborildi.");
    },
    onError: () => {
      setSuccessMessage("Xatolik yuz berdi. Emailni tekshiring.");
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Parolni tiklash
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Tiklash linkini yuborish
        </button>
      </form>

      {successMessage && (
        <p className="text-green-600 text-sm mt-4 text-center">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
