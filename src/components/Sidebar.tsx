import axios from "axios";
import { useState, useEffect } from "react";
import {useFilterContext} from "../context/FilterContext";
import { Link } from "react-router-dom";


const url = "https://dummyjson.com/products";



const Sidebar = () => {

  const [categories,setCategories] = useState<string[]>([]);
  const keyWords = ["apple", "watch", "fashion", "trend", "shoes", "shirt"];
  const {searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, keyWord, setKeyWord} = useFilterContext();

  useEffect(()=>{
    const fetchCategories = async () =>{
      try {
        const products = await axios.get(url);
        const data = products.data;
        // To remove the duplicated data when calling data from the API
        const uniqueCategories = [... new Set(data.products?.map((product)=> product.category))];
        // console.log(uniqueCategories);
        // setCategories with the unique data
        setCategories(uniqueCategories as string[]);
      } catch (error) {
        console.log("Failed to fetch categories!", error);
      }
    };

    fetchCategories();
  },[]);

  const handleMinPrice = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPrice = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioButtonCheck = (category:string) =>{
    setSelectedCategory(category);
  };

  const handleKeyWords = (keyword:string) =>{
    setKeyWord(keyword);
  };

  const handleResetButton = () =>{
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyWord("");
  };

  return (
    <div className="px-4 py-2 w-64">
      <Link to={"/"}>
        <h2 className="font-bold text-xl mb-4 mt-5">React Store</h2>
      </Link>
      <section>
        <input type="text" className="px-4 py-1 border border-gray-300 rounded-md mb-3" placeholder="Search Product" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}/>
        <div className="flex gap-2">
          <input type="text" placeholder="Min" className="px-4 py-1 w-full border rounded-md border-gray-300" value={minPrice ?? ""} onChange={handleMinPrice}/>
          <input type="text" placeholder="Max" className="px-4 py-1 w-full border rounded-md border-gray-300" value={maxPrice ?? ""} onChange={handleMaxPrice}/>
        </div>
      </section>

      <section className="mt-4">
        <h2 className="font-semibold text-xl mb-4">Categories</h2>
        {
          categories.map((category,index)=>(
            <label key={index} className="flex items-center gap-2">
              <input type="radio" value={category} onChange={()=>handleRadioButtonCheck(category)} checked={selectedCategory === category}/>
              <p>{category.toUpperCase()}</p>
            </label>
          ))
        }
      </section>
      <section className="mt-4">
        <h2 className="font-semibold text-xl mb-4">Keywords</h2>
        <div className="flex flex-col space-y-2">
          {
            keyWords.map((keyword,index)=>(
              <button onClick={()=>handleKeyWords(keyword)} key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-md duration-300 w-full flex items-start">
                {
                  keyword.toUpperCase()
                }
              </button>
            ))
          }
        </div>
      </section>
      <div className="mt-4">
        <button onClick={handleResetButton} className="px-4 py-2 cursor-pointer font-semibold w-full bg-black text-white rounded-md">Reset Filters</button>
      </div>
    </div>
  )
};

export default Sidebar;