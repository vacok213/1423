import { ReadonlyURLSearchParams } from "next/navigation";

export default function pushSearchParams(
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string | string[],
  exceptions?: string | string[],
) {
  const params = new URLSearchParams(searchParams);

  if (exceptions) {
    (Array.isArray(exceptions) ? exceptions : [exceptions]).forEach(
      (exception) => params.delete(exception),
    );
  }

  if (Array.isArray(value)) {
    value.length == 0 ? params.delete(name) : params.set(name, value.join("&"));
  } else {
    value == "" ? params.delete(name) : params.set(name, value);
  }

  return params.toString();
}
