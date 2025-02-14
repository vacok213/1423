"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@heroui/input";
import pushSearchParams from "@/utils/pushSearchParams";
import { TSearch } from "@/types/search";

export default function Search({ param }: TSearch) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultValue = searchParams.get(param);

  const defaultSelected = defaultValue ? decodeURIComponent(defaultValue) : "";

  const [searchQuery, setSearchQuery] = useState(defaultSelected);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);

    const encodedSearchQuery = encodeURI(newValue);
    router.push(`?${pushQueryParams(param, encodedSearchQuery)}`);
  };

  const pushQueryParams = useCallback(
    (name: string, value: string) => {
      return pushSearchParams(searchParams, name, value, "page");
    },
    [searchParams],
  );

  return <Input value={searchQuery} label="Поиск" onChange={handleChange} />;
}
