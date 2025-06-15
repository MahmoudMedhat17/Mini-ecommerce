import {Routes, Route} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";



const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex">
        <Routes>
          <Route path="/" element={<MainContent/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;