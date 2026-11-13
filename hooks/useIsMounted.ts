import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hydration-safe mount hook using React 18/19 useSyncExternalStore.
 * Avoids cascading re-renders and set-state-in-effect lint errors.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

