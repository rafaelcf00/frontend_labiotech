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


type SampleRegisterModalProps = {
  isOpen?: boolean;
  onClose: () => void;
};

const registerSampleFormSchema = z.object({
  name: z.string().min(1, "O campo de nome é obrigatório"),
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
    console.log(data);
    sampleService.POST(
     session?.user?.id,data,session?.user?.accessToken
    ).then((res) => {
      console.log("Criado");
      sampleRegisterModal.onClose();
      reset();
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
                  id="name"
                  label="Nome"
                  errors={errors.name}
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
