import { Tally3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFilterContext } from '../context/FilterContext';
import axios from 'axios';
import Itemcard from './Itemcard';



const MainContent = () => {
  const[products,setProducts] = useState<string[]>([]);
  const[filter,setFilter] = useState("all");
  const[dropDownMenu, setDropDownMenu] = useState(false);
  const[currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const {searchQuery, selectedCategory, minPrice, maxPrice, keyWord} = useFilterContext();


  useEffect(()=>{
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;

    if(keyWord){
      url = `https://dummyjson.com/products/search?q=${keyWord}`;
    };

    axios.get(url).then((item)=>{
      setProducts(item.data.products);
      console.log(item.data.products);
    })

  },[currentPage, keyWord]);

  let filteringProducts = [...products];

  const getFilteredProducts = () =>{

    // Here check if SearchQuery exists in the API then do the filteration
    if(searchQuery){
      // Filter the products according to title in lowerCase
      filteringProducts = filteringProducts.filter((product)=> product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    };

    // Check if selectedCategory exists in the API
    if(selectedCategory){
      // Filter the products according to if product.category is the same as the category the user selected
      filteringProducts = filteringProducts.filter((product)=> product.category === selectedCategory);
    };

    // Check if the minPrice is not = to undefined
    if(minPrice !== undefined){
      // Filter the products according to product.price is lower or equal to minPrice
      filteringProducts = filteringProducts.filter((product)=> product.price >= minPrice);
    };

    // Check if the maxPrice is not = to undefined
    if(maxPrice !== undefined){
      // Filter the products according to product.price is higher or equal to maxPrice
      filteringProducts = filteringProducts.filter((product) => product.price <= maxPrice);
    };

    // Check if filter is applied
    if(filter){
      // If filter is equal to Cheap
      if(filter === "Cheap"){
        // then filter the products according to cheapest prices
        return filteringProducts.sort((a,b) => a.price - b.price);
      };

      // If filter is equal to Expensive
      if(filter === "Expensive"){
        // then filter the products according to expensive prices
        return filteringProducts.sort((a,b)=> b.price - a.price);
      };

      // If filter is equal to Popular
      if(filter === "Popular"){
        // then filter the products according to Popular items
        return filteringProducts.sort((a,b)=> b.rating - a.rating);
      };
    }
    // Return the filtered products anyway even when the user doesn't choose a filter option
    return filteringProducts;
  };


  const filteredProducts = getFilteredProducts();
  console.log(filteredProducts);


  return (
    <div className="p-5 xs:w-[20rem] sm:w-[40rem] lg:w-[55rem]">
        <section onClick={()=>setDropDownMenu((prev)=> !prev)} className='relative w-fit cursor-pointer p-2 flex items-center justify-between text-black border border-gray-200 rounded-full'>
            <Tally3/>
            <p className='font-semibold'>Filter</p>
            {
              dropDownMenu && (
                <div className='w-fit absolute top-11 left-0 bg-white shadow-lg px-2 py-1 rounded-md space-y-2'>
                  <button onClick={()=>setFilter("Cheap")} className='block font-semibold'>Cheap</button>
                  <button onClick={()=>setFilter("Expensive")} className='block font-semibold'>Expensive</button>
                  <button onClick={()=>setFilter("Popular")} className='block font-semibold'>Popular</button>
                </div>
              )
            }
        </section>

        {/* Main Content */}
        <section className='grid sm:grid-cols-3 md:grid-cols-4 gap-5 mt-2 overflow-y-auto'>
            {
              products.map((product)=>(
                <Itemcard key={product.id} id={product.id} title={product.title}  price={product.price} image={product.thumbnail}/>
              ))
            }
        </section>
    </div>
  )
};

export default MainContent;