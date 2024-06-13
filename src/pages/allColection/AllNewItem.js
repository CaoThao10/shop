import React, { useState, useEffect } from "react";
import ItemColection from "../../components/itemColection/ItemColection";
import Heading from "../../components/layout/Heading";
import Search from "../../components/Search";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const AllNewItem = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ ...doc.data(), id: doc.id });
      });
      setProducts(productsArray);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Heading />
      <Search url="/all-new" title="Tất cả sản phẩm mới" />
      <div className="my-20 mx-[200px] flex flex-col items-center justify-center ">
        <div className="grid grid-cols-4 gap-5 mt-10">
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
      </div>
    </div>
  );
};

export default AllNewItem;
