import React, {useState} from "react";
import SelfInfo from "./SelfInfo";
import Players from "./Players"
import AuctionComponent from "./AuctionComponent"
import Teams from "./Teams";
import {useMutation, useQuery} from "@apollo/client";
import {CHANGE_PROPOSER, CHANGE_BID, GET_ALL, ADD_TEAM, SELL_PLAYER, ADD_PLAYER, NULL_PROPOSER} from "../graphql/queries";
import {nominateButtonDisabled} from "../utils/teamUtils"
import styles from "../AppStyles.module.css"
//import { QueryManager } from "@apollo/client/core/QueryManager";

const SubApp = (props) => {

  //HUOMHUOMHUOM
  //Varmista että backissä on yhtaikainen cross platform validointi fronttien samanaikaisten tarjousten hyväksynnälle!!!!
  //Automaattinominate ei paikalla oleville??? // Jos yleiskoodilla, pitää huomioida paikallinen aikadilemma
  //HUOMHUOMHUOM PÄÄTTYY

    //console.log(props.data)
    const [queue, setQueue] = useState([])
    //console.log(queue)
    const nominatedPlayer = props.data.currentBid
    const turn = props.data.lastProposer === null ? null : props.data.allTeams.find(t => t.place === props.data.lastProposer.proposer)                            //Noudetaan viimeinen myydyn pelaajan ehdottaja +1
    const nominatingTime = props.data.lastProposer !== null ? props.data.lastProposer.timeLeft : 2519211811670
    const manager = props.data.allTeams.find(t => t.owner === props.manager) // Periytyy Appista? 
    const [changeTurn] = useMutation(CHANGE_PROPOSER)//
    const [changeBid] = useMutation(CHANGE_BID)//Muokkaa null-ehto
    const [xfinalizeSaleButton, setxFinalizeSaleButton] = useState(true) //Tarkistaa, voidaanko kauppa finalisoida
    console.log(typeof(nominatingTime))
    const lähetys = (boolean) => {
      //If myydään pelaajaa
      
      if(boolean==="nominate" & manager.owner === turn.owner){
        console.log("Tultiin ei booleanilla")
        if (queue.length>0){
          console.log(queue[0])
          callBackNominate(queue[0])
        } else {
          console.log(availablePlayers[0])
          callBackNominate(availablePlayers[0])
        }
      }
      console.log(boolean)
      console.log("Lähetetty takaisin päin. Nyt laitetaan sisään", boolean)
      setxFinalizeSaleButton(boolean)
      //If ollaan nimeämässä => automaatti nimeäminen
  }

    const start = async(value) =>{
      //value periytyy AuctionComponentin finalizeSalesta ja kiertää startin varmennuksen
      if (value===true){
        changeTurn()
      } else {
        if(window.confirm("Ethän painanut vahingossa?")){
          changeTurn()
        }        
      }         
    }
    
    const validateManagerCanNominate = nominateButtonDisabled(nominatedPlayer, manager, turn)

    //Playersin funkitiot ja propsit
    const addPlayerToQueue = (player) => { 
        setQueue([ ...queue, player])
    }
    const callBackNominate = (player) => {
        // Tähän ainoastaansuora nimeäminen, EI QUERYÄ!!!
        //Suora nimeäminen playerilla if
        const firstBid = {bidder: turn.id, playerId:player.id, price:1} //Varmaan siirretään mutaation sisälle 
        changeBid({ variables: firstBid })
        //Epäsuora nimeäminen pelaajajonosta kun aika loppuu passiivireaktiolla, ei playeria

        //Epäsuora nimeäminen vapaista pelaajista ajan loputtua passiivireaktiolla, ei playeria 
    }
    //Vapaiden pelaajien erottelu
    const mapped = props.data.allSoldPlayers.map(p=>p.oldId)
    const availablePlayers = props.data.allPlayers.filter(p => !mapped.includes(p.id))
    availablePlayers.sort( (p1, p2) => p1.rank - p2.rank)

    const callBackRemove = (removePlayerId) => {  
        const backer = queue.filter(p => p.id !== removePlayerId)
        setQueue(backer)
      }

    return (
        <div className="App">
          <AuctionComponent nominatedPlayer={nominatedPlayer} playerQueue={queue} autoPick={availablePlayers[0]} turn={turn} callBackRemove={callBackRemove} teams={props.data.allTeams} manager={manager} start={start} lähetys={lähetys} nominatingTime={nominatingTime}/>
          <div className={styles.Flexi}>
            <Players availablePlayers={availablePlayers} addPlayer={addPlayerToQueue} nominate={callBackNominate} validateManagerCanNominate={validateManagerCanNominate}/>
            <SelfInfo start={start} nominatedPlayer={nominatedPlayer} turn={turn}           manager={manager} playerQueue={queue} callBackRemove={callBackRemove} xfinalizeSaleButton={xfinalizeSaleButton} teams={props.data.allTeams}/>
            <Teams teams={props.data.allTeams} manager={manager}/>
          </div>
          
        </div>
      );
}

export default SubApp;