import React from "react"
import AvailablePlayerRow from "./AvailablePlayerRow"

const FilteredPlayers = (props) => {

    //console.log(props)
    
    if (props.filter.length >2){
        const filteredPlayers = props.availablePlayers.filter(player => player.playerName.toLowerCase().includes(props.filter.toLowerCase()))
        console.log(filteredPlayers)

        return (
            <tbody>
                {filteredPlayers.map(p => <AvailablePlayerRow key={p.id} player={p} addPlayer={props.addPlayer}/>)}
            </tbody>
        )
    }

    if (props.position==="ALL"){
        return (
            <tbody>
                {props.availablePlayers.map(p => <AvailablePlayerRow key={p.id} player={p} addPlayer={props.addPlayer}/>)}
            </tbody>
        )
    }

    const retPlayers = props.availablePlayers.filter(p => p.position === props.position)
    console.log(retPlayers)

    return(
        <tbody>
            {retPlayers.map(p => <AvailablePlayerRow key={p.id} player={p} addPlayer={props.addPlayer}/>)}
        </tbody>
    )
}

export default FilteredPlayers