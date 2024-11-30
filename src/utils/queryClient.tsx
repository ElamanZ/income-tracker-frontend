import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    mutations: {
      onError(error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
        const err = error as any;
        if (isAxiosError(error)) {
          const content = (
            <div>
              <p className='text-sm'>{'Что то пошло не так:'}</p>
              <p className='text-xs'>{err?.response?.data?.message}</p>
            </div>
          )
          toast.error(content, {
            icon: () => '😡'
          })
          return;
        }
        const content = (
          <div>
            <p className='text-sm'>{'Что то пошло не так:'}</p>
            <p className='text-xs'>{err?.message}</p>
          </div>
        )
        toast.error(content, {
          icon: () => '😡'
        })
      }
    }
  }
});
