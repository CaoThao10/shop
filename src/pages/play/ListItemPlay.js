import React, { useEffect, useState } from "react";
import ItemColection from "../../components/itemColection/ItemColection";
import { Spin } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const ListItemPlay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayItems();
  }, []);

  const fetchPlayItems = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().type === "Đi chơi") {
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

export default ListItemPlay;
