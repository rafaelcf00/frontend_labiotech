import { fetchWrapper } from "../utils/functions/fetch";
import { Sample } from "../models/Sample";
import { useState } from "react";
import useLoading from "../utils/hooks/useLoading";

export const useSampleService = () => {
  const loading = useLoading();

  const POST = async (data: Sample): Promise<Sample | undefined> => {
    loading.onActive();

    const response = await fetchWrapper<Sample>(`samples`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  const GETALL = async (): Promise<Sample[] | undefined> => {
    loading.onActive();

    const response = await fetchWrapper<Sample[]>("samples", {
      method: "GET",
    });

    if (response) {
      loading.onInactive();
    }

    if (!response) {
      console.error("Sem resposta do servidor");
    }

    return response;
  };

  const GETBYID = async (id: string): Promise<Sample | undefined> => {
    const response = await fetchWrapper<Sample>(`samples/${id}`, {
      method: "GET",
    });

    if (!response) {
      console.error("Sem resposta do servidor");
    }

    return response;
  };

  const DELETE = async (id: string): Promise<void> => {
    await fetchWrapper<Sample[]>(`samples/${id}`, {
      method: "DELETE",
    });
  };

  return {
    GETALL,
    GETBYID,
    POST,
    DELETE,
  };
};
