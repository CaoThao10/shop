import React, { useState, useEffect } from "react";
import ItemColection from "../../components/itemColection/ItemColection";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { Spin } from "antd";

const ListAllItem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ ...doc.data(), id: doc.id });
      });
      setProducts(productsArray);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-[200px] mt-[50px]">
      {loading ? (
        <Spin />
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {products.map((product) => (
            <ItemColection
              key={product.id}
              link={`/detail/${product.id}`}
              note={product.name}
              price={`${product.price}đ`}
              url={product.img}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListAllItem;
