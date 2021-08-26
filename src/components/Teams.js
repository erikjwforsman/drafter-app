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

    //Tsekkaa järkevämpi kuin nykyinen null-ratkaisu
    //Esim. ota suoraan managerista?
    //Tuleeko nullia edes enää???
    //Poistetaan ihan lopuksi
    // if (team===null){
    //     return (
    //         <div style={divRight}>
    //             {props.teams.slice(0, 4).map(t => <button key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)} 
    //             <SingleTeam team={props.teams[0]} /> 
    //         </div>
    //     )
    // }

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