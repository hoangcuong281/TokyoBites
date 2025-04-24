import Sidebar from './Sidebar/Sidebar';
import MenuContent from './MenuContent/MenuContent';
import { useState } from 'react';

function MainMenu(){
    const menuContainer = {
        marginTop: '30px',
        marginBottom: '200px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: '0 6rem',
    }
    const [selectedCategory, setSelectedCategory] = useState('appetizers');
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