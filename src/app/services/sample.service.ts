import { fetchWrapper } from "../utils/functions/fetch";
import { Sample } from "../models/Sample";
import { useState } from "react";
import useLoading from "../utils/hooks/useLoading";

export const useSampleService = () => {
  const loading = useLoading();

  const POST = async (id: number | any, data: Sample,  session: string | any): Promise<Sample | undefined> => {
    loading.onActive();

    const response = await fetchWrapper<Sample>(`samples/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session}`,
      },
      body: JSON.stringify(data),
    });

    if (response) {
      loading.onInactive();
    }

    if (!response) {
      console.error("Sem resposta do servidor");
    }

    return response;
  };

  const GETALL = async (session: string | any): Promise<Sample[] | undefined> => {
    loading.onActive();

    const response = await fetchWrapper<Sample[]>("samples", {
      method: "GET",
      headers: {
        Authorization: `${session}`,
      },
    });

    if (response) {
      loading.onInactive();
    }

    if (!response) {
      console.error("Sem resposta do servidor");
    }

    return response;
  };

  const GETBYID = async (id: string, session: string | any): Promise<Sample | undefined> => {
    const response = await fetchWrapper<Sample>(`samples/${id}`, {
      method: "GET",
      headers: {
        Authorization: `${session}`,
      },
    });

    if (!response) {
      console.error("Sem resposta do servidor");
    }

    return response;
  };

  const DELETE = async (id: string, session: string | any): Promise<void> => {
    await fetchWrapper<Sample[]>(`samples/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${session}`,
      },
    });
  };

  return {
    GETALL,
    GETBYID,
    POST,
    DELETE,
  };
};
