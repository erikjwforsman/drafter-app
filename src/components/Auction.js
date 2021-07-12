import React from "react";
import styles from "../AppStyles.module.css"


const Auction = (props) => {
    //console.log(props)

   //console.log(props.playerQueue)
    //const data = props.playerQueue
    const filteredQueue = props.playerQueue.filter((value, index) => props.playerQueue.indexOf(value) === index)
    //console.log(filteredQueue)
    return(
        
        <div className={styles.BigScreen}>
            <div>
                <h2>Sold Players: (Tähän tulee myyntikohta)</h2>
                {props.soldPlayers.map(p => <p key={p.playerName}>{p.playerName}</p>)}
            </div>
            <div>
                <h2>Jono</h2>
                {filteredQueue.map(p => <p>{p.playerName}</p>)}
            </div>

        </div>
    )
}

export default Auction;