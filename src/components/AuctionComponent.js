import React from "react";
import styles from "../AppStyles.module.css"
import AuctionView from "./AuctionView";


const AuctionComponent = (props) => {
    let filteredQueue = props.playerQueue.filter((value, index) => props.playerQueue.indexOf(value) === index)
    
       // console.log(filteredQueue)

    // const removeFromQueue = (removeThis) => {
    //     const ret = filteredQueue.filter(p => p.id !== removeThis)
    //     filteredQueue = ret
    //     console.log("Uusi", filteredQueue)
    // }

    return(
        
        <div className={styles.BigScreen}>
            <AuctionView playerQueue={filteredQueue} currentBid={props.currentBid}/>
            <div>
                <h2>Jono</h2>
                {filteredQueue.map(p => <p key={p.id}>{p.playerName} <button onClick={ () => props.callBackRemove(p.id)}>Remove</button></p>)}
            </div>

        </div>
    )
}

export default AuctionComponent;