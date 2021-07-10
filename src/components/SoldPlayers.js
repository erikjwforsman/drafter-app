import React from "react";
import styles from "../AppStyles.module.css"


const SoldPlayers = (props) => {
    

    //console.log(props.soldPlayers)

    return(
        <div className={styles.BigScreen}>
            <h2>Sold Players: (Tähän tulee myyntikohta)</h2>
            {props.soldPlayers.map(p => <p key={p.playerName}>{p.playerName}</p>)}

        </div>
    )
}

export default SoldPlayers;