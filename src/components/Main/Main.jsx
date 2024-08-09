import React, { createContext, useEffect, useState } from "react";
import styles from "../Main/Main.module.css"
import Top from "../Top/Top";
import Bottom from "../Bottom/Bottom";
import { enqueueSnackbar } from "notistack";
let context = createContext();
export {context};
const Main = ()=>{
    const [newData,setNewData] = useState({});
    const [allData,setAllData] = useState([]);
    const [balance,setBalance] = useState();
    const [check1,setCheck1] = useState(false);
    const [check2,setCheck2] = useState(false);
    const [check3,setCheck3] = useState(false);
    const [totalExpense,setTotalExpense] = useState();
    const [categories,setCategories] = useState();
    const [catPrice,setCatPrice] = useState();
    const [itemId,setItemId] = useState('');
    // const [rmvItemMoney,setRmvItemMoney] = useState(0);

    useEffect(()=>{
        if(localStorage.hasOwnProperty("balance") && localStorage.hasOwnProperty("expense") ){
            let bal = localStorage.getItem("balance");  
            setBalance(Number(bal));
            let expen = Number(localStorage.getItem("expense"));
            setTotalExpense(expen);
            // let arr = JSON.parse(localStorage.getItem("expenseList"))
            // if(Array.isArray(arr) && arr.length>0){
            //     let eList = JSON.parse(localStorage.getItem("expenseList"));
            //     setAllData(eList)
            // }
        }else{
            localStorage.setItem("balance",5000);
            setBalance(5000)
            localStorage.setItem("expense",0);
            setTotalExpense(0);
            localStorage.setItem("expenseList",JSON.stringify([]));
            // setAllData([])
            // setAllData(JSON.parse(localStorage.getItem("expenseList")));
        }
        let getData = JSON.parse(localStorage.getItem("expenseList"));
        console.log('getData',getData) 
        if( getData && Array.isArray(getData)){
            if(getData.length > 0){
                setAllData(getData);
            }
        }else{
            localStorage.setItem("expenseList",JSON.stringify([]));
        }

    },[]);
    
    useEffect(()=>{
        if(!check1){
          localStorage.setItem("balance",localStorage.getItem("balance"));
        //   localStorage.setItem("expense",localStorage.getItem("expense"));
          console.log(balance);
          setCheck1(true);
        }else{
            localStorage.setItem('balance',balance);
            // localStorage.setItem('expense',totalExpense)
        }
    },[balance]);

    useEffect(()=>{
        if(!check2){
            //localStorage.setItem("balance",localStorage.getItem("balance"));
            localStorage.setItem("expense",localStorage.getItem("expense"));
            //console.log(balance);
            setCheck2(true);
          }else{
              //localStorage.setItem('balance',balance);
              localStorage.setItem('expense',totalExpense)
          }

    },[totalExpense]);

 

    useEffect(()=>{
        if(Object.keys(newData).length !==0){
            // console.log(newData);
            if(balance >= newData.price){
                if(itemId){
                    let arr = allData.map((ele)=>{
                        if(ele.id === itemId){
                            return newData;
                        }else{
                            return ele;
                        }
                    });
                   console.log(arr);
                }
                let allExpense = Number(newData.price)+totalExpense;
                setAllData([...allData,newData]);
                setTotalExpense(allExpense);
                setBalance((prev)=>prev-newData.price);
            }else{
                enqueueSnackbar('In sufficiant balance',{variant:"Alert"})
            }
         }
    },[newData]);

    // console.log(allData);

    // useEffect(()=>{
    //     console.log(rmvItemMoney)
    //     setBalance(prev=>prev+rmvItemMoney);
    //     setTotalExpense(prev=>prev-rmvItemMoney)
    // },[rmvItemMoney]);
    
    // useEffect(()=>{
    //     if(!check3){
    //         localStorage.setItem("expenseList",JSON.parse(localStorage.getItem("expenseList")));
    //         // console.log(localStorage)
    //         setCheck3(true);
    //     }else{
    //         localStorage.setItem("expenseList",JSON.stringify(allData))
    //     }
    // },[allData])

    useEffect(()=>{
        !check3?setCheck3(true):localStorage.setItem('expenseList',JSON.stringify([...allData]))
        let map1 = new Map();
        let map2 = new Map();
        for(let i=0;i<allData.length;i++){
            if(map1.has(allData[i].category)){
                map1.set(allData[i].category,map1.get(allData[i].category)+1);
                map2.set(allData[i].category,Number(map2.get(allData[i].category))+Number(allData[i].price))
            }else{
                map1.set(allData[i].category,1);
                map2.set(allData[i].category,allData[i].price)
            }
        }
        console.log(map1,map2)
        //console.log(map);
        let t = map1.get("travel");
        let f = map1.get("food");
        let e = map1.get("entertainment");
        if(t>0 || f >0 || e>0){
            setCategories([{name:"travel",value:t},{name:"entertainment",value:e},{name:"food",value:f}]);
        }else{
            
            setCategories([{name:"travel",value:0},{name:"entertainment",value:0},{name:"food",value:0}]);
        }

        let tp = map2.get("travel");
        let fp = map2.get("food");
        let ep = map2.get("entertainment");
        if(tp > 0 || fp>0 || ep>0){
            setCatPrice([{name:"travel",amt:tp},{name:"entertainment",amt:ep},{name:"food",amt:fp}])
        }else{
            setCatPrice([{name:"travel",amt:0},{name:"entertainment",amt:0},{name:"food",amt:0}])

        }
    },[allData]);

    // console.log(categories)
    return(
        <context.Provider value={{setNewData,newData,allData,setAllData,balance,setBalance,totalExpense,categories,catPrice,setItemId,totalExpense,setTotalExpense}}>
        <div className={styles.main}>
            <Top/>
            <Bottom/>
        </div>
        </context.Provider>
    )
}
export default Main;