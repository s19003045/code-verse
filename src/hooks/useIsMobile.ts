import { useEffect, useState } from 'react';

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const evaluate = () => setIsMobile(window.innerWidth < breakpoint);
    evaluate();
    window.addEventListener('resize', evaluate);
    return () => window.removeEventListener('resize', evaluate);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
