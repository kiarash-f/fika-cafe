import { useState } from "react";
import ItemModal from "../ui/ItemModal";
import useItems from "../hooks/useItems";
import Loading from "../ui/Loading";
import toast from "react-hot-toast";
import useCategories from "../hooks/useCategories";
import { toPersianNumbers } from "../utils/toPersianNumbers";

function MilkShake() {
  const { items, isLoading, error, isError } = useItems();
  const {
    categories,
    error: categoryError,
    isLoading: categoryLoading,
    isError: categoryIsError,
  } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  if (isLoading || categoryLoading) return <Loading />;
  if (isError || categoryIsError)
    return toast.error(
      (error || categoryError)?.response?.data?.message ||
        (error || categoryError)?.message
    );

  //find category
  const findCategory = categories.find(
    (category) => category.name === "میلک شیک"
  );

  //find items based on category
  const filteredItems = items.filter(
    (item) => item.category.name === findCategory.name
  );

  const itemClickHandler = (item) => {
    setSelectedItem(item);
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className="mt-8 flex items-center mr-1 justify-center"
        data-aos="fade-down"
      >
        <span className="sm:text-xl text-lg text-center w-24 sm:w-32 md:text-2xl font-arsoo dark:text-neutral-200 text-black">
          {findCategory.name}
        </span>
        <span className="border-b mt-1 mr-1 border-coffee dark:border-putty w-full"></span>
      </div>
      {/* Container */}
      <div className="flex items-center flex-col flex-wrap p-2 max-w-full mx-auto">
        <div className="grid grid-cols-1 min-[870px]:grid-cols-2 min-[1119px]:grid-cols-3 gap-x-16 w-full px-4 dark:bg-berkeley-blue bg-coffee rounded-lg">
          {filteredItems.map((item) => (
            <button
              key={item._id}
              className="cursor-pointer my-2 border-b border-putty last:border-b-0 py-3 text-lg"
              onClick={() => itemClickHandler(item)}
              data-aos="fade-up"
            >
              <div className="flex min-[200px]:max-[315px]:flex-col min-[200px]:max-[315px]:gap-y-2">
                <div className="w-24 min-[250px]:max-[315px]:w-full min-[250px]:max-[315px]:mx-auto min-[500px]:w-36">
                  <img
                    src={`https://fika.liara.run/${item.image}`}
                    alt={item.name}
                    className="rounded-lg rounded-br-none object-center"
                  />
                </div>
                <div
                  className={`font-yekan text-right  mr-6 space-y-3 sm:text-center ${
                    item.description
                      ? "min-[500px]:space-y-8"
                      : "min-[500px]:space-y-4"
                  }`}
                >
                  <h1 className="font-arsoo">{item.name}</h1>
                  <p className="opacity-75 text-ellipsis overflow-hidden whitespace-nowrap text-xs min-[315px]:max-[370px]:w-24 min-[370px]:max-sm:w-36 sm:w-52 min-[250px]:max-[315px]:w-full">
                    {item.description ? item.description : ""}
                  </p>
                  <p className="space-x-0.5">
                    <span>{toPersianNumbers(item.price)}</span>
                    <span>تومان</span>
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {isOpen && selectedItem && (
        <ItemModal onClose={() => setIsOpen(false)}>
          <div className="flex flex-col min-[500px]:flex-row">
            <div className="w-full min-[500px]:w-36">
              <img
                src={`https://fika.liara.run/${selectedItem.image}`}
                alt={selectedItem.name}
                className="w-full"
              />
            </div>
            <div className="text-right font-yekan mr-2 space-y-1.5 my-2 min-[500px]:space-y-6">
              <h1 className="font-arsoo text-xl">{selectedItem.name}</h1>
              <p className="opacity-75 text-sm">
                {selectedItem.description ? selectedItem.description : ""}
              </p>
              <p className="space-x-0.5 text-lg">
                <span>{selectedItem.price}</span>
                <span>تومان</span>
              </p>
            </div>
          </div>
        </ItemModal>
      )}
    </>
  );
}

export default MilkShake;
