import next from "eslint-config-next/core-web-vitals";

const config = [
  ...next,
  {
    ignores: [".kilo/**"],
  },
];

export default config;
