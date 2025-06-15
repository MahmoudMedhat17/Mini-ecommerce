import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

interface productProps{
  thumbnail:string;
  title:string;
  description:string;
  price:number;
  rating:number;
};


const ItemContent = () => {
  // State to store the returned data from the API in product to be able to display the data
  const[product,setProduct] = useState<productProps>();
  // Get the ID from params
  const {id} = useParams();

  useEffect(()=>{
    // Call the API with the ID we get from the params then store the data we called in the state.
    axios.get(`https://dummyjson.com/products/${id}`).then((product)=>setProduct(product.data)).catch((error)=> console.log("Couldn't fetch the product ID!", error));
  },[id]);


  // Check if the product data is still loading or not available then we show to the user that the data is loading
  if(!product){
    return <p className="flex justify-center items-center w-full text-red-600">Loading...</p>
  }

  return (
    <div className="mt-6 ml-4">
      {/* When click on Back button it takes us to the Home Page */}
      <Link to={"/"}>
        <button className="px-2 py-1 cursor-pointer font-semibold w-fit bg-black text-white rounded-md">
          Back
        </button>
      </Link>
      
      {/* Here we display the data of the product we got from the API */}
      <div className="space-y-8">
        <img src={product.thumbnail} alt={product.title} className="w-1/2 object-contain"/>
        <h3 className="font-bold text-2xl">{product.title}</h3>
        <p className="max-w-[70%]">{product.description}</p>
        <div className="flex gap-4">
          <p><span className="font-semibold">Price:</span> ${product.price}</p>
          <p><span className="font-semibold">Rating:</span> {product.rating}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemContent;