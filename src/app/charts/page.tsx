"use client";

import ContentMain from "../components/ContentMain";
import Link from "next/link";
import Button from "../components/Button";

export default function Charts() {


  return (
    <ContentMain title="Gráficos">
      <div className="flex flex-col w-full mx-4 md:mx-16">

        <div className="">
        <div className="flex justify-center items-center mb-6">
        <Link href='https://devrafaelcesar.grafana.net/d/d6f341be-13ba-49c5-a7bb-d87290427f45/labiotech?orgId=1&refresh=5s' target="_blank">
        <Button
        personWidth="w-[200px]"
        label="Acesse nosso grafana"
        type="button"
        />
        </Link>
      </div>
        </div>
      </div>
     
    </ContentMain>
  );
}
