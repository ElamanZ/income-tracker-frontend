import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Me } from '../services/getMe';
import { lazy, Suspense } from 'react';
import { ModalsProvider } from '@mantine/modals';

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  me: Me | null;
}

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
      // Lazy load in development
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    )

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <ModalsProvider >
      <Outlet />
      <Suspense fallback={null}>
        <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
      </Suspense>
    </ModalsProvider>
  ),
})