import React, {useState} from "react";
import SingleTeam from "./SingleTeam";
import styles from "../AppStyles.module.css";

const Teams = (props) => {
    const [team, setTeam] = useState(props.manager) //Tähän voi laittaa kirjautumisen id:n myöhemmin jos haluaa

    //const buttons1 = {props.teams.slice(0, 4).map(t => <button key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}

    //Tsekkaa järkevämpi kuin nykyinen null-ratkaisu
    //Esim. ota suoraan managerista?
    //Tuleeko nullia edes enää???
    if (team===null){
        return (
            <div className={styles.SmallScreen}>
                {/* {props.teams.map(t => <button key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)} */}
                {props.teams.slice(0, 4).map(t => <button key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}
                {/* <h2>Teams:</h2>
                {data.allTeams.map(t => <SingleTeam team={t} key={t.id} />)} */} 
                <SingleTeam team={props.teams[0]} /> 

            </div>
        )
    }

    return (
        <div className={styles.SmallScreen}>
            {/* {props.teams.map(t => <button key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)} */}
            {props.teams.slice(0, 4).map(t => <button className={styles.Button25} key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)} <br></br>
            {props.teams.slice(4, 8).map(t => <button className={styles.Button25} key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}<br></br>
            {props.teams.slice(8, 12).map(t => <button className={styles.Button25} key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}<br></br>
            {props.teams.slice(12, ).map(t => <button className={styles.Button25} key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}


            {/* <h2>Teams:</h2>
            {data.allTeams.map(t => <SingleTeam team={t} key={t.id} />)} */}
            <SingleTeam team={team} key={team.id} /> 
        </div>
    )
}

export default Teams;