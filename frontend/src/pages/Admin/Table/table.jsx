import { useEffect } from 'react';
import styles from './table.module.css';

function Table(){
    const fetchTables = async () =>{
        try{
            const response = await fetch("http://localhost:3000/api/table");
            const data = await response.json();
        } catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchTables();
    }, []);
    return(
        <div className={styles.tableContainer}>
            <h1>Table</h1>
        </div>
    )
}       

export default Table;
