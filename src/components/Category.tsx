import axios from "axios";
import { Heart, Eye, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const url =
  "https://fastcard-1-o23z.onrender.com/api/Product/get-products";

export default function Category() {
  const [products, setProducts] = useState<any[]>([]);

  // CATEGORY
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // BRANDS
  const [selectedBrands, setSelectedBrands] = useState<
    string[]
  >([]);

  // FEATURES
  const [selectedFeatures, setSelectedFeatures] =
    useState<string[]>([]);

  // PRICE
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);

  async function getProduct() {
    try {
      const { data } = await axios.get(url);

      setProducts(data?.data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  // BRAND FILTER
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  // FEATURE FILTER
  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  // FILTER PRODUCTS
  const filteredProducts = products.filter((item: any) => {
    const productPrice = Number(item.price);

    // CATEGORY
    const categoryMatch =
      selectedCategory === "All"
        ? true
        : item.categoryName
            ?.toLowerCase()
            .includes(selectedCategory.toLowerCase());

    // BRAND
    const brandMatch =
      selectedBrands.length === 0
        ? true
        : selectedBrands.includes(item.brand);

    // FEATURES
    const featureMatch =
      selectedFeatures.length === 0
        ? true
        : selectedFeatures.some((feature) =>
            item.features?.includes(feature)
          );

    // PRICE
    const priceMatch =
      productPrice >= minPrice &&
      productPrice <= maxPrice;

    return (
      categoryMatch &&
      brandMatch &&
      featureMatch &&
      priceMatch
    );
  });

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-10">
        <p>Home</p>
        <span>/</span>
        <p className="text-black font-medium">
          Explore Our Products
        </p>
      </div>

      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="w-[270px] hidden lg:block">
          {/* CATEGORY */}
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[18px]">
                Category
              </h2>

              <ChevronDown size={18} />
            </div>

            <div className="flex flex-col gap-3 text-gray-600">
              {[
                "All",
                "Electronics",
                "Home & Lifestyle",
                "Medicine",
                "Sports & Outdoor",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`text-left hover:text-red-500 transition ${
                    selectedCategory === category
                      ? "text-red-500 font-medium"
                      : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* BRANDS */}
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[18px]">
                Brands
              </h2>

              <ChevronDown size={18} />
            </div>

            <div className="flex flex-col gap-4 text-gray-600">
              {[
                "Samsung",
                "Apple",
                "Huawei",
                "Pocco",
                "Lenovo",
              ].map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(
                      brand
                    )}
                    onChange={() =>
                      handleBrandChange(brand)
                    }
                  />

                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* FEATURES */}
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[18px]">
                Features
              </h2>

              <ChevronDown size={18} />
            </div>

            <div className="flex flex-col gap-4 text-gray-600">
              {[
                "Metallic",
                "Plastic cover",
                "8GB Ram",
                "Super power",
                "Large Memory",
              ].map((feature) => (
                <label
                  key={feature}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(
                      feature
                    )}
                    onChange={() =>
                      handleFeatureChange(feature)
                    }
                  />

                  {feature}
                </label>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[18px]">
                Price range
              </h2>

              <ChevronDown size={18} />
            </div>

            <div className="flex gap-3 mb-4">
              <input
                type="number"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Number(e.target.value))
                }
                className="w-full border rounded-md px-3 py-2 outline-none"
                placeholder="Min"
              />

              <input
                type="number"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
                className="w-full border rounded-md px-3 py-2 outline-none"
                placeholder="Max"
              />
            </div>

            <button className="w-full border border-red-500 text-red-500 py-3 rounded-md hover:bg-red-500 hover:text-white transition">
              Apply
            </button>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="flex-1">
          {/* TOP */}
          <div className="flex items-center justify-end mb-8">
            <select className="border px-5 py-3 rounded-md outline-none">
              <option>Popular</option>
              <option>Newest</option>
              <option>Price Low</option>
              <option>Price High</option>
            </select>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts?.map((item: any) => (
              <div key={item.id}>
                <div className="bg-[#F5F5F5] rounded-md h-[250px] relative flex items-center justify-center group overflow-hidden">
                  <img
                    src={
                      item.image?.startsWith("http")
                        ? item?.image
                        : "https://fastcard-1-o23z.onrender.com/images/" +
                          item?.image
                    }
                    alt={item.description}
                    className="w-[170px] h-[170px] object-contain duration-300 group-hover:scale-105"
                  />

                  {/* ICONS */}
                  <div className="absolute top-4 right-4 flex flex-col gap-3">
                    <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
                      <Heart size={18} />
                    </button>



                 <Link
  to={`/details/${item.id}`}
  className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow"
>
  <Eye size={18} />
</Link>
                  </div>

                  {/* ADD TO CART */}
                  <button className="absolute bottom-0 left-0 w-full bg-black text-white py-3 translate-y-full group-hover:translate-y-0 duration-300">
                    Add To Cart
                  </button>
                </div>

                {/* CONTENT */}
                <div className="mt-4">
                  <h3 className="font-medium text-[17px]">
                    {item.productName}
                  </h3>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-red-500 font-medium">
                      ${item.price}
                    </span>

                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      ★★★★★
                    </div>

                    <span className="text-gray-500 text-sm">
                      (65)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="flex justify-center mt-14">
            <button className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-md duration-300">
              More Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}