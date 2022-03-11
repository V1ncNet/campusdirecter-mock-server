export const assertState = (expression: boolean, message: string | undefined): void => {
  if (!expression) {
    throw new Error(message);
  }
};
