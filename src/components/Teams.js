import React, {useState} from "react";
import SingleTeam from "./SingleTeam";
import styles from "../AppStyles.module.css";

const Teams = (props) => {
    const [team, setTeam] = useState(props.manager) //Tähän voi laittaa kirjautumisen id:n myöhemmin jos haluaa

    if (team===null){
        return (
            <div className={styles.SmallScreen}>
                {props.teams.map(t => <button key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}
                {/* <h2>Teams:</h2>
                {data.allTeams.map(t => <SingleTeam team={t} key={t.id} />)} */} 
                <SingleTeam team={props.teams[0]} /> 

            </div>
        )
    }

    return (
        <div className={styles.SmallScreen}>
            {props.teams.map(t => <button key={t.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}
            {/* <h2>Teams:</h2>
            {data.allTeams.map(t => <SingleTeam team={t} key={t.id} />)} */}
            <SingleTeam team={team} key={team.id} /> 
        </div>
    )
}

export default Teams;