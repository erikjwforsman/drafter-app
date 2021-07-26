import React, {useState} from "react";
// import {useQuery} from "@apollo/client";
// import {GET_TEAMS} from "../graphql/queries";
import SingleTeam from "./SingleTeam";
import styles from "../AppStyles.module.css";

//import ChangeTeam from "./ChangeTeam";


const Teams = (props) => {
    //const {data, error, loading} = useQuery(GET_TEAMS)
    const [team, setTeam] = useState(null) //Tähän voi laittaa kirjautumisen id:n myöhemmin jos haluaa

    // if(loading){
    //     return(
    //         <div>loading</div>
    //     )
    // }    

    //console.log(props.teams)
    
    //console.log(data.allTeams)
    if (team===null){
        return (
            <div className={styles.SmallScreen}>
                {props.teams.map(t => <button key={t.owner.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}
                {/* <h2>Teams:</h2>
                {data.allTeams.map(t => <SingleTeam team={t} key={t.id} />)} */} 
                <SingleTeam team={props.teams[0]} /> 

            </div>
        )
    }

    //console.log(data.allTeams[0])
    //console.log(team)

    return (
        <div className={styles.SmallScreen}>
            {props.teams.map(t => <button key={t.owner.id} onClick={ ()=>{setTeam(t)} }>{t.owner} {t.players.length}/19</button>)}
            {/* <h2>Teams:</h2>
            {data.allTeams.map(t => <SingleTeam team={t} key={t.id} />)} */}
            <SingleTeam team={team} key={team.id} /> 
        </div>
    )
}

export default Teams;