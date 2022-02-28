/* eslint-disable @typescript-eslint/ban-types */
export type Route = {
  method: string;
  url: string;
  middleware: Function[];
  fnName: string;
};
