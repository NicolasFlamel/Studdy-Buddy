import { RouterProvider } from '@tanstack/react-router';
import { router } from './lib/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query';
import { ThemeProvider } from './context/theme-provider';

export const App = () => {
  return (
    <ThemeProvider defaultTheme={'system'} storageKey={'studdy-buddy-ui-theme'}>
      <QueryClientProvider client={queryClient}>
        <RouterProviderWithContext />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const RouterProviderWithContext = () => {
  return <RouterProvider router={router} context={{ queryClient }} />;
};
