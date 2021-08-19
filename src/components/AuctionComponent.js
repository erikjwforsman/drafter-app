import React, {useState} from "react";
import styles from "../AppStyles.module.css"
import AuctionView from "./AuctionView";
import {useMutation} from "@apollo/client"
import {CHANGE_BID, SELL_PLAYER} from "../graphql/queries"
import {teamInfo, validateBid, bidButtonDisabled, playerNextInLine, finalizeSaleButtonDisabled} from "../utils/teamUtils"

const AuctionComponent = (props) => {

    let filteredQueue = props.playerQueue.filter((value, index) => props.playerQueue.indexOf(value) === index)
    const [bid]=useMutation(CHANGE_BID)
    const [sellPlayer] = useMutation(SELL_PLAYER)
    const [customBid, setCustomBid] = useState(props.nominatedPlayer !== null ? props.nominatedPlayer.currentPrice+1 : 2) 
    const [xfinalizeSaleButton, setxFinalizeSaleButton] = useState(true)
    const managerRestrictions = teamInfo(props.manager.players.length, props.manager.salary)
    const currentBidPlusOne = props.nominatedPlayer !== null ? props.nominatedPlayer.currentPrice+1 : 1
    const highestBidder = props.nominatedPlayer !== null ? props.teams.find(t => t.id === props.nominatedPlayer.bidder) : null
    const bidPlusOne = async(team) => {
        const newestBid= {bidder:team.id, playerId:props.nominatedPlayer.player.id, currentPrice:Number(currentBidPlusOne) }
        const curManager = props.teams.find(t => t.id === team.id)
        const curManagerRestrictions=teamInfo(curManager.players.length, curManager.salary)
        if(validateBid(props.nominatedPlayer, newestBid, curManagerRestrictions)){            
            bid({ variables: newestBid })
        } 
    }

    const submit = async(event) => {
        event.preventDefault()        
        const newestBid= {bidder:props.manager.id, playerId:props.nominatedPlayer.player.id, currentPrice:Number(customBid) }
        if(validateBid(props.nominatedPlayer, newestBid, managerRestrictions)){
            bid({ variables: newestBid })
        } else {
            console.log("Virheilmoitus")   //Aktivoi virhe-ilmoitus tässä
        }        
    }
    console.log(props)
    const finalizeSale = async()=> {
        const soldPlayer = {
            owner:props.nominatedPlayer.bidder, 
            playerName:props.nominatedPlayer.player.playerName, 
            nflTeam: props.nominatedPlayer.player.nflTeam,
            position: props.nominatedPlayer.player.position,
            oldId: props.nominatedPlayer.player.id,
            bye: props.nominatedPlayer.player.bye,
            price: props.nominatedPlayer.currentPrice
        }
        await sellPlayer({variables: soldPlayer})
        props.start(true)
    }
    console.log(highestBidder)
    return(
        <div className={props.turn === null ? styles.SelfInfoOrange : props.manager.id===props.turn.id & props.nominatedPlayer===null ? styles.SelfInfoGreen : props.nominatedPlayer===null ? styles.SelfInfoOrange : props.nominatedPlayer.bidder === props.manager.id ? styles.SelfInfoGreen :  styles.SelfInfoRed}>
            {props.manager.owner==="Erik" &&
            <button onClick={()=>props.start()}>start</button>
            }
            
            {/* Auction timer */}
            <div className={styles.TimerSection}>
                {props.nominatedPlayer !== null && 
                <h3 className={styles.Mini}>Time left:</h3>
                }
                <AuctionView  playerQueue={filteredQueue} nominatedPlayer={props.nominatedPlayer} turn={props.turn} lähetys={props.lähetys} xfinalizeSaleButton={xfinalizeSaleButton} />
                {props.nominatedPlayer !== null &&
                <div>
                <h4 className={styles.Mini}>Nominated by</h4>
                <h4 className={styles.MiniUp}>{props.turn.owner}</h4>
                </div>
                }
            </div>

            {/* Manager toolsit */}
            {props.nominatedPlayer !== null &&
            <div >
                <h4 className={styles.Mini}>Current bid:</h4>
                <h3 className={styles.TimerWithMargins}><strong>${props.nominatedPlayer.currentPrice}</strong></h3>
                <div className={styles.LittlePadding}>
                Quick bid <button disabled={bidButtonDisabled(props.nominatedPlayer, props.manager)!==true} onClick={()=>bidPlusOne(props.manager)}>${currentBidPlusOne}</button>
                
                <form onSubmit={submit}>
                    <div>
                        Bid <input
                            style={{width: "30px"}}
                            
                            onChange={ ({target}) => setCustomBid(target.value)}
                        />
                    
                    <button disabled={bidButtonDisabled(props.nominatedPlayer, props.manager)!==true } type="submit">bid</button>
                    </div>
                </form>
                </div>
                <h4 className={styles.Mini}>Highest bid:</h4>
                <h4 className={styles.MiniUp}>{highestBidder.owner}</h4>
            </div>
            }
            {/* Player info */}
            {props.nominatedPlayer !== null &&
            <div className={styles.TimerSection}>
                <h2 className={styles.MiniDown}>Player: {props.nominatedPlayer.player.playerName},  {props.nominatedPlayer.player.nflTeam} {props.nominatedPlayer.player.injury}</h2>
                <h4 className={styles.NoMarginOrPadding}>Position: {props.nominatedPlayer.player.position}</h4>
                <h4 className={styles.NoMarginOrPadding}>Avg price: {props.nominatedPlayer.player.expectedValue}</h4>
                <h4 className={styles.NoMarginOrPadding}>Bye Week: {props.nominatedPlayer.player.bye}</h4>
                
                
            </div>
            }
            
        </div>
    )

    // return(
        
    //     <div className={styles.BigScreen}>
    //         <AuctionView playerQueue={filteredQueue} nominatedPlayer={props.nominatedPlayer} turn={props.turn} lähetys={props.lähetys} xfinalizeSaleButton={xfinalizeSaleButton}/>

    //         <h2>Manager tools</h2>
    //         <button disabled={bidButtonDisabled(props.nominatedPlayer, props.manager)!==true} onClick={()=>bidPlusOne(props.manager)}>${currentBidPlusOne}</button>
    //         <form onSubmit={submit}>
    //             <div>
    //                 Custom bid <input
    //                     value={customBid}
    //                     onChange={ ({target}) => setCustomBid(target.value)}
    //                 />
    //             </div>
    //             <button disabled={bidButtonDisabled(props.nominatedPlayer, props.manager)!==true } type="submit">bid</button>
    //         </form>
            


    //         {props.manager.owner==="Erik" &&
    //             <div>
    //             <h2>Commish tool</h2>
    //             <button disabled={xfinalizeSaleButton} onClick={()=>finalizeSale()}>Finalize sale</button>
    //             { props.teams.map(t => <p key={t.id}>{t.owner} <button disabled={bidButtonDisabled(props.nominatedPlayer, t)!==true} onClick={()=>bidPlusOne(t)}>${currentBidPlusOne}</button></p>) }
    //             </div>
    //         }
            

    //         <div>
    //             <h2>Jono</h2>
    //             {filteredQueue.map(p => <p key={p.id}>{p.playerName} <button onClick={ () => props.callBackRemove(p.id)}>Remove</button></p>)}
    //         </div>

    //     </div>
    // )
}

export default AuctionComponent;