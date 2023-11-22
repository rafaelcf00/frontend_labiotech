import React from "react";
import Modal from "./Modal";
import useSampleRegisterModal from "@/app/utils/hooks/useSampleRegisterModal";
import Button from "../Button";
import Input from "../Input";
import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSampleService } from "@/app/services/sample.service";
import { Sample } from "@/app/models/Sample";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type SampleRegisterModalProps = {
  isOpen?: boolean;
  onClose: () => void;
};

const registerSampleFormSchema = z.object({
  name: z.string().min(1, "O campo de nome é obrigatório"),
  temperature: z.string().min(1, "O campo de temperatura é obrigatório"),
  ph: z.string().min(1, "O campo de ph é obrigatório"),
});

type registerSampleFormData = z.infer<typeof registerSampleFormSchema>;

const SampleRegisterModal: React.FC<SampleRegisterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const sampleService = useSampleService();
  const sampleRegisterModal = useSampleRegisterModal();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Sample>({
    resolver: zodResolver(registerSampleFormSchema),
  });
  const router = useRouter();
  const { data: session, status } = useSession();
  const onSubmit = (data: Sample) => {
    const { name, temperature, ph } = data;
    console.log(session?.user?.id);
    sampleService
      .POST(
        1,
        {
          id: 342342,
          name,
          temperature: temperature,
          ph: ph,
          userId: 1,
        },
        session?.user?.accessToken
      )
      .then((res) => {
        toast.success("Criado com sucesso");
        sampleRegisterModal.onClose();
        reset();
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <>
          <h1 className="text-primary-blue font-bold text-xl">
            Cadastro de Amostra
          </h1>
        </>
      }
      body={
        <>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <Input
                  type="text"
                  id="name"
                  label="Nome"
                  errors={errors.name}
                  register={register}
                />
              </div>
              <div className="mb-5">
                <Input
                  type="text"
                  id="temperature"
                  label="Temperatura"
                  errors={errors.temperature}
                  register={register}
                />
              </div>
              <div className="mb-5">
                <Input
                  type="text"
                  id="ph"
                  label="Ph"
                  errors={errors.ph}
                  register={register}
                />
              </div>
              <div className="w-full mt-6">
                <Button type="submit" label="Cadastrar" />
              </div>
            </form>
          </div>
        </>
      }
    />
  );
};

export default SampleRegisterModal;
