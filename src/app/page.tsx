"use client";

import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./components/Input";
import Button from "./components/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "./components/Loader";

const loginUserFormSchema = z.object({
  email: z.string().min(1, "O campo de email é obrigatório"),
  password: z.string().min(1, "O campo de senha é obrigatório"),
});

type loginUserFormData = z.infer<typeof loginUserFormSchema>;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const onSubmit = (data: loginUserFormData) => {
    setLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback: any) => {
      if (callback.error) {
        setLoading(false);
        toast.error(callback.error);
      } else {
        setLoading(false);
        router.push("/home");
        toast.success("Logado com sucesso");
      }
    });
  };

  return (
    <div className="bg-primary-blue min-h-screen w-full mx-auto flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-xl w-[80%] md:w-[40%]">
        <div>
          <h1 className="text-primary-blue text-xl text-center font-bold">
            Login
          </h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Input
                type="text"
                id="email"
                label="E-mail"
                errors={errors.email}
                register={register}
              />
            </div>
            <div>
              <Input
                type="password"
                id="password"
                label="Senha"
                errors={errors.password}
                register={register}
              />
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className="w-full mt-6">
                <Button type="submit" label="Entrar" />
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={() => router.push("/register")}
                className="text-primary-blue font-bold text-lg"
              >
                Cadastrar-se
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
