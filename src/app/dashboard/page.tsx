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
import toast from "react-hot-toast";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const sampleService = useSampleService();
  const [samples, setSamples] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<any>("1970-01-01");
  const initialEndDate = new Date().toISOString().split("T")[0];
  const [endDate, setEndDate] = useState<any>(initialEndDate);
  const [limit, setLimit] = useState<any>(50);
  const [limitSamples, setLimitSamples] = useState<any>(50);

  useEffect(() => {
    setLoading(true);
    const getSamples = async () => {
      const fetchedSamples = await sampleService.FINDDATE(
        session?.user?.accessToken,
        startDate,
        endDate,
        1,
        limitSamples
      );
      if (fetchedSamples) {
        setLoading(false);
        setSamples(fetchedSamples);
      }
    };
    if (session?.user?.accessToken) {
      getSamples();
    }
  }, [session?.user?.accessToken, startDate, endDate, limitSamples]);

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

  const meTemp: any = (sumTemp / samples.length).toFixed(2);
  const mePh: any = (sumPh / samples.length).toFixed(2);

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
    medianTemp = (
      (Number(sortedTemps[Number(middleTempIndex) - 1]) +
        Number(sortedTemps[Number(middleTempIndex)])) /
      2
    ).toFixed(2);
    medianPh = (
      (Number(sortedPh[Number(middlePhIndex) - 1]) +
        Number(sortedPh[Number(middlePhIndex)])) /
      2
    ).toFixed(2);
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
  const dpTemp = Math.sqrt(medVarianciaTemp).toFixed(2);

  const arrVarianciaPh = sortedPh.map((item) => Math.pow(item - mePh, 2));
  const medVarianciaPh =
    arrVarianciaPh.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    ) /
    (arrVarianciaPh.length - 1);
  const dpPh = Math.sqrt(medVarianciaPh).toFixed(2);

  // Assimetria

  let sortedTempsNum;
  let sortedTempsPhNum;
  let assTemp;
  let assPh;

  if (samples.length > 0) {
    sortedTempsNum = sortedTemps.map((str) => parseFloat(str));
    sortedTempsPhNum = sortedPh.map((str) => parseFloat(str));
    assTemp = ss.sampleSkewness(sortedTempsNum).toFixed(2);
    assPh = ss.sampleSkewness(sortedTempsPhNum).toFixed(2);
  }

  // Probabilidade

  // const probTemp = ss.probit(dpTemp);
  // const probPh = ss.probit(dpPh);

  return (
    <ContentMain title="Dashboard">
      <div className="flex flex-col w-full mx-4 md:mx-16">
        <div className=" w-full flex items-center justify-between ">
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-primary-blue" htmlFor="">
              Quantidade de amostras
            </label>
            <input
              className="border border-solid border-primary-blue p-4 rounded-lg "
              type="number"
              placeholder="Limite de Amostras"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              onBlur={(e) => {
                if (Number(limit) < 3) {
                  toast.error("O limite mínimo é 3");
                } else {
                  setLimitSamples(limit);
                }
              }}
            />
          </div>
          <div className="">
            <input
              className="bg-primary-blue p-6 rounded-lg mr-5 text-white cursor-pointer"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              className="bg-primary-blue p-6 rounded-lg text-white cursor-pointer"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
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
          {/* <div className="flex flex-row mt-6">
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
          </div> */}
        </div>
      </div>
    </ContentMain>
  );
};

export default Dashboard;
