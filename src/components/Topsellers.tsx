import { useState, useEffect } from "react";
import axios from "axios";


interface authorProps{
  name:string;
  isFollowing:boolean;
  image:string;
};

const Topsellers = () => {


  const[authors,setAuthors] = useState<authorProps[]>([]);


  useEffect(()=>{
    const fetchUsers = async () =>{
      try {
        // Here we get the data from the API by 5 per result
        const response = await axios.get("https://randomuser.me/api/?results=5");
        const data = response.data;
        // We set the state with the data we want by mapping over the array we get from the API and extract the name, isFollowing, image properties
        setAuthors(data.results.map((user:any)=>{
          return{
            name:`${user.name.first} ${user.name.last}`,
            isFollowing:false,
            image:user.picture.medium
          }
        }));
      } catch (error) {
        console.log("Can't get users from the API!", error);
      };
    }

    fetchUsers();
  },[]);


  

  return (
    <div className="px-4 py-2 border-2 border-gray-100 mt-10">
      <h2 className="font-bold text-xl">Top Sellers</h2>
      <div className="flex flex-col justify-between items-center space-y-8 mt-10">
        {
          authors.map((author, index)=>(
            <>
              <div key={index} className="w-full flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <img src={author.image} alt={author.name}  className="w-[25%] h-[25%] rounded-full"/>
                  <p>
                    {author.name}
                  </p>
                </div>
                <button className={`cursor-pointer ${author.isFollowing ? "bg-red-600 text-white" : "bg-black text-white"} px-2 py-1 rounded-md`}>
                  {author.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </>
          ))
        }
      </div>
    </div>
  )
}

export default Topsellers;