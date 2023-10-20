import ContentMain from "@/components/ContentMain";
import Item from "@/components/Item";
import SampleItem from "@/components/Sample/SampleItem";
import { AiOutlinePicture } from "react-icons/ai";

export default function Home() {
  return (
    <ContentMain title="Amostras">
      <div className="w-full mx-4 md:mx-16">
        <SampleItem name="Amostra 1" temp="16" ph="x" />
        <SampleItem name="Amostra 1" temp="16" ph="x" />
      </div>
    </ContentMain>
  );
}
