import React from "react";
import Modal from "./Modal";
import useSampleRegisterModal from "@/app/utils/hooks/useSampleRegisterModal";
import Button from "../Button";
import Input from "../Input";
import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const sampleRegisterModal = useSampleRegisterModal();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<registerSampleFormData>({
    resolver: zodResolver(registerSampleFormSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    reset();
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
