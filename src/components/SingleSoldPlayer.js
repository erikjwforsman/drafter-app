import React from "react";
import styles from "../AppStyles.module.css"

const SingleSoldPlayer = (props) => {
    //console.log(props.player)
    return(
        <tr>
            <td className={styles.Player}>{props.player.playerName}{props.player.injury !== null ? props.player.injury : null}, {props.player.nflTeam}, bye {props.player.bye}, price: {props.player.price}</td>
        </tr>
    )
}

export default SingleSoldPlayer;