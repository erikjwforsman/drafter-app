import React, {useState} from "react";
import styles from "../AppStyles.module.css"
import AuctionView from "./AuctionView";
import {useMutation} from "@apollo/client"
import {CHANGE_BID, SELL_PLAYER} from "../graphql/queries"
import {teamInfo, validateBid, bidButtonDisabled, playerNextInLine, finalizeSaleButtonDisabled} from "../utils/teamUtils"

const AuctionComponent = (props) => {
    //Lisää 3 sekunnin jäädytys uuden tarjouksen tullessa

    let filteredQueue = props.playerQueue.filter((value, index) => props.playerQueue.indexOf(value) === index)
    const [bid]=useMutation(CHANGE_BID)
    const [sellPlayer] = useMutation(SELL_PLAYER)
    const [customBid, setCustomBid] = useState(props.nominatedPlayer !== null ? props.nominatedPlayer.currentPrice+1 : 2) 
    const [xfinalizeSaleButton, setxFinalizeSaleButton] = useState(true)
    //console.log(props)
    const managerRestrictions = teamInfo(props.manager.players.length, props.manager.salary)
    const currentBidPlusOne = props.nominatedPlayer !== null ? props.nominatedPlayer.currentPrice+1 : 1

    const bidPlusOne = async(team) => {
        const newestBid= {bidder:team.id, playerId:props.nominatedPlayer.player.id, currentPrice:Number(currentBidPlusOne) }
        const curManager = props.teams.find(t => t.id === team.id)
        const curManagerRestrictions=teamInfo(curManager.players.length, curManager.salary)
        if(validateBid(props.nominatedPlayer, newestBid, curManagerRestrictions)){            
            bid({ variables: newestBid })
        } else {
            console.log("Virheilmoitus") //Aktivoi virhe-ilmoitus tässä
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
        await props.start(true) //Turha await?
    }


    //koodi auto nominationiin
    // const Startti = 
    // if (props.nominatedPlayer===null & Date.now()<props.nominatedPlayer.timeLeft){
    //     const next = playerNextInLine(props.playerQueue, props.autoPick)
    //     console.log(next)
    // }

    //Tee muualla hyväksyttävä disabled koodi finalizeSaleen
    //props.nominatedPlayer===null | Date.now()<props.nominatedPlayer.timeLeft 
    console.log(props)
    return(
        <div className={props.turn === null ? styles.SelfInfoOrange : props.manager.id===props.turn.id & props.nominatedPlayer===null ? styles.SelfInfoGreen : props.nominatedPlayer===null ? styles.SelfInfoOrange : props.nominatedPlayer.bidder === props.manager.id ? styles.SelfInfoGreen :  styles.SelfInfoRed}>
            {props.manager.owner==="Erik" &&
            <button onClick={()=>props.start()}>start</button>
            }
            {/* Auction timer */}
            <AuctionView playerQueue={filteredQueue} nominatedPlayer={props.nominatedPlayer} turn={props.turn} lähetys={props.lähetys} xfinalizeSaleButton={xfinalizeSaleButton} />
            {/* Manager toolsit */}
            <div>
                <button disabled={bidButtonDisabled(props.nominatedPlayer, props.manager)!==true} onClick={()=>bidPlusOne(props.manager)}>${currentBidPlusOne}</button>
                
                <form onSubmit={submit}>
                    <div>
                        Custom bid <input
                            value={customBid}
                            onChange={ ({target}) => setCustomBid(target.value)}
                        />
                    </div>
                    <button disabled={bidButtonDisabled(props.nominatedPlayer, props.manager)!==true } type="submit">bid</button>
                </form>
            </div>
            {/* Player info */}
            {props.nominatedPlayer !== null &&
            <div>
                <h2>Player: {props.nominatedPlayer.player.playerName},  {props.nominatedPlayer.player.nflTeam}</h2>
                <h3>Avg price:</h3>
                <h3>Bye Week:</h3>
            </div>
            }
            {props.nominatedPlayer === null &&
            <div>
                <h2>Waiting for nomination</h2>
            </div>
            }
            Uusi paikka Auctionille
        </div>
    )

    return(
        
        <div className={styles.BigScreen}>
            <AuctionView playerQueue={filteredQueue} nominatedPlayer={props.nominatedPlayer} turn={props.turn} lähetys={props.lähetys} xfinalizeSaleButton={xfinalizeSaleButton}/>

            <h2>Manager tools</h2>
            <button disabled={bidButtonDisabled(props.nominatedPlayer, props.manager)!==true} onClick={()=>bidPlusOne(props.manager)}>${currentBidPlusOne}</button>
            <form onSubmit={submit}>
                <div>
                    Custom bid <input
                        value={customBid}
                        onChange={ ({target}) => setCustomBid(target.value)}
                    />
                </div>
                <button disabled={bidButtonDisabled(props.nominatedPlayer, props.manager)!==true } type="submit">bid</button>
            </form>
            


            {props.manager.owner==="Erik" &&
                <div>
                <h2>Commish tool</h2>
                <button disabled={xfinalizeSaleButton} onClick={()=>finalizeSale()}>Finalize sale</button>
                { props.teams.map(t => <p key={t.id}>{t.owner} <button disabled={bidButtonDisabled(props.nominatedPlayer, t)!==true} onClick={()=>bidPlusOne(t)}>${currentBidPlusOne}</button></p>) }
                </div>
            }
            

            <div>
                <h2>Jono</h2>
                {filteredQueue.map(p => <p key={p.id}>{p.playerName} <button onClick={ () => props.callBackRemove(p.id)}>Remove</button></p>)}
            </div>

        </div>
    )
}

export default AuctionComponent;