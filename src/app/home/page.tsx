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

import { useSession } from "next-auth/react";

export default function Home() {
  const sampleRegisterModal = useSampleRegisterModal();
  const sampleService = useSampleService();
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setLoading(true);
    const getSamples = async () => {
      const fetchedSamples = await sampleService.GETALL(
        session?.user?.accessToken
      );
      if (fetchedSamples) {
        setLoading(false);
        setSamples(fetchedSamples);
      }
    };
    if (session?.user?.accessToken) {
      getSamples();
    }
  }, [session?.user?.accessToken]);

  return (
    <ContentMain title="Amostras">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mx-4 md:mx-16">
          <div
            onClick={() => sampleRegisterModal.onOpen()}
            className="mb-5 cursor-pointer w-fit"
          >
            <IoAddCircle size={36} color="#424B54" />
          </div>
          {samples.map((item: Sample, index) => (
            <SampleItem
              key={index}
              name={item.name}
              temp={item.temperature.toString()}
              ph={item.ph.toString()}
            />
          ))}
        </div>
      )}
    </ContentMain>
  );
}
