import { useCallback, useState } from 'react';

import { debounce } from 'lodash';

export const useAutoSave = (
  saveFunction: (data: any) => Promise<void>,
  delay: number
) => {
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const autoSave = useCallback(
    debounce((data: any) => {
      saveFunction(data).then(() => {
        setLastSaved(new Date().toLocaleTimeString());
      });
    }, delay),
    [saveFunction, delay]
  );

  return { autoSave, lastSaved };
};
