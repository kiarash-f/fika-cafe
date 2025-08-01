import { Outlet } from "react-router-dom";

function HomePageLayout() {
  return (
    <div className="max-w-screen 2xl:max-w-screen-2xl bg-slate-900 relative overflow-x-hidden">
      <div className="h-full text-neutral-200 text-end font-farsi-sade">
        <Outlet />
      </div>
    </div>
  );
}

export default HomePageLayout;

export const BASE_URL = "https://fikacoffeeanzali.ir";

