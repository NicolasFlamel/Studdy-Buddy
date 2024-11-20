import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import { nextUIConfig } from './tailwind.nextUI';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'max-content 1fr max-content',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui(nextUIConfig)],
};

export default config;
