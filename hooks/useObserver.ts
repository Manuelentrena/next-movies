import { DISTANCE_OBSERVE } from "@/config/initial";
import { useEffect, useRef, useState } from "react";

interface UseObserverOptions {
  distance?: string;
  externalRef?: React.RefObject<HTMLElement>;
}

export default function useObserver({ distance = DISTANCE_OBSERVE, externalRef }: UseObserverOptions = {}) {
  const [isObserver, setIsObserver] = useState<boolean>(false);
  const fromRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const element = externalRef ? externalRef.current : fromRef.current;

    const onChange = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setIsObserver(true);
      } else {
        setIsObserver(false);
      }
    };

    observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });

    if (element) observer.observe(element);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [distance, externalRef]);

  return { isObserver };
}
