import { useState } from "react";
import ItemsTable from "./items/ItemsTable";
import ItemsHeader from "./items/ItemsHeader";

function AdminDashboard() {
  const [sortItems, setSortItems] = useState("بر اساس همه دسته بندی ها");

  return (
    <>
      <ItemsHeader sortItems={sortItems} setSortItems={setSortItems} />
      <ItemsTable sortItems={sortItems} />
    </>
  );
}

export default AdminDashboard;
