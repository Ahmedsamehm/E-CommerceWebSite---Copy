import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading,setIsLoading] =useState(false)
  useEffect(() => {
    GetCategories();
  }, []);

  async function GetCategories() {
    setIsLoading(true)
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/Brands/"
    );
    setBrands(data.data);
    setIsLoading(false)
    
  }
  return (
    <>
    <section id="Brands" className="py-10 bg-gray-100">
  {isLoading ? (
    <Loading />
  ) : (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={brand.image}
              className="w-full h-48 object-cover"
              alt={brand.name}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-center">{brand.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</section>
      
     
    </>
  );
}
