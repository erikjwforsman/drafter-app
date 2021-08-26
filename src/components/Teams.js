import React, {useState} from "react";
import SingleTeam from "./SingleTeam";
import styles from "../AppStyles.module.css";

const Teams = (props) => {
    const [team, setTeam] = useState(props.manager)
    
    const h = window.innerHeight;
    const divRight = {
        height: h*0.75,        
        width:"30%",
        overflowY: "scroll",
        backgroundColor: "maroon",
        paddingTop: h*0.20+1,
        paddingBottom: "1%"
    }

    const mobileDivRight = {
        height: h*0.75,        
        width:"100%",
        overflowY: "scroll",
        backgroundColor: "maroon",
        paddingTop: 1,
        paddingBottom: "1%"
    }

    return (
        <div style={props.mobile===true ? mobileDivRight : divRight}>
            {props.teams.slice(0, 4).map(t => <button className={styles.Button25} key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)} <br></br>
            {props.teams.slice(4, 8).map(t => <button className={styles.Button25} key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}<br></br>
            {props.teams.slice(8, 12).map(t => <button className={styles.Button25} key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}<br></br>
            {props.teams.slice(12, ).map(t => <button className={styles.Button25} key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}
            <SingleTeam team={team} key={team.id} /> 
        </div>
    )
}

export default Teams;