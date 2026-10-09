import next from "eslint-config-next/core-web-vitals";

const config = [
  ...next,
  {
    ignores: [".kilo/**", "coverage/**", "out/**", ".next/**", "public/sw.js"],
  },
];

export default config;
