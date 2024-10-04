import { useEffect, useState } from "react";

const Counter = ({ total, state }: { total: number; state: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleScroll = () => {
    setIsVisible(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [timeoutId]);

  return (
    <div>
      {isVisible && (
        <div className="fixed bottom-4 left-4 rounded-lg border-2 border-white bg-primary p-4 text-white">
          {state}/{total}
        </div>
      )}
    </div>
  );
};

export default Counter;
