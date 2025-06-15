import {Link} from "react-router-dom";

interface itemCardProps{
    id:number;
    title:string;
    price:number;
    image:string;
};


const Itemcard = ({id, title, price, image}: itemCardProps) => {
  return (
    <div className="w-full flex">
        <Link to={`/product/${id}`} className="border-2 border-gray-200 rounded-lg p-4">
            <img src={image} alt={title} />
            <h3 className="font-bold">{title}</h3>
            <p>${price}</p>
        </Link>
    </div>
  )
}

export default Itemcard;