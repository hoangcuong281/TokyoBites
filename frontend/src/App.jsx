import Home from './pages/Home/Home'
import Menu from './pages/Menu/Menu'
import Admin from './pages/Admin/Admin'
import Rating from './pages/Rating/rating'
import Team from './pages/Team/team'
import Event from './pages/Event/event'
import Contact from './pages/Contact/contact'
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
            <Route path="/checkpayment" element={<Checkpayment/>}/>
            <Route path="/rating" element={<Rating/>}/>
            <Route path="/team" element={<Team/>}/>
            <Route path="/event" element={<Event/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="*" element={<Home/>}/>
        </Routes>
    );
}

export default App
