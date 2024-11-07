import React, { useEffect, useState } from "react";
import OfflineNotification from "./OfflineNotification";

const OfflineWrapper = ({Component, ...props}) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    // const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    // window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
    //   window.removeEventListener("offline",      );
    };
  }, []);

  if (!isOffline) {
    return <Component {...props} />;
  }
  return <OfflineNotification />;
};

export default OfflineWrapper;
