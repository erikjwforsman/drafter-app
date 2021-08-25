import React from "react"
import styles from "../AppStyles.module.css"

const AvailablePlayerRow = (props) => {
    

    return (
        <tr className={styles.TablePlayers}>
            <td className={styles.TablePlayers_td}>{props.player.rank}. </td>
            <td className={styles.TablePlayers_td}>{props.player.playerName} {props.player.injury !== null ? props.player.injury : null}</td>
            <td className={styles.TablePlayers_td}>{props.player.position}</td>
            <td className={styles.TablePlayers_td}>{props.player.nflTeam}</td>
            <td className={styles.TablePlayers_td}>{props.player.bye}</td>
            <td className={styles.TablePlayers_td}>${props.player.expectedValue}</td>
            <td><button onClick={()=>props.addPlayer(props.player)}>Add</button></td>
            <td><button disabled={props.validateManagerCanNominate!==true} onClick={()=>props.nominate(props.player)}>Nominate</button></td>
        </tr>
    )
}
export default AvailablePlayerRow;