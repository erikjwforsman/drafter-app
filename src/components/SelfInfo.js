import React from "react";
import styles from "../AppStyles.module.css"
import {rosterInfo, teamInfo} from "../utils/teamUtils"

const SelfInfo = (props) => {
    //const manager = props.manager
    //const manager = props.manager[0]
    // console.log(props.manager.owner)
    //console.log(props)
    console.log(props)
    const managerInfo = teamInfo(props.manager.players.length, props.manager.salary)
    //console.log(managerInfo)
    const info = rosterInfo(props.manager.players)
    //console.log(info)
    const chosen = "styles.SelfInfoOrange"
    const lahto ="styles.Flexi"

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