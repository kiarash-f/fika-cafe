import { Outlet } from "react-router-dom";

function ItemsPageLayout() {
  return (
    <>
      <div className="bg-putty dark:bg-cobalt-blue min-h-screen overflow-x-hidden font-arsoo">
        <div
          className="w-full flex items-center justify-between md:justify-around bg-shade-brown dark:bg-slate-900"
          //data-aos="fade-up"
        >
          <img
            src="/images/header person boy.png"
            alt="Fika Boy"
            className="w-20 min-[200px]:max-[300px]:w-14"
          />
          <img
            src="/images/Fika Sidebar.png"
            alt="Fika Logo"
            className="md:w-36 w-20 min-[200px]:max-[300px]:w-14"
          />
          <img
            src="/images/header person girl.png"
            alt="Fika Girl"
            className="w-20 min-[200px]:max-[300px]:w-14"
          />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default ItemsPageLayout;
