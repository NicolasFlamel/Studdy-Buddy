import { createFileRoute } from '@tanstack/react-router';

const AboutPage = () => {
  return <main className={'grow p-2'}>Hello from About!</main>;
};

export const Route = createFileRoute('/about')({
  component: AboutPage,
});
