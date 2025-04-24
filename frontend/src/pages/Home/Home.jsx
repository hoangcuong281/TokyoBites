import Hero from './Hero/Hero'
import Slide from './Slide/Slide'
import Menu from './Menu/Menu'
import OurTeam from './OurTeam/ourteam'
import Event from './Event/event'
import NavBar from '../../components/NavBar/navBar'
import Footer from '../../components/Footer/Footer' 

function Home(){
    return(
        <>            
            <NavBar/>
            <Hero/>
            <Slide/>
            <Menu/>
            <OurTeam/>
            <Event/>
            <Footer/>
        </>
    );
}

export default Home;