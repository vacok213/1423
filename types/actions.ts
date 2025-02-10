export type TAction<T> = {
  data: T | null;
  error: string | null;
  validationErrors?: Record<string, string> | null;
};
