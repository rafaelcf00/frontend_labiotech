import React from "react";
import Item from "../Item";
import { AiOutlinePicture } from "react-icons/ai";

type SampleProps = {
  name: string;
  temp: string;
  ph: string;
};

const SampleItem = ({ name, temp, ph }: SampleProps) => {
  return (
    <Item>
      <div className="flex flex-col md:flex-row w-full ">
        {/* <div className="p-5 rounded-full bg-white border border-solid border-primary-green border-opacity-40 flex items-center justify-center">
          <AiOutlinePicture size={28} color="#DADADA" />
        </div> */}
        <div className="ml-0 md:ml-6 mt-3 md:mt-0">
          <h1 className="text-3xl text-[#505D68] font-bold">{name}</h1>
          <h2 className="text-lg mt-1">
            Temperatura: {temp} - Ph: {ph}
          </h2>
        </div>
      </div>
    </Item>
  );
};

export default SampleItem;
