import React from "react";

const SingleSoldPlayer = (props) => {
    //console.log(props.player)
    return(
        <tr>
            <td>* {props.player.playerName}, {props.player.nflTeam}, bye {props.player.bye}, price: {props.player.price}</td>
        </tr>
    )
}

export default SingleSoldPlayer;