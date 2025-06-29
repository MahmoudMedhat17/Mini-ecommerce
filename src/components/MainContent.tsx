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
  const totalProducts = 100;
  const {searchQuery, selectedCategory, minPrice, maxPrice, keyWord} = useFilterContext();
  // This totalPages will give us 9 pages each one of them has 12 products
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  useEffect(()=>{
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;

    if(keyWord){
      url = `https://dummyjson.com/products/search?q=${keyWord}`;
    };

    axios.get(url).then((item)=>{
      setProducts(item.data.products);
      console.log(item.data.products);
    });

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

  // This function handles the pagination by passing page as an argument and use it with conditions to setCurrentPage with this argument
  const handlePagination = (page:number)=>{
    if(page >= 1 && page <= totalPages){
      setCurrentPage(page);
    }
  };

  // This function displays the number of pages of the products
  const getPageNumbers = () =>{
    // This button array that gonna hold the numbers
    const buttons:number[] = [];
    // This variable means that start page starts from 1 page so it won't go below 1 and current-2 means that to show the 2 previous pages from the current page like current page = 5 then shows 4 and 3  
    let startPage = Math.max(1, currentPage - 2);
    // This variable means that end page ends at totalPages and it doesn't go further than totalPages and current+2 means that to show the next 2 pages of the current page like current page = 5 then shows 6 and 7
    let endPage = Math.min(totalPages, currentPage + 2);

    if(currentPage - 2 < 1){
      endPage = Math.min(totalPages, endPage + (2 - currentPage -1));
    };

    if(currentPage + 2 > totalPages){
      startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
    };


    // Here this for loop puts the numbers one by one into the array"buttons";
    for(let i = startPage; i <= endPage; i++){
      // Here we push the numbers into the array
      buttons.push(i);
    };

    // Return the array to get the number of the pages
    return buttons;
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
        <section className='grid md:grid-cols-3 lg:grid-cols-4 gap-5 mt-2 overflow-y-auto'>
            {
              filteringProducts.map((product)=>(
                <Itemcard key={product.id} id={product.id} title={product.title}  price={product.price} image={product.thumbnail}/>
              ))
            }
        </section>

        {/* Pagination here */}
        <section className='mt-10 flex justify-between items-center'>
          {
            // Here we check if the there's any products displayed then show the Pagination if not then do not show the pagination
            filteringProducts.length !== 0 && 
            (
              <>
                <button disabled={currentPage === 1} onClick={()=> handlePagination(currentPage - 1)} className='font-semibold cursor-pointer'>
                  Previous
                </button>
                {/* Numbers */}
                <div className='flex items-center gap-10'>
                  {
                    getPageNumbers().map((number, index)=>(
                      <button onClick={()=> setCurrentPage(number)} key={index} className={`font-semibold px-2 rounded-full cursor-pointer text-black ${currentPage === number ? "bg-black text-white" : ""}`}>
                        {number}
                      </button>
                    ))
                  }
                </div>
                <button disabled={currentPage === totalPages} onClick={()=> handlePagination(currentPage + 1)} className='font-semibold cursor-pointer'>
                  Next
                </button>
              </>
            )
          }
        </section>
    </div>
  )
};

export default MainContent;