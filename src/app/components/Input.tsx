import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  errors: any;
  type: string;
};

const Input: React.FC<InputProps> = ({ register, label, errors, id, type = "text" }) => {
  return (
    <div className="flex flex-col">
      <label className="text-primary-blue font-bold" htmlFor="">
        {label}
      </label>
      <input
        className="bg-[#ECEDEE] rounded-md  p-2"
        id={id}
        {...register(id)}
        type={type}
      />
      {errors && <span className="text-red-600 mt-2">{errors.message}</span>}
    </div>
  );
};

export default Input;
