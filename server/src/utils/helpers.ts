export function reply<T>(data: T, error?: null): { data: T; error: null };
export function reply(
  data: null,
  error: string,
): { data: null; error: { message: string } };
export function reply<T>(data: T | null, error?: string | null) {
  if (error) return { data: null, error: { message: error } };
  return { data, error: null };
}
