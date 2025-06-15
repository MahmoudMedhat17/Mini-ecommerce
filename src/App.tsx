import {Routes, Route} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ItemContent from "./components/ItemContent";



const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex">
        <Routes>
          <Route path="/" element={<MainContent/>}/>
          <Route path="/product/:id" element={<ItemContent/>}/>
        </Routes>
      </div>
    </div>
  )
};

export default App;