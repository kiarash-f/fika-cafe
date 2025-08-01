import { useParams } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import { BASE_URL } from "./HomePageLayout";
import { useState } from "react";
import { toPersianNumbers } from "../utils/toPersianNumbers";
import ItemModal from "./ItemModal";
import toast from "react-hot-toast";
import Loading from "./Loading";
import useItems from "../hooks/useItems";

function ItemsPageLayout() {
  const { id } = useParams();
  const { category, error, isError, isLoading } = useCategory(id);
  const {
    items,
    error: itemsError,
    isError: itemsIsError,
    isLoading: itemsIsLoading,
  } = useItems();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  //find items based on category
  const filteredItems = items.filter(
    (item) => item?.category?._id === category?._id
  );
  const filterItems = filteredItems.sort((a, b) => a.order - b.order);
  const itemClickHandler = (item) => {
    setSelectedItem(item);
    setIsOpen((prev) => !prev);
  };

  if (isLoading || itemsIsLoading) return <Loading />;
  if (isError || itemsIsError)
    return toast.error(
      (error || itemsError)?.response?.data?.message ||
        (error || itemsError)?.message
    );

  return (
    <div
      className="min-h-screen overflow-x-hidden font-arsoo"
      style={{ direction: "rtl" }}
    >
      {/* Content */}
      <div className="flex items-center justify-center w-full mx-auto my-8">
        <p className="text-lg sm:max-md:text-lg md:text-2xl bg-berkeley-blue px-6 py-2 rounded-lg">
          {category?.name}
        </p>
      </div>
      <div className="flex items-center flex-col flex-wrap p-2 max-w-full mx-auto">
        <div className="grid grid-cols-1 min-[870px]:grid-cols-2 min-[1119px]:grid-cols-3 gap-x-16 w-full px-4 bg-berkeley-blue  rounded-lg">
          {filterItems.map((item) => (
            <button
              key={item._id}
              className="cursor-pointer my-2 border-b border-putty last:border-b-0 py-3 text-lg"
              onClick={() => itemClickHandler(item)}
            >
              <div className="flex min-[200px]:max-[315px]:flex-col min-[200px]:max-[315px]:gap-y-2">
                <div className="w-24 min-[250px]:max-[315px]:w-full min-[250px]:max-[315px]:mx-auto min-[500px]:w-[150px] h-24 min-[250px]:max-[315px]:h-full  min-[500px]:h-[150px]">
                  <img
                    src={`${BASE_URL}/${item.image}`}
                    alt={item.name}
                    className="rounded-lg rounded-br-none object-center w-full h-full"
                    loading="lazy"
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
        <>
          <ItemModal onClose={() => setIsOpen(false)}>
            <div className="flex flex-col min-[500px]:flex-row">
              <div className="w-full min-[500px]:w-[200px] h-[300px] min-[500px]:h-[200px]">
                <img
                  src={`${BASE_URL}/${selectedItem.image}`}
                  alt={selectedItem.name}
                  className="w-full h-full"
                  loading="lazy"
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
        </>
      )}
    </div>
  );
}

export default ItemsPageLayout;
