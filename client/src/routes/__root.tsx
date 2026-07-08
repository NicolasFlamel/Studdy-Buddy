import { ErrorPage } from '@/components/layout/error';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { NotFoundRootPage } from '@/components/layout/not-found-root';
import type { RouterContext } from '@/lib/router';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => {
  return (
    <>
      <HeadContent />
      <Header />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'description',
        content:
          'Assess your strengths, get matched with classmates, and help each other succeed.',
      },
      {
        title: 'Studdy Buddy',
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFoundRootPage,
  errorComponent: ErrorPage,
});
