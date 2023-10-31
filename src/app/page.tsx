"use client";

import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./components/Input";
import Button from "./components/Button";
import { useRouter } from "next/navigation";

const loginUserFormSchema = z.object({
  username: z.string().min(1, "O campo de usuário é obrigatório"),
  password: z.string().min(1, "O campo de senha é obrigatório"),
});

type loginUserFormData = z.infer<typeof loginUserFormSchema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
    router.push("/home");
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
                id="username"
                label="Usuário"
                errors={errors.username}
                register={register}
              />
            </div>
            <div>
              <Input
                id="password"
                label="Senha"
                errors={errors.password}
                register={register}
              />
            </div>
            <div className="flex justify-end mt-2">
              <button className="text-primary-blue text-sm font-bold">
                Esqueci minha senha
              </button>
            </div>
            <div className="w-full mt-6">
              <Button type="submit" label="Entrar" />
            </div>
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
