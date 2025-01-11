import { Suspense } from "react";

// Test Delay
export const withDelay =
  (fn, delay) =>
  (...args) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fn(...args)
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  };

export const withSuspense = (Component, suppress = true) => {
  return (props) => (
    <Suspense
      fallback={<div>Loading...</div>}
      suppressHydrationWarning={suppress}
    >
      <Component {...props} suppressHydrationWarning={suppress} />
    </Suspense>
  );
};
