import {useState, createContext, useContext} from "react";

interface FilterContextProps{
    searchQuery:string;
    setSearchQuery:(query:string)=>void;
    selectedCategory:string;
    setSelectedCategory:(category:string)=>void;
    minPrice:number | undefined;
    setMinPrice:(price: number | undefined)=>void;
    maxPrice:number | undefined;
    setMaxPrice:(price: number | undefined)=>void;
    keyWord:string;
    setKeyWord:(keyword:string)=>void;
};


const FilterContextType = createContext<FilterContextProps | undefined>(undefined);


export const FilterContext = ({children}:{children:React.ReactNode}) =>{
    
    const[searchQuery,setSearchQuery] = useState<string>("");
    const[selectedCategory,setSelectedCategory] = useState<string>("");
    const[minPrice,setMinPrice] = useState<number>();
    const[maxPrice,setMaxPrice] = useState<number>();
    const[keyWord,setKeyWord] = useState<string>("");

    
    return(
     <FilterContextType.Provider value={{searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, keyWord, setKeyWord}}>
        {children}
     </FilterContextType.Provider>   
    )
};


export const useFilterContext = () =>{
    const filterContext = useContext(FilterContextType);
    if(!filterContext){
        throw new Error("filterContext isn't working!");
    }
    return filterContext;
};


export default FilterContext;