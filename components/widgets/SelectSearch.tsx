"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { useRouter, useSearchParams } from "next/navigation";
import pushSearchParams from "@/utils/pushSearchParams";
import { TSearch } from "@/types/search";

type TSelectSearch = TSearch & {
  items: Iterable<{
    id: string;
    label: string;
  }>;
};

export default function SelectSearch({ param, label, items }: TSelectSearch) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultValue = searchParams.get(param);

  const decodedDefaultValue = defaultValue
    ? decodeURIComponent(defaultValue)
    : "";

  const [selectedId, setSelectedId] = useState(decodedDefaultValue);

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedId(newValue);

    const encodedSelectedId = encodeURI(newValue);
    router.push(`?${pushIdParams(param, encodedSelectedId)}`);
  };

  const pushIdParams = useCallback(
    (name: string, value: string) => {
      return pushSearchParams(searchParams, name, value, "page");
    },
    [searchParams],
  );

  return (
    <Select
      label={label ?? "Выберете элемент"}
      items={items}
      selectedKeys={[selectedId]}
      onChange={handleSelectionChange}
    >
      {(option) => (
        <SelectItem key={option.id} value={option.id}>
          {option.label}
        </SelectItem>
      )}
    </Select>
  );
}
