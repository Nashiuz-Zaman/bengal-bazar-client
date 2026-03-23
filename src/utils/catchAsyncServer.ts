export const catchAsyncServer = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  return async (...args: Parameters<T>): Promise<
    [Awaited<ReturnType<T>>, null] | [null, string]
  > => {
    try {
      const data = await fn(...args);
      return [data, null];
    } catch (error) {
      console.log(`Error in ${fn.name}:`, error);
      return [null, error instanceof Error ? error.message : "Server Error"];
    }
  };
};