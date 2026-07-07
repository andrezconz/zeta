import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True only after the component has hydrated on the client. Avoids the
 * SSR/client mismatch of theme- or time-dependent UI without setState-in-effect. */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
