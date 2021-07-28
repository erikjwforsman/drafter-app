import React, {useState} from "react";
import SelfInfo from "./SelfInfo";
import Players from "./Players"
import AuctionComponent from "./AuctionComponent"
import Teams from "./Teams";

import styles from "../AppStyles.module.css"

const SubApp = (props) => {

    console.log(props.data)
    const [queue, setQueue] = useState([])
    const [playerToNominate, setPlayerToNominate] = useState(null)
    const [turn, setTurn] = useState(null)                            //Noudetaan viimeinen myydyn pelaajan ehdottaja +1

    const WIPmanager = props.data.allTeams.find(t => t.owner === props.manager) // Periytyy Appista? 

    const start = () =>{      //SubAppiin?
        //Alustava rakennelma, lopullinen tulee useQueryn viimeisen tarjouksen og ehdottajasta
        // const lastToNominate = "60e596cbef2cab7f604fc1eb"
        // let index = data.allTeams.findIndex(team => team.id === lastToNominate)
        // console.log(index)
        // console.log(data.allTeams.length)
        // if (index+1===data.allTeams.length){
        // index+=1
        // }

        // setTurn(data.allTeams[index])
        console.log(turn)
        // if(props.data.allSoldPlayers.length===0 | turn==="Kape"){
        //     setTurn(props.data.allTeams[0].owner)
        // } else if()
        // console.log(turn)
    }

    //#######################################
    //#######################################
    //Playersin funkitiot ja propsit
    const addPlayerToQueue = (player) => { 
        //const player = p
        setQueue([ ...queue, player])
    }
    const callBackNominate = (player) => {
        // if (turn===null){ //Joku parempi ratkaisu
        //   console.log("ASSSSSS")
        // } else if (turn.id === "60e596cfef2cab7f604fc1ec"){  //Testivaiheen id
        //   console.log("On vuorosi")
        // } else {
        //   console.log("Ei ole vuorosi")
        // }
        //if lause joka varmistaa, että voi ehdottaa ainoastaan vuorollaan
        console.log("callBAckNominate WIP")
        setPlayerToNominate(player)
        //console.log(playerToNominate)
    }
    //Vapaiden pelaajien erottelu
    const mapped = props.data.allSoldPlayers.map(p=>p.oldId)
    const availablePlayers = props.data.allPlayers.filter(p => !mapped.includes(p.id))
    availablePlayers.sort( (p1, p2) => p1.rank - p2.rank)
    //#######################################
    //#######################################

    const callBackRemove = (removePlayerId) => {  
        const backer = queue.filter(p => p.id !== removePlayerId)
        setQueue(backer)
      }

    return (
        <div className="App">
          <SelfInfo manager={WIPmanager} start={start}/>
          <div className={styles.Flexi}>
            <Players availablePlayers={availablePlayers} addPlayer={addPlayerToQueue} nominate={callBackNominate}/>
            <AuctionComponent playerQueue={queue} callBackRemove={callBackRemove} playerToNominate={playerToNominate} />
            <Teams teams={props.data.allTeams} manager={WIPmanager}/>
          </div>
          
        </div>
      );
}

export default SubApp;