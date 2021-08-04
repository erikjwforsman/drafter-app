import React, {useState} from "react";
import styles from "../AppStyles.module.css"
import AuctionView from "./AuctionView";
import {useMutation} from "@apollo/client"
import {CHANGE_BID, SELL_PLAYER} from "../graphql/queries"
import {teamInfo, validateBid} from "../utils/teamUtils"

const AuctionComponent = (props) => {
    let filteredQueue = props.playerQueue.filter((value, index) => props.playerQueue.indexOf(value) === index)
    const [bid]=useMutation(CHANGE_BID)
    const [sellPlayer] = useMutation(SELL_PLAYER)
    const [customBid, setCustomBid] = useState(props.nominatedPlayer !== null ? props.nominatedPlayer.currentPrice+1 : 2) 
 

    //props.manager kohdentaa
    const managerRestrictions = teamInfo(props.manager.players.length, props.manager.salary)
    //console.log(managerRestrictions)
    //console.log(props.nominatedPlayer.currentPrice)
    //console.log(customBid)
    // console.log(filteredQueue)

    // const removeFromQueue = (removeThis) => {
    //     const ret = filteredQueue.filter(p => p.id !== removeThis)
    //     filteredQueue = ret
    //     console.log("Uusi", filteredQueue)
    // }

    //console.log(props.nominatedPlayer.currentPrice)
    //console.log(customBid)
    const currentBidPlusOne = props.nominatedPlayer !== null ? props.nominatedPlayer.currentPrice+1 : 1

    const bidPlusOne = async(team) => {
        const newestBid= {bidder:team.id, playerId:props.nominatedPlayer.player.id, currentPrice:Number(currentBidPlusOne) }
        const curManager = props.teams.find(t => t.id === team.id)
        //console.log(curManager)
        //console.log(curManager)
        const curManagerRestrictions=teamInfo(curManager.players.length, curManager.salary)
        //console.log(curManagerRestrictions)
        if(validateBid(props.nominatedPlayer, newestBid, curManagerRestrictions)){
            
            //console.log(newestBid)
            bid({ variables: newestBid })
        } else {
            console.log("Virheilmoitus")
        }

    }


    const submit = async(event) => {
        event.preventDefault()
        
        const newestBid= {bidder:props.manager.id, playerId:props.nominatedPlayer.player.id, currentPrice:Number(customBid) }
        if(validateBid(props.nominatedPlayer, newestBid, managerRestrictions)){
            bid({ variables: newestBid })
        } else {
            console.log("Virheilmoitus")
        }
        
    }

    const finalizeSale = async()=> {
        console.log("Sold!!!!!")
        const soldPlayer = {
            owner:props.nominatedPlayer.bidder, 
            playerName:props.nominatedPlayer.player.playerName, 
            nflTeam: props.nominatedPlayer.player.nflTeam,
            position: props.nominatedPlayer.player.position,
            oldId: props.nominatedPlayer.player.id,
            bye: props.nominatedPlayer.player.bye,
            price: props.nominatedPlayer.currentPrice
        }
        console.log(soldPlayer)
        await sellPlayer({variables: soldPlayer})
        await props.start(true)
        //{owner: "6103be19710deb0bac329658", playerName: "Buccaneers", nflTeam:"TB", position:"D", oldId:"60e95ec9c92610e6181ad911", price:3, bye:8}
    }
//| props.nominatedPlayer.currentPrice>=managerRestrictions.maxBid
//| props.nominatedPlayer.bidder===props.manager.id
    console.log(props.nominatedPlayer)
    console.log(props.manager)
    return(
        
        <div className={styles.BigScreen}>
            <h2>Vuoro: </h2>
            <AuctionView playerQueue={filteredQueue} nominatedPlayer={props.nominatedPlayer} turn={props.turn}/>

            <h2>Manager tools</h2>
            <button disabled={props.nominatedPlayer===null} onClick={()=>bidPlusOne(props.manager)}>${currentBidPlusOne}</button>
            <form onSubmit={submit}>
                <div>
                    Custom bid <input
                        value={customBid}
                        onChange={ ({target}) => setCustomBid(target.value)}
                    />
                </div>
                <button disabled={props.nominatedPlayer===null } type="submit">bid</button>
            </form>
            
            {props.manager.owner==="Erik" &&
                <div>
                <h2>Commish tool</h2>
                <button disabled={props.nominatedPlayer===null} onClick={()=>finalizeSale()}>Finalize sale</button>
                { props.teams.map(t => <p key={t.id}>{t.owner} <button disabled={props.nominatedPlayer===null} onClick={()=>bidPlusOne(t)}>${currentBidPlusOne}</button></p>) }
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