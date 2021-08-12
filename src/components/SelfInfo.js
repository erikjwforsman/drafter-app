import React, {useState} from "react";
import styles from "../AppStyles.module.css"
import {rosterInfo, teamInfo, validateBid, bidButtonDisabled} from "../utils/teamUtils"
import {useMutation} from "@apollo/client"
import {CHANGE_BID, SELL_PLAYER} from "../graphql/queries"

const SelfInfo = (props) => {
    //const manager = props.manager
    //const manager = props.manager[0]
    // console.log(props.manager.owner)
    //console.log(props)
    console.log(props)
    let filteredQueue = props.playerQueue.filter((value, index) => props.playerQueue.indexOf(value) === index)

    const managerInfo = teamInfo(props.manager.players.length, props.manager.salary)
    //console.log(managerInfo)
    const info = rosterInfo(props.manager.players)
    //console.log(info)
    const [sellPlayer] = useMutation(SELL_PLAYER)
    const [bid]=useMutation(CHANGE_BID)
    const currentBidPlusOne = props.nominatedPlayer !== null ? props.nominatedPlayer.currentPrice+1 : 1


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

    const bidPlusOne = async(team) => {
        //Tee oma hookki?
        const newestBid= {bidder:team.id, playerId:props.nominatedPlayer.player.id, currentPrice:Number(currentBidPlusOne) }
        const curManager = props.teams.find(t => t.id === team.id)
        const curManagerRestrictions=teamInfo(curManager.players.length, curManager.salary)
        if(validateBid(props.nominatedPlayer, newestBid, curManagerRestrictions)){            
            bid({ variables: newestBid })
        } else {
            console.log("Virheilmoitus") //Aktivoi virhe-ilmoitus tässä
        }
    }
    

    return(<div className={styles.BigScreen}>
        <h1>Manager: {props.manager.owner}</h1>
        <p>Money:{managerInfo.moneyLeft}  Avg bid:{managerInfo.avgPrice} Max bid:{managerInfo.maxBid} Roster spots left:{managerInfo.seatsLeft}</p>
        <p>QB: {info.qb} RB: {info.rb} WR: {info.wr} TE: {info.te} K: {info.k} D: {info.d} IDP: {info.idp}</p>
        
        {props.manager.owner==="Erik" &&
                <div>
                    <h2>Commish tools</h2>
                    <button disabled={props.xfinalizeSaleButton} onClick={()=>finalizeSale()}>Finalize sale</button>
                    { props.teams.map(t => <p key={t.id}>{t.owner} <button disabled={bidButtonDisabled(props.nominatedPlayer, t)!==true} onClick={()=>bidPlusOne(t)}>${currentBidPlusOne}</button></p>) }
                    {/* { props.teams.map(t => <p key={t.id}>{t.owner} <button>$</button></p>) } */}

                </div>
            }
        <div>
                <h2>Jono</h2>
                {filteredQueue.map(p => <p key={p.id}>{p.playerName} <button onClick={ () => props.callBackRemove(p.id)}>Remove</button></p>)}
            </div>
    </div>)

    if (props.turn === null) {
        return(
            <div className={styles.SelfInfoOrange}>
                <button onClick={()=>props.start()}>start</button>
                <h1>Managerin info: {props.manager.owner}</h1>
                Auction starting soon...
                <div>
                <p>Money:{managerInfo.moneyLeft}  avg:{managerInfo.avgPrice} max:{managerInfo.maxBid} seats left:{managerInfo.seatsLeft}</p>
                <p>QB: {info.qb} RB: {info.rb} WR: {info.wr} TE: {info.te} K: {info.k} D: {info.d} IDP: {info.idp}</p>
            </div>
            </div>
        )
    }


    return (
        <div className={props.manager.id===props.turn.id & props.nominatedPlayer===null ? styles.SelfInfoGreen : props.nominatedPlayer===null ? styles.SelfInfoOrange : props.nominatedPlayer.bidder === props.manager.id ? styles.SelfInfoGreen :  styles.SelfInfoRed}>
            <button onClick={()=>props.start()}>start</button>
            <h1>Managerin info: {props.manager.owner}</h1>
            <div>
                {props.manager.id===props.turn.id & props.nominatedPlayer===null ? <h1>"You're on the clock"</h1>:null}
                <p>Money:{managerInfo.moneyLeft}  avg:{managerInfo.avgPrice} max:{managerInfo.maxBid} seats left:{managerInfo.seatsLeft}</p>
                <p>QB: {info.qb} RB: {info.rb} WR: {info.wr} TE: {info.te} K: {info.k} D: {info.d} IDP: {info.idp}</p>
            </div>
        </div>)
}

export default SelfInfo;