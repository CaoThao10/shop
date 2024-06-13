import React, { useEffect, useState } from "react";
import Heading from "../../components/layout/Heading";

import ItemColection from "../../components/itemColection/ItemColection";
import Search from "../../components/Search";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const AllColectionPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(
        collection(db, "products"),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
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
      <Heading></Heading>
      {/* <Colection></Colection> */}
      <Search url="/all-colection" title="Tất cả sản phẩm mới"></Search>
      <div className="my-20 mx-[200px] flex flex-col items-center justify-center ">
        <div className=" grid grid-cols-4 gap-5 mt-10 ">
          {products.map((product) => (
            <ItemColection
              key={product.id}
              note={product.name}
              price={`${product.price}đ`}
              link={`/detail/${product.id}`}
              url={product.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllColectionPage;
