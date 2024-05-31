import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

const RefreshServiceWorker = ({ onReload }) => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const [isPressing, setIsPressing] = useState(false);
  const [pressStart, setPressStart] = useState(0);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    let timeout;
    if (isPressing) {
      timeout = setTimeout(() => {
        if (needRefresh) {
          updateServiceWorker(true).then(() => {
            onReload();
          });
        }
        setIsPressing(false);
      }, 2000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isPressing, needRefresh, updateServiceWorker, onReload]);

  const handlePressStart = () => {
    setIsPressing(true);
    setAnimationClass("animate");
    setPressStart(Date.now());
  };

  const handlePressEnd = () => {
    setIsPressing(false);
    setAnimationClass("");
  };

  return (
    <>
      {needRefresh && (
        <div
          className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[300px] z-20 cursor-pointer backdrop-blur-md bg-black/60 shadow-md shadow-white text-sm text-white p-1 rounded-md flex flex-col items-center justify-center`}
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
        >
          Press and hold to Reload.
          <div className={`circle-loader ${animationClass}`} />
        </div>
      )}
    </>
  );
};

export default RefreshServiceWorker;
