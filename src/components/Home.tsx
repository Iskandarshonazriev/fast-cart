import React from 'react'
import axios from "axios"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import Todays from './todays';
import Banner from './productApi/banner';
const  urlProduct = "https://fastcard-1-o23z.onrender.com/api/Brand/get-brands"

const Home = () => {
const [data,setData] = useState([])
async function getProduct() {
    try {
         const {data} = await axios.get(urlProduct)
       setData(data.data.brands)
    } catch (error) {
        console.log(error)
    }
}

useEffect  (()=>{
    getProduct()
},[])

  return (
<div >
  {/* ===== MOBILE КАТАЛОГ ===== */}
<div className="lg:hidden mt-5 px-5">

  {/* поиск */}
  <div className="border rounded-lg h-[65px] px-5 flex items-center justify-between">
    <input
      placeholder="Search"
      className="outline-none w-full"
    />
  </div>

  {/* категории */}
  <div className="flex flex-wrap gap-3 mt-6">
    {data.map((item:any,index:number)=>(

      <Link
      key={item.id}
      to={`/category/${item.id}`}
      >

      <div className="bg-gray-100 px-4 py-4 rounded-lg flex gap-2">

        {item.categoryName}

        {index <=1 && <span>›</span>}

      </div>

      </Link>

    ))}
  </div>

</div>

 <div className="max-w-[1200px] mx-auto mt-5 flex gap-8">


  {/* LEFT MENU */}
  <div className="hidden lg:block w-[250px] border-r pr-6">
    <div className="flex flex-col gap-6 text-[18px]">
      {data.map((item: any) => (
        <Link key={item.id} to={`/category/${item.id}`}>
          <div className="flex items-center justify-between hover:text-gray-500 cursor-pointer">
            <p>{item.brandName}</p>
            <span>›</span>
          </div>
        </Link>
      ))}
    </div>
  </div>


<Banner/>
</div>
<Todays/>
</div>


  )
}

export default Home