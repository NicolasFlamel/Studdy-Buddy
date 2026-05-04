import { CancelledError } from '@tanstack/react-query';
import { isNotFound } from '@tanstack/react-router';

export const isExpectedLoaderError = (error: unknown): boolean => {
  if (isCancelledError(error)) return true;
  else if (isAbortError(error)) return true;
  else if (isNotFound(error)) return true;
  return false;
};

const isCancelledError = (error: unknown): error is CancelledError => {
  if (error instanceof CancelledError) return true;
  return false;
};
const isAbortError = (error: unknown): error is DOMException => {
  if (error instanceof DOMException && error.name === 'AbortError') return true;
  return false;
};
