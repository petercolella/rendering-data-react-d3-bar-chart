import { useEffect, useState } from "react";
import { getData } from "../utils/getData";

export const useGetData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then((data) => {
      setData(data.slice(0, 10));
    });
  }, []);

  return data;
};
