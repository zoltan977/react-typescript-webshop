import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useCurrentSearchParam = (searchParam: string) => {
    const search = useLocation().search;
    const value = useMemo(() => {
      const searchParams = new URLSearchParams(search)
      return searchParams.get(searchParam)
    }, [search]);

    return value;
}