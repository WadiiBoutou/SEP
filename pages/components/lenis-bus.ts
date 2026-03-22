type ScrollCallback = (scroll: number, limit: number) => void;
const subscribers = new Set<ScrollCallback>();

export const emitScrollProgress = (scroll: number, limit: number) => {
  subscribers.forEach((fn) => fn(scroll, limit));
};

export const onScrollProgress = (fn: ScrollCallback) => {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
};

type ScrollToFn = (target: number, immediate?: boolean) => void;
let scrollToFn: ScrollToFn | null = null;

export const registerScrollTo = (fn: ScrollToFn) => {
  scrollToFn = fn;
};

export const scrollTo = (target: number, immediate: boolean = false) => {
  if (scrollToFn) {
    scrollToFn(target, immediate);
  }
};
