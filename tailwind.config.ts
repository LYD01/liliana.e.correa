import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        // Note: Tailwind does not support CSS variables for breakpoint values directly in the config.
        // These should align with values inside `/styles/variables/_screens.scss`
        mobile: { max: '768px' },
        tablet: { min: '769px', max: '1280px' },
        tabletAndBelow: { max: '1280px' },
        smallDesktop: { min: '1281px', max: '1440px' }
      },
    },
  },
  plugins: [],
};
export default config;
