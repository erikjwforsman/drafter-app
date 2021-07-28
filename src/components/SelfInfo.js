import React from "react";
import styles from "../AppStyles.module.css"

const SelfInfo = (props) => {
    //const manager = props.manager
    //const manager = props.manager[0]
    // console.log(props.manager.owner)
    // console.log(props.manager)

    return (<div className={styles.Flexi}>
        <button onClick={()=>props.start()}>start</button>
        <h1>Managerin info: {props.manager.owner}</h1>
        <p>Rahat, pelaajat paikottain jne.</p>
        </div>)
}

export default SelfInfo;