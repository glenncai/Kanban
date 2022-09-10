import { useCallback, useState } from 'react';
import { useMountedRef } from 'hooks/useMountedRef';

interface State<D> {
  error: Error | null;
  data: D | null;
  status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  status: 'error',
  data: null,
  error: null
};

const defaultConfig = {
  throwOnError: false
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const mountedRef = useMountedRef();
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  });

  // Store a function
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        status: 'success',
        error: null
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        data: null,
        status: 'error'
      }),
    []
  );

  // Trigger async request
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('Make sure that parameter is Promise type.');
      }
      setRetry(() => () => {
        runConfig?.retry && run(runConfig?.retry(), runConfig);
      });
      setState((prevState) => ({ ...prevState, status: 'loading' }));
      return promise
        .then((data) => {
          mountedRef() && setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            // Return Promise to wait another catch to throw error
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    retry,
    setData,
    setError,
    ...state
  };
};
