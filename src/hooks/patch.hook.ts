// useFormPatch.ts
import { useCallback } from 'react';

export const useFormPatch = <T extends object>() => {
  const createPatch = useCallback(
    (data: T, dirtyFields: Partial<Record<keyof T, boolean>>): Partial<T> => {
      const patch = {} as Partial<T>;

      (Object.keys(dirtyFields) as (keyof T)[]).forEach(key => {
        if (dirtyFields[key] && key in data) {
          const value = data[key];
          if (value !== undefined) {
            patch[key] = value;
          }
        }
      });

      return patch;
    },
    []
  );

  return { createPatch };
};
