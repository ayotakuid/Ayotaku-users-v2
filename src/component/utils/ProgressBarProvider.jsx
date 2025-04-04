import { createContext, useState, useContext } from "react";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";

const ProgressBarContext = createContext();

export const ProgressBarProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const loadingBarState = async (dataNavigate) => {
    setProgress(40);

    await new Promise((resolve) => {
      setTimeout(() => {
        setProgress((prev) => prev + 10);
        resolve();
      }, 500);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        setProgress((prev) => prev + 50);
        navigate(dataNavigate);
        window.scrollTo({ top: 0, behavior: "smooth" });
        resolve();
      }, 500);
    });
  };

  return (
    <ProgressBarContext.Provider value={{ loadingBarState }}>
      <LoadingBar
        color="#888ca8"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {children}
    </ProgressBarContext.Provider>
  );
};

export const useProgressBar = () => useContext(ProgressBarContext);
