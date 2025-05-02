import useOutsideClick from "../hooks/useOutsideClick";

function ItemModal({ onClose, children }) {
  const ref = useOutsideClick(onClose);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out`}
    >
      <div
        ref={ref}
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out shadow-2xl shadow-coffee dark:shadow-putty bg-shade-brown dark:bg-slate-900 w-[calc(100vw-25%)] sm:max-w-xl  rounded-xl`}
      >
        {children}
      </div>
    </div>
  );
}

export default ItemModal;
