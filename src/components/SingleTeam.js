import React from "react";
import SingleSoldPlayer from "./SingleSoldPlayer";
import {teamInfo} from "../utils/teamUtils"
import styles from "../AppStyles.module.css"

const SingleTeam = (props) => {
    //console.log(props)
    const info = teamInfo(props.team.players.length, props.team.salary)

    if (!props){
        return <div>Testi onnistui</div>
    }

    return (
        <div className={styles.TeamInfoStyle}>
            <h3 className={styles.MiniDown}>Owner: {props.team.owner}</h3>
            <h4 className={styles.MiniUp}>Roster size: {info.maxRosterSize-info.seatsLeft}/19 Money left: {info.moneyLeft} <br></br>
            Avg Price: {info.avgPrice} Max Bid: {info.maxBid}</h4>
            <table>
                <tbody>
                    <tr><td>QB(min 1):</td></tr>
                    {props.team.players.filter(p => p.position==="QB").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
                    <tr><td>RB(min 2):</td></tr>
                    {props.team.players.filter(p => p.position==="RB").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
                    <tr><td>WR(min 2):</td></tr>
                    {props.team.players.filter(p => p.position==="WR").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
                    <tr><td>TE(min 1):</td></tr>
                    {props.team.players.filter(p => p.position==="TE").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
                    <tr><td>K(min 1):</td></tr>
                    {props.team.players.filter(p => p.position==="K").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
                    <tr><td>D(min 1):</td></tr>
                    {props.team.players.filter(p => p.position==="D").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
                    <tr><td>IDP(min 1):</td></tr>
                    {props.team.players.filter(p => p.position==="IDP").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}     
                </tbody>
            </table>       
         </div>
    )
}

export default SingleTeam;

//{props.team.players.map(p => <SingleSoldPlayer />)}