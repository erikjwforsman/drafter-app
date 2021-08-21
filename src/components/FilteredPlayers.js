import React from "react"
import AvailablePlayerRow from "./AvailablePlayerRow"

const FilteredPlayers = (props) => {
    if (props.filter.length >2){
        const filteredPlayers = props.availablePlayers.filter(player => player.playerName.toLowerCase().includes(props.filter.toLowerCase()))
        return (
            <tbody>
                {filteredPlayers.map(p => <AvailablePlayerRow key={p.id} player={p} addPlayer={props.addPlayer} nominate={props.nominate} validateManagerCanNominate={props.validateManagerCanNominate} />)}
            </tbody>
        )
    }

    if (props.position==="ALL"){
        return (
            <tbody>
                {props.availablePlayers.map(p => <AvailablePlayerRow key={p.id} player={p} addPlayer={props.addPlayer} nominate={props.nominate} validateManagerCanNominate={props.validateManagerCanNominate} />)}
            </tbody>
        )
    }

    const retPlayers = props.availablePlayers.filter(p => p.position === props.position)

    return(
        <tbody>
            {retPlayers.map(p => <AvailablePlayerRow key={p.id} player={p} addPlayer={props.addPlayer} nominate={props.nominate} validateManagerCanNominate={props.validateManagerCanNominate} />)}
        </tbody>
    )
}

export default FilteredPlayers