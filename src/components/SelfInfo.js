import React from "react";
import styles from "../AppStyles.module.css"
import {rosterInfo, teamInfo} from "../utils/teamUtils"

const SelfInfo = (props) => {
    //const manager = props.manager
    //const manager = props.manager[0]
    // console.log(props.manager.owner)
    //console.log(props)

    const managerInfo = teamInfo(props.manager.players.length, props.manager.salary)
    //console.log(managerInfo)
    const info = rosterInfo(props.manager.players)
    //console.log(info)

    return (
        <div className={styles.Flexi}>
            <button onClick={()=>props.start()}>start</button>
            <h1>Managerin info: {props.manager.owner}</h1>
            <div>
                <p>Money:{managerInfo.moneyLeft}  avg:{managerInfo.avgPrice} max:{managerInfo.maxBid} seats left:{managerInfo.seatsLeft}</p>
                <p>QB: {info.qb} RB: {info.rb} WR: {info.wr} TE: {info.te} K: {info.k} D: {info.d} IDP: {info.idp}</p>
            </div>
        </div>)
}

export default SelfInfo;