import { scopedPreflightStyles, isolateInsideOfContainer } from 'tailwindcss-scoped-preflight';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('#azext'),
    }),
  ],
};
