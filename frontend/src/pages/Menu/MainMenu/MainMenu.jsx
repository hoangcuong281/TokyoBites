import Sidebar from './Sidebar/Sidebar';
import MenuContent from './MenuContent/MenuContent';
import { useState } from 'react';

function MainMenu(){
    const menuContainer = {
        marginTop: '30px',
        marginBottom: '200px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'start',
    }
    const [selectedCategory, setSelectedCategory] = useState('all');
    return(
        <div style={menuContainer}>
            <Sidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            <MenuContent
                selectedCategory={selectedCategory}
            />
        </div>
    );
}

export default MainMenu;