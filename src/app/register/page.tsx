"use client";

import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import { useSampleService } from "../services/sample.service";

const registerUserFormSchema = z.object({
  name: z.string().min(1, "O campo de nome é obrigatório"),
  email: z
    .string()
    .min(1, "O campo de email é obrigatório")
    .email("Não é um email válido"),
  username: z.string().min(1, "O campo de email é obrigatório"),
  password: z.string().min(1, "O campo de senha é obrigatório"),
});

type registerUserFormData = z.infer<typeof registerUserFormSchema>;

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<registerUserFormData>({
    resolver: zodResolver(registerUserFormSchema),
  });

  const sampleService = useSampleService();

  const onSubmit = (data: registerUserFormData) => {
    console.log(data);
    reset();
    router.push("/");
  };

  return (
    <div className="bg-primary-blue min-h-screen w-full mx-auto flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-xl w-[80%] md:w-[40%]">
        <div>
          <h1 className="text-primary-blue text-xl text-center font-bold">
            Cadastro
          </h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Input
                id="name"
                label="Nome"
                errors={errors.name}
                register={register}
              />
            </div>
            <div className="mb-5">
              <Input
                id="email"
                label="E-mail"
                errors={errors.email}
                register={register}
              />
            </div>
            <div className="mb-5">
              <Input
                id="email"
                label="E-mail"
                errors={errors.email}
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
            <div className="w-full mt-6">
              <Button type="submit" label="Cadastrar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
