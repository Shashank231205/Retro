import { useEffect, useState } from "react";
import { fetchSales } from "../services/api.js";

export const useSalesData = (query) => {
  const [state, setState] = useState({
    data: [],
    pagination: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    let cancel = false;

    const load = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetchSales(query);

        if (!cancel) {
          setState({
            data: response.data || [],
            pagination: response.pagination || null,
            loading: false,
            error: null
          });
        }
      } catch (err) {
        console.error("Error fetching sales:", err);

        if (!cancel) {
          setState((prev) => ({ ...prev, loading: false, error: err }));
        }
      }
    };

    load();

    return () => {
      cancel = true;
    };
  }, [JSON.stringify(query)]);

  return state;
};
