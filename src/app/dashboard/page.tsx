import ContentMain from "../components/ContentMain";
import DashboardItem from "../components/Dashboard/DashboardItem";
import React from "react";

const Dashboard = () => {
  return (
    <ContentMain title="Dashboard">
      <div className="w-full mx-4 md:mx-16">
        <div className="text-xl text-[#505D68] font-bold mb-4">
          Nome da Amostra
        </div>
        <div className="flex flex-row">
          <DashboardItem marginRigth={true}>
            <div>
              <h1 className="text-[#505D68]">Temperatura: temp</h1>
            </div>
          </DashboardItem>
          <DashboardItem>
            <div>
              <h1 className="text-[#505D68]">Ph: ph</h1>
            </div>
          </DashboardItem>
        </div>
        <div className="flex flex-row mt-6">
          <DashboardItem marginRigth={true}>
            <div>
              <h1 className="text-[#505D68]">Media Temp: meTemp</h1>
              <h1 className="text-[#505D68]">Media Ph: mePh</h1>
            </div>
          </DashboardItem>
          <DashboardItem>
            <div>
              <h1 className="text-[#505D68]">Mediana Temp: medTemp</h1>
              <h1 className="text-[#505D68]">Mediana Ph: medP</h1>
            </div>
          </DashboardItem>
        </div>
        <div className="flex flex-row mt-6">
          <DashboardItem marginRigth={true}>
            <div>
              <h1 className="text-[#505D68]">Moda Temp: modaTemp</h1>
              <h1 className="text-[#505D68]">Moda Ph: modaPh</h1>
            </div>
          </DashboardItem>
          <DashboardItem>
            <div>
              <h1 className="text-[#505D68]">Desvio Padrão Temp: dpTemp</h1>
              <h1 className="text-[#505D68]">Desvio Padrão Ph: dpPh</h1>
            </div>
          </DashboardItem>
        </div>
        <div className="flex flex-row mt-6">
          <DashboardItem marginRigth={true}>
            <div>
              <h1 className="text-[#505D68]">Assimetria Temp: assTemp</h1>
              <h1 className="text-[#505D68]">Curtose Temp: curtoseTemp</h1>
            </div>
          </DashboardItem>
          <DashboardItem>
            <div>
              <h1 className="text-[#505D68]">Assimetria Ph: assPh</h1>
              <h1 className="text-[#505D68]">Curtose Ph: curtosePh</h1>
            </div>
          </DashboardItem>
        </div>
        <div className="flex flex-row mt-6">
          <DashboardItem>
            <div>
              <h1 className="text-[#505D68]">Probabilidade Ph: prob</h1>
              <h1 className="text-[#505D68]">Regressão Ph: regressao</h1>
            </div>
          </DashboardItem>
        </div>
      </div>
    </ContentMain>
  );
};

export default Dashboard;
