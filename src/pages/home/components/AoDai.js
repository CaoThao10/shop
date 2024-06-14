import React, { useState, useEffect } from "react";
import ItemColection from "../../../components/itemColection/ItemColection";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const AoDai = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), limit(4));
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
      <div className="my-20 mx-[200px] flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center font-medium">
          <div className="flex items-center">
            <svg
              width="150"
              height="1"
              viewBox="0 0 150 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="1" x2="734" y2="1" stroke="black" strokeWidth="2" />
            </svg>
            <h3 className="text-xl font-semibold">TẤT CẢ SẢN PHẨM</h3>
            <svg
              width="150"
              height="1"
              viewBox="0 0 150 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="1" x2="734" y2="1" stroke="black" strokeWidth="2" />
            </svg>
          </div>
          <div>THÁNG 6 - 2024</div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-10">
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
        <div className="mt-10">
          <button className="border border-gray-300 rounded-full px-2 py-1 ">
            <a className="flex justify-center items-center gap-1" href="/all">
              Xem thêm
              <svg
                width="10"
                height="10"
                viewBox="0 0 22 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.1 0L0 3.1L15.9 19L0 34.9L3.1 38L22 19L3.1 0Z"
                  fill="black"
                />
              </svg>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AoDai;
