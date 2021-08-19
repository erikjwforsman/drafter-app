import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_PLAYERS} from "../graphql/queries";
import styles from "../AppStyles.module.css"
import FilteredPlayers from "./FilteredPlayers";


const Players = (props) => {
    //console.log(props.availablePlayers)
    //return(<div className={styles.SmallScreen}>Players WIP</div>)

    const [position, setPosition] = useState("ALL")
    const [filter, setFilter] = useState("")


    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)
    }
    
    // const playerList = data.allPlayers
    // // console.log(playerList)
    //console.log(props)
    // //console.log(position)
    // const availablePlayers = playerList.filter(p => !props.soldPlayers.includes(p.id))
    // availablePlayers.sort( (p1, p2) => p1.rank - p2.rank)
    // //console.log(filter)
    // props.nominate(availablePlayers[0])
    // //console.log(availablePlayers[0])

    const h = window.innerHeight;
    // console.log(h)

    const divLeft = {
        height: h*0.75,        
        width:"35%",
        overflowY: "scroll",
        backgroundColor: "maroon",
        paddingTop: h*0.20+1,
        paddingBottom: "1%"

    }

    return(
        <div style={divLeft}>
            <div className={styles.scroll}>
            <div className={styles.PaddingLeft}>
            
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
            <p className={styles.GoldText}>Filter <input onChange={handleFilterChange} /></p>
            <h2 className={styles.GoldText}>Available players:</h2>
            </div>
            {/* {availablePlayers.map(p => <p key={p.id}>{p.playerName}</p>)} */}
            <table >
                <thead >
                    <tr>
                        <th className={styles.GoldText} scope="col">Rank</th>
                        <th className={styles.GoldText} scope="col">Name</th>
                        <th className={styles.GoldText} scope="col">Pos</th>
                        <th className={styles.GoldText} scope="col">Team</th>
                        <th className={styles.GoldText} scope="col">Bye</th>
                        <th className={styles.GoldText} scope="col">Avg</th>
                        <th className={styles.GoldText} scope="col">Queue</th>
                    </tr>
                </thead>
                <FilteredPlayers availablePlayers={props.availablePlayers} position={position} filter={filter} addPlayer={props.addPlayer} nominate={props.nominate} validateManagerCanNominate={props.validateManagerCanNominate}/>

            </table>
            </div>
        </div>
    )
}

export default Players;