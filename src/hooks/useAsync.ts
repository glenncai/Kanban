import { useState } from 'react';

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
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  });

  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      data,
      status: 'success',
      error: null
    });

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      status: 'error'
    });

  // Trigger async request
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error('Make sure that parameter is Promise type.');
    }
    setRetry(() => () => {
      runConfig?.retry && run(runConfig?.retry(), runConfig);
    });
    setState({ ...state, status: 'loading' });
    return promise
      .then((data) => {
        setData(data);
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
  };

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
