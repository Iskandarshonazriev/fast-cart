import { useState, useEffect } from "react";
import axios from "axios";
import {
  Heart,
  Eye,
  Search,
  SlidersHorizontal,
  ChevronDown,
 
} from "lucide-react";
import { Link } from "react-router-dom";

const url = "https://fastcard-1-o23z.onrender.com/api/Product/add-product";

export default function ExploreProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function getProduct() {
    try {
      const { data } = await axios.get(url);

      console.log(data);

      setProducts(data.data || []);
    } catch (error) {
      console.log("Ошибка:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* breadcrumb */}
      <div className="text-sm text-gray-400 flex gap-2 py-5 px-3 lg:px-0">
        <Link to="/">Home</Link>
        <span>/</span>
        <p className="text-black">
          Explore Our Products
        </p>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden px-3">
        <div className="border rounded p-4 flex justify-between">
          <input
            placeholder="Search"
            className="outline-none w-full"
          />

          <Search />
        </div>

        <div className="flex gap-3 mt-4">
          <button className="border rounded px-6 py-2 flex items-center gap-2">
            Popular
            <ChevronDown size={18} />
          </button>

          <button className="border rounded px-6 py-2 flex items-center gap-2">
            Filter (3)
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          <div className="border border-red-400 text-red-500 px-3 py-1 rounded">
            All products ✕
          </div>

          <div className="border border-red-400 text-red-500 px-3 py-1 rounded">
            Any ✕
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-7">
          {products.map((item: any) => (
            <div key={item.id}>
              <div className="bg-[#F5F5F5] p-6 relative rounded">

                <img
                  src={`https://store-api.softclub.tj/images/${item.image}`}
                  className="w-full h-[230px] object-contain"
                  alt=""
                />

                <div className="absolute top-3 right-3 flex flex-col gap-3">
                  <button className="bg-white p-2 rounded-full">
                    <Heart size={18} />
                  </button>

                  <button className="bg-white p-2 rounded-full">
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              <h2 className="font-semibold mt-4">
                {item.productName}
              </h2>

              <div className="flex gap-3 mt-2">
                <p className="text-red-500 font-bold">
                  ${item.price}
                </p>

                ⭐⭐⭐⭐⭐

                <span className="text-gray-400">
                  (35)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ПК ================= */}

      <div className="hidden lg:flex gap-8">
        <div className="w-[250px]">
          <div className="border-b pb-6">
            <div className="flex justify-between">
              <b>Category</b>
              <ChevronDown />
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <p className="text-red-500">
                All products
              </p>

              <p>Electronics</p>
              <p>Home & Lifestyle</p>
              <p>Medicine</p>
              <p>Sports & Outdoor</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-end mb-6">
            <button className="border px-8 py-3 rounded flex items-center gap-3">
              Popular
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-7">
            {products.map((item: any) => (
              <div key={item.id}>
                <div className="bg-[#F5F5F5] p-6 relative rounded">

                  <img
                    src={`https://store-api.softclub.tj/images/${item.image}`}
                    className="w-full h-[220px] object-contain"
                    alt=""
                  />

                  <div className="absolute top-4 right-4 flex flex-col gap-3">
                    <button className="bg-white rounded-full p-2">
                      <Heart size={18} />
                    </button>

                    <button className="bg-white rounded-full p-2">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                <h2 className="font-semibold mt-4">
                  {item.productName}
                </h2>

                <div className="flex gap-2 mt-2">
                  <p className="text-red-500 font-bold">
                    ${item.price}
                  </p>

                  ⭐⭐⭐⭐⭐

                  <span className="text-gray-400">
                    (35)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}