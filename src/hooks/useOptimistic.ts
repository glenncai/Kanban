import { QueryKey, useQueryClient } from 'react-query';

interface ConfigProps<T> {
  queryKey: QueryKey;
  callback: (target: Partial<T>, old?: T[]) => T[];
}

export const useOptimistic = <T>({ queryKey, callback }: ConfigProps<T>) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onMutate: async (target: Partial<T>) => {
      await queryClient.cancelQueries(queryKey);
      const previousItems = queryClient.getQueriesData(queryKey);
      queryClient.setQueryData(queryKey, (old?: T[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onError(error: unknown, newItem: Partial<T>, context: unknown) {
      queryClient.setQueryData(
        queryKey,
        (context as { previousItems: T[] }).previousItems
      );
    }
  };
};
