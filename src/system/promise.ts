export function onlyOncePerExec<T>(factory: () => Promise<T>) {
  let worker: Promise<T> | null = null;
  return () =>
    worker ??
    (worker = factory().finally(() => {
      worker = null;
    }));
}
