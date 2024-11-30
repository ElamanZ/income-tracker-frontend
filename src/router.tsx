import { ErrorComponent, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { Loader } from '@mantine/core';

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultErrorComponent: ({ error }) => {
    return <ErrorComponent error={error} />;
  },
  defaultPendingComponent: () => (
    <div className="flex justify-center items-center h-screen">
      <Loader size="lg" />
    </div>
  ),
  context: {
    // auth will initially be undefined
    // We'll be passing down the auth state from within a React component
    me: null,
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
