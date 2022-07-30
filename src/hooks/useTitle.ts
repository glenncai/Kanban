import { useEffect, useRef } from 'react';

export const useTitle = (title: string) => {
  const prevTitleRef = useRef(document.title);

  useEffect(() => {
    document.title = title;
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.title = prevTitleRef.current;
    };
  }, [title]);
};
