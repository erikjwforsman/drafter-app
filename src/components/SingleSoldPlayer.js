import React from "react";

const SingleSoldPlayer = (props) => {
    //console.log(props.player)
    return(
        <div>
            <p>{props.player.playerName} {props.player.nflTeam}</p>
            <p>price: {props.player.price}, bye {props.player.bye}</p>
        </div>
    )
}

export default SingleSoldPlayer;