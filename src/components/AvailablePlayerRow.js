import React from "react"

const AvailablePlayerRow = (props) => {
    //console.log(props)
    

    return (
        <tr>
            <td>{props.player.rank}. </td>
            <td>{props.player.playerName}</td>
            <td>{props.player.position}</td>
            <td>{props.player.nflTeam}</td>
            <td>{props.player.bye}</td>
            <td>${props.player.expectedValue}</td>
            <td><button onClick={()=>props.addPlayer(props.player)}>Add</button></td>
            <td><button onClick={()=>props.nominate(props.player)}>Auction</button></td>



        </tr>
    )
}
export default AvailablePlayerRow;