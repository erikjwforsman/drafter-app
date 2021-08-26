import React, {useState} from "react";
import SelfInfo from "./SelfInfo";
import Players from "./Players"
import AuctionComponent from "./AuctionComponent"
import Teams from "./Teams";
import {useMutation} from "@apollo/client";
import {CHANGE_PROPOSER, CHANGE_BID} from "../graphql/queries";
import {nominateButtonDisabled} from "../utils/teamUtils"
import styles from "../AppStyles.module.css"
import MobileView from "./MobileView"

const SubApp = (props) => {

  //console.log(props.data)
  const [queue, setQueue] = useState([])
  const nominatedPlayer = props.data.currentBid
  const turn = props.data.lastProposer === null ? null : props.data.allTeams.find(t => t.place === props.data.lastProposer.proposer)                            //Noudetaan viimeinen myydyn pelaajan ehdottaja +1
  const manager = props.data.allTeams.find(t => t.owner === props.manager) 
  const [changeTurn] = useMutation(CHANGE_PROPOSER)
  const [changeBid] = useMutation(CHANGE_BID)
  const [xfinalizeSaleButton, setxFinalizeSaleButton] = useState(true) //Tarkistaa, voidaanko kauppa finalisoida
 
  const lähetys = (boolean) => {
    setxFinalizeSaleButton(boolean)
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
    const firstBid = {bidder: turn.id, playerId:player.id, price:1}
    changeBid({ variables: firstBid }) 
  }
  //Vapaiden pelaajien erottelu
  const mapped = props.data.allSoldPlayers.map(p=>p.oldId)
  const availablePlayers = props.data.allPlayers.filter(p => !mapped.includes(p.id))
  availablePlayers.sort( (p1, p2) => p1.rank - p2.rank)

  const callBackRemove = (removePlayerId) => {  
    const backer = queue.filter(p => p.id !== removePlayerId)
    setQueue(backer)
  }

  const h = window.innerHeight;
  const divTop = {
      height: h*0.2,        
      width:"100%",
      overflowY: "scroll",
      position:"fixed"
  }
    
  //Poistaa jo myydyt pelaajat pelaajajonosta
  queue.forEach(p => mapped.includes(p.id) ? callBackRemove(p.id) : console.log(""))

  //Mobiilinäkymä joka on aktivoitu sisäänkirjautuessa
  if(props.mobileView){
    return(<MobileView 
      logOut={props.logOut} nominatedPlayer={nominatedPlayer} playerQueue={queue} autoPick={availablePlayers[0]} 
      turn={turn} callBackRemove={callBackRemove} teams={props.data.allTeams} manager={manager} start={start} lähetys={lähetys} 
      availablePlayers={availablePlayers} addPlayer={addPlayerToQueue} nominate={callBackNominate} validateManagerCanNominate={validateManagerCanNominate} 
      player={availablePlayers[0]} xfinalizeSaleButton={xfinalizeSaleButton}
    />)
  }

  //Norminäkymä
  return (
    <div className="App">
      <div style={divTop}>
        <AuctionComponent logOut={props.logOut} nominatedPlayer={nominatedPlayer} playerQueue={queue} autoPick={availablePlayers[0]} turn={turn} callBackRemove={callBackRemove} teams={props.data.allTeams} manager={manager} start={start} lähetys={lähetys} />
      </div>
      <div className={styles.FlexiContent}>
        <Players availablePlayers={availablePlayers} addPlayer={addPlayerToQueue} nominate={callBackNominate} validateManagerCanNominate={validateManagerCanNominate}/>
        <SelfInfo start={start} nominatedPlayer={nominatedPlayer} turn={turn} player={availablePlayers[0]} nominate={callBackNominate} manager={manager} playerQueue={queue} callBackRemove={callBackRemove} xfinalizeSaleButton={xfinalizeSaleButton} teams={props.data.allTeams}/>
        <Teams teams={props.data.allTeams} manager={manager}/>
      </div>          
    </div>
  );
}

export default SubApp;