import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { Loader, MantineProvider } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';

import { DatesProvider } from '@mantine/dates';
import { useGetMe } from './services/getMe';
import { router } from './router';
import { queryClient } from './utils/queryClient';
import { theme } from './theme';

function Router() {
  const [me] = useGetMe();

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} context={{ me }} />
    </Suspense>
  );
}

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DatesProvider settings={{ locale: 'ru' }}>
          <MantineProvider theme={theme}>
            <Router />
          </MantineProvider>
        </DatesProvider>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
