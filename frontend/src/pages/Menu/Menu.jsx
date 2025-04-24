import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Header from "./Header/Header";
import MainMenu from "./MainMenu/MainMenu";

function Menu(){
    return(
        <div>
            <NavBar/>
            <Header/>
            <MainMenu/>
            <Footer/>
        </div>
    )
}

export default Menu;