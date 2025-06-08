export function composeEvents<R, T extends (...args: any[]) => R>(
  originalEvent?: T,
  customEvent?: T
) {
  return (...args: Parameters<T>) => {
    originalEvent?.(...args) as any
    customEvent?.(...args) as any
  }
}
