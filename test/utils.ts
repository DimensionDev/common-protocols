import path from "path";

export const fixture = (...paths: string[]) =>
  path.resolve(__dirname, "fixtures", ...paths);
