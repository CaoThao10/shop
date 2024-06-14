import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
// import ItemCollection from "../../components/itemCollection/ItemCollection";
import { Spin } from "antd";
import ItemColection from "../../components/itemColection/ItemColection";

const ListItemWork = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkItems();
  }, []);

  const fetchWorkItems = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().type === "Đi làm") {
        products.push({ ...doc.data(), key: doc.id });
      }
    });
    setData(products);
    setLoading(false);
  };

  return (
    <div className="mx-[200px] mt-[50px]">
      {loading ? (
        <Spin />
      ) : (
        <div className="flex flex-wrap gap-3">
          {data.map((item) => (
            <ItemColection
              key={item.key}
              link="/detail"
              note={item.name}
              price={`${item.price}đ`}
              url={item.img}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListItemWork;
