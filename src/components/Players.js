import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_PLAYERS} from "../graphql/queries";
import styles from "../AppStyles.module.css"
// import ChangePosition from "./ChangePosition";
import FilteredPlayers from "./FilteredPlayers";


//Tavallaan API joten pidetään omana querynä
const Players = (props) => {
    const {data, error, loading} = useQuery(GET_PLAYERS)
    //const {data2, error2, loading2} = useQuery(GET_SOLDPLAYERS)
    const [position, setPosition] = useState("ALL")
    const [filter, setFilter] = useState("")


    if (loading ){
        return <div>loading...</div>
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)
    }
    
    const playerList = data.allPlayers
    // console.log(playerList)
    //console.log(props)
    //console.log(position)
    const availablePlayers = playerList.filter(p => !props.soldPlayers.includes(p.id))
    availablePlayers.sort( (p1, p2) => p1.rank - p2.rank)
    //console.log(filter)
    
    return(
        <div className={styles.SmallScreen}>
            <>
                <button onClick={ ()=>{setPosition("ALL")} }>ALL</button>
                <button onClick={ ()=>{setPosition("QB")} }>QB</button>
                <button onClick={ ()=>{setPosition("RB")} }>RB</button>
                <button onClick={ ()=>{setPosition("WR")} }>WR</button>
                <button onClick={ ()=>{setPosition("TE")} }>TE</button>
            </>
            <p>
                <button onClick={ ()=>{setPosition("K")} }>K</button>
                <button onClick={ ()=>{setPosition("D")} }>D</button>
                <button onClick={ ()=>{setPosition("IDP")} }>IDP</button>
            </p>
            <p>Filter <input onChange={handleFilterChange} /></p>
            <h2>Available players:</h2>
            
            {/* {availablePlayers.map(p => <p key={p.id}>{p.playerName}</p>)} */}
            <table>
                <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Name</th>
                        <th scope="col">Pos</th>
                        <th scope="col">Team</th>
                        <th scope="col">Bye</th>
                        <th scope="col">Avg</th>
                        <th scope="col">Queue</th>
                    </tr>
                </thead>
                <FilteredPlayers availablePlayers={availablePlayers} position={position} filter={filter} addPlayer={props.addPlayer} nominate={props.nominate}/>

            </table>
        </div>
    )
}

export default Players;