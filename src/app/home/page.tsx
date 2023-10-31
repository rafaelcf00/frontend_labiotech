"use client";

import ContentMain from "../components/ContentMain";
import SampleItem from "../components/Sample/SampleItem";
import { IoAddCircle } from "react-icons/io5";
import useSampleRegisterModal from "../utils/hooks/useSampleRegisterModal";
import { useSampleService } from "../services/sample.service";
import { useEffect, useState } from "react";
import { Sample } from "../models/Sample";
import Loader from "../components/Loader";
import useLoading from "../utils/hooks/useLoading";

export default function Home() {
  const sampleRegisterModal = useSampleRegisterModal();
  const sampleService = useSampleService();
  const [samples, setSamples] = useState<Sample[]>([]);
  const loading = useLoading();

  console.log(loading.isLoader);

  useEffect(() => {
    const getSamples = async () => {
      const fetchedSamples = await sampleService.GETALL();
      if (fetchedSamples) {
        setSamples(fetchedSamples);
      }
    };
    getSamples();
  }, []);

  return (
    <ContentMain title="Amostras">
      {loading.isLoader === true ? (
        <Loader />
      ) : (
        <div className="w-full mx-4 md:mx-16">
          <div
            onClick={() => sampleRegisterModal.onOpen()}
            className="mb-5 cursor-pointer w-fit"
          >
            <IoAddCircle size={36} color="#424B54" />
          </div>
          {samples.map((item: Sample) => (
            <SampleItem name={item.name} temp="16" ph="x" />
          ))}
        </div>
      )}
    </ContentMain>
  );
}
