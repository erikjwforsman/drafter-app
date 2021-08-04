import React from "react";

const SingleSoldPlayer = (props) => {
    //console.log(props.player)
    return(
        <div>
            <p>{props.player.playerName}, {props.player.nflTeam}, bye {props.player.bye}, price: {props.player.price}</p>
        </div>
    )
}

export default SingleSoldPlayer;