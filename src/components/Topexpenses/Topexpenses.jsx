import React from "react";
import styles from "../Topexpenses/Topexpenses.module.css"
import Barchart from "../Barchart/Barchart";
const Topexpenses = ()=>{
    return(
        <div className={styles.topexpense}>
            <h2 id={styles.heading}>Top Expenses</h2>
            <div className={styles.expenseProgress}>
            {/* <h2>hello</h2>
            <h2>hello</h2>
            <h2>hello</h2>
            <h2>hello</h2> */}
            <Barchart/>
            

            </div>
            

        </div>
    )

}
export default Topexpenses;