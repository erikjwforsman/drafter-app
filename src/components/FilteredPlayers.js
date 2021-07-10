import React from "react"

const FilteredPlayers = (props) => {

    console.log(props)
    
    if (props.filter.length >1){
        const filteredPlayers = props.availablePlayers.filter(player => player.playerName.toLowerCase().includes(props.filter.toLowerCase()) | player.nflTeam.toLowerCase().includes(props.filter.toLowerCase()))
        console.log(filteredPlayers)

        return (
            <div>
                {filteredPlayers.map(p => <p key={p.id}>{p.rank}. {p.playerName}</p>)}
            </div>
        )
    }

    if (props.position==="ALL"){
        return (
            <div>
                {props.availablePlayers.map(p => <p key={p.id}>{p.rank}. {p.playerName}</p>)}
            </div>
        )
    }

    const retPlayers = props.availablePlayers.filter(p => p.position === props.position)
    console.log(retPlayers)

    return(
        <div>
            {retPlayers.map(p => <p key={p.id}>{p.rank}. {p.playerName}</p>)}
        </div>
    )
}

export default FilteredPlayers