import { ValidationErrors } from "@react-types/shared";

export type TAction<T> = {
  data?: T | null;
  message?: string | null;
  validationErrors?: ValidationErrors | null;
};
