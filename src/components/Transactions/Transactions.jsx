import React, { useContext, useEffect, useId, useState } from "react";
import styles from "../Transactions/Transactions.module.css"
import EachList from "../EachList/EachList";
import { context } from "../Main/Main";
const Transactions = ()=>{
    const {allData,setAllData,setTotalExpense,setBalance} = useContext(context);
    const [listId,setListId] = useState('');
    
    //  let filteredArr = allData.filter((ele)=>{
    //         return ele.id !== listId;
    //  })
    useEffect(()=>{
        let filteredArr = allData.filter(ele=>{
            return ele.id !== listId;
        })
        setAllData([...filteredArr]);

        let foundData = allData.find((ele)=>{
            return ele.id === listId;
        })
        if(foundData){
           
            setBalance(prev=>prev+Number(foundData.price));
            setTotalExpense(prev=>prev-foundData.price);
        }
    },[listId]);
   
    return(
        <div className={styles.transactions}>
            <h2 id={styles.heading}>Recent Expenses</h2>
            <div className={styles.expenseList}>
           
             { 
              allData.map((ele)=>(
                    <EachList  ele={ele} setListId={setListId} />
                ))
             }

            </div>

        </div>
    )

}
export default Transactions;