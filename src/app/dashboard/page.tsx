"use client";

import ContentMain from "../components/ContentMain";
import DashboardItem from "../components/Dashboard/DashboardItem";
import React, { useEffect, useState } from "react";
import { useSampleService } from "../services/sample.service";
import { useSession } from "next-auth/react";
import { Sample } from "../models/Sample";
import * as ss from "simple-statistics";
import { Scatter } from "react-chartjs-2";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const sampleService = useSampleService();
  const [samples, setSamples] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getSamples = async () => {
      const fetchedSamples = await sampleService.GETALL(
        session?.user?.accessToken,
        1,
        20000
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

  const sumTemp = samples.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.temperature),
    0
  );
  const sumPh = samples.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.ph),
    0
  );

  // Media

  const meTemp = sumTemp / samples.length;
  const mePh = sumPh / samples.length;

  // Mediana

  const sortedTemps = samples
    .map((sample) => sample.temperature)
    .sort((a, b) => a - b);
  const sortedPh = samples.map((sample) => sample.ph).sort((a, b) => a - b);
  const middleTempIndex = Math.floor(sortedTemps.length / 2);
  const middlePhIndex = Math.floor(sortedPh.length / 2);
  let medianTemp;
  let medianPh;
  const modaTemp = sortedTemps.reduce(
    (a, b, i, arr) =>
      arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
        ? a
        : b,
    0
  );
  const modaPh = sortedPh.reduce(
    (a, b, i, arr) =>
      arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
        ? a
        : b,
    0
  );

  if (sortedTemps.length % 2 === 0) {
    medianTemp =
      (Number(sortedTemps[Number(middleTempIndex) - 1]) +
        Number(sortedTemps[Number(middleTempIndex)])) /
      2;
    medianPh =
      (Number(sortedPh[Number(middlePhIndex) - 1]) +
        Number(sortedPh[Number(middlePhIndex)])) /
      2;
  } else {
    medianTemp = sortedTemps[middleTempIndex];
    medianPh = sortedPh[middlePhIndex];
  }

  console.log(sortedTemps);

  // Desvio Padrão

  const arrVarianciaTemp = sortedTemps.map((item) =>
    Math.pow(item - meTemp, 2)
  );
  const medVarianciaTemp =
    arrVarianciaTemp.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    ) /
    (arrVarianciaTemp.length - 1);
  const dpTemp = Math.sqrt(medVarianciaTemp);

  const arrVarianciaPh = sortedPh.map((item) => Math.pow(item - mePh, 2));
  const medVarianciaPh =
    arrVarianciaPh.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    ) /
    (arrVarianciaPh.length - 1);
  const dpPh = Math.sqrt(medVarianciaPh);

  // Assimetria

  let sortedTempsNum;
  let sortedTempsPhNum;
  let assTemp;
  let assPh;

  if (samples.length > 0) {
    sortedTempsNum = sortedTemps.map((str) => parseFloat(str));
    sortedTempsPhNum = sortedPh.map((str) => parseFloat(str));
    assTemp = ss.sampleSkewness(sortedTempsNum);
    assPh = ss.sampleSkewness(sortedTempsPhNum);
  }

  // Probabilidade

  const probTemp = ss.probit(dpTemp);
  const probPh = ss.probit(dpPh);

  return (
    <ContentMain title="Dashboard">
      <div className="flex flex-col w-full mx-4 md:mx-16">
        <div className="mt-5">
          <div className="flex flex-row">
            <DashboardItem marginRigth={true}>
              <div>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <h1 className="text-[#505D68]">Media Temp: {meTemp}</h1>
                    <h1 className="text-[#505D68]">Media Ph: {mePh}</h1>
                  </>
                )}
              </div>
            </DashboardItem>
            <DashboardItem>
              <div>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <h1 className="text-[#505D68]">
                      Mediana Temp: {medianTemp}
                    </h1>
                    <h1 className="text-[#505D68]">Mediana Ph: {medianPh}</h1>
                  </>
                )}
              </div>
            </DashboardItem>
          </div>
          <div className="flex flex-row mt-6">
            <DashboardItem marginRigth={true}>
              <div>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <h1 className="text-[#505D68]">Moda Temp: {modaTemp}</h1>
                    <h1 className="text-[#505D68]">Moda Ph: {modaPh}</h1>
                  </>
                )}
              </div>
            </DashboardItem>
            <DashboardItem>
              <div>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <h1 className="text-[#505D68]">
                      Desvio Padrão Temp: {dpTemp}
                    </h1>
                    <h1 className="text-[#505D68]">Desvio Padrão Ph: {dpPh}</h1>
                  </>
                )}
              </div>
            </DashboardItem>
          </div>
          <div className="flex flex-row mt-6">
            <DashboardItem marginRigth={true}>
              <div>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <h1 className="text-[#505D68]">
                      Assimetria Temp: {assTemp}
                    </h1>
                  </>
                )}
              </div>
            </DashboardItem>
            <DashboardItem>
              <div>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <h1 className="text-[#505D68]">Assimetria Ph: {assPh}</h1>
                  </>
                )}
              </div>
            </DashboardItem>
          </div>
          <div className="flex flex-row mt-6">
            <DashboardItem>
              <div>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <h1 className="text-[#505D68]">
                      Probabilidade Ph: {probPh}
                    </h1>
                    <h1 className="text-[#505D68]">
                      Probabilidade Temp: {probTemp}
                    </h1>
                  </>
                )}
              </div>
            </DashboardItem>
          </div>
        </div>
      </div>
    </ContentMain>
  );
};

export default Dashboard;
