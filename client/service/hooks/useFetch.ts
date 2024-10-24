'use client'
import { useState, useEffect } from "react";
import { httpHelper } from "../http";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface useFetchOptions<B = unknown> {
  method?: HttpMethod;
  bodyData?: B; // Les données pour POST, PUT, PATCH
  requestOptions?: RequestInit; // Autres options pour l'appel API
  requiredCredentials?: boolean;
}

export const useFetch = <T, B = unknown>(
  url: string,
  {
    method = "GET",
    bodyData,
    requestOptions,
    requiredCredentials,
  }: useFetchOptions<B> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let result: T;

        // Utilisation du httpHelper pour chaque méthode
        switch (method) {
          case "POST":
            result = await httpHelper.post<T, typeof bodyData>(
              url,
              bodyData,
              requiredCredentials ? token : null,
              requestOptions
            );
            break;
          case "PUT":
            result = await httpHelper.put<T, typeof bodyData>(
              url,
              bodyData,
              requiredCredentials ? token : null,
              requestOptions
            );
            break;
          case "PATCH":
            result = await httpHelper.patch<T, typeof bodyData>(
              url,
              bodyData,
              requiredCredentials ? token : null,
              requestOptions
            );
            break;
          case "DELETE":
            result = await httpHelper.delete<T>(
              url,
              requiredCredentials ? token : null,
              requestOptions
            );
            break;
          default: // "GET" par défaut
            result = await httpHelper.get<T>(
              url,
              requiredCredentials ? token : null,
              requestOptions
            );
        }

        setData(result);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, bodyData, token, requiredCredentials, requestOptions]);

  return { data, loading, error };
};
