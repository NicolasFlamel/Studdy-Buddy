import { ErrorPage } from '@/components/layout/error';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { NotFoundRootPage } from '@/components/layout/not-found-root';
import type { RouterContext } from '@/lib/router';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundRootPage,
  errorComponent: ErrorPage,
});
