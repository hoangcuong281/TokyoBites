import Home from './pages/Home/Home'
import Menu from './pages/Menu/Menu'
import Admin from './pages/Admin/Admin'
import Test from './pages/Test/test'
import TableBooking from './pages/TableBooking/tablebooking'
import Checkpayment from './pages/Checkpayment/checkpayment'
import { Route, Routes } from "react-router-dom";

function App() {

    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/tablebooking" element={<TableBooking/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/checkpayment" element={<Checkpayment/>}/>
        </Routes>
    );
}

export default App
