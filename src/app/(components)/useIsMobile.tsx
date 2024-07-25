import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|touchscreen|mobi|tablet|Windows Phone/i;
    setIsMobile(mobileRegex.test(navigator.userAgent));
  }, []);

  return isMobile;
};