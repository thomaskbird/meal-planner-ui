import { useEffect, useState } from "react";

const HydrateZustand = ({ children }: { children: any }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>
    {isHydrated ? children : null}
  </>
};

export default HydrateZustand;