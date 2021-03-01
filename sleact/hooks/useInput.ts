import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type Handler = (e: ChangeEvent<HTMLInputElement>) => void;
type ReturnTypes<T> = [T, Handler, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue((e.target.value as unknown) as T);
  }, []);

  return [value, handler, setValue];
};
export default useInput;
