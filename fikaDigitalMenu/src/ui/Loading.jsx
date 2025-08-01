import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-berkeley-blue">
      <div className="mb-2 text-3xl font-semibold text-putty">{progress}%</div>
      <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-putty transition-all duration-200 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;

export function ThreeDotsLoading() {
  return (
    <BeatLoader
      color="#cda864"
      cssOverride={{ height: "100%", margin: "auto" }}
    />
  );
}
