import React, {useState, useEffect} from "react";
import SelfInfo from "./SelfInfo";
import Players from "./Players"
import AuctionComponent from "./AuctionComponent"
import Teams from "./Teams";
import {useMutation, useQuery} from "@apollo/client";
import {CHANGE_PROPOSER, CHANGE_BID, GET_ALL, ADD_TEAM, SELL_PLAYER, ADD_PLAYER, NULL_PROPOSER} from "../graphql/queries";
import {nominateButtonDisabled} from "../utils/teamUtils"
import styles from "../AppStyles.module.css"

const SubApp = (props) => {

  //console.log(props.data)
  const [queue, setQueue] = useState([])
  const nominatedPlayer = props.data.currentBid
  const turn = props.data.lastProposer === null ? null : props.data.allTeams.find(t => t.place === props.data.lastProposer.proposer)                            //Noudetaan viimeinen myydyn pelaajan ehdottaja +1
  const manager = props.data.allTeams.find(t => t.owner === props.manager) 
  const [changeTurn] = useMutation(CHANGE_PROPOSER)//
  const [changeBid] = useMutation(CHANGE_BID)//Muokkaa null-ehto
  const [xfinalizeSaleButton, setxFinalizeSaleButton] = useState(true) //Tarkistaa, voidaanko kauppa finalisoida
  // const [mobileView, setMobileView] = useState(false)
 
  const lähetys = (boolean) => {
    setxFinalizeSaleButton(boolean)
  }

  // const changeView = () => {
  //   if(mobileView){
  //     setMobileView(false)
  //   } else{
  //     setMobileView(true)
  //   }
  // }

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
    console.log(firstBid)
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
    
  // if(mobileView){
  //   const container ={
  //     width: "100%",
  //     height: h,
  //     position: "relative",
  //   }

  //   const mobileTop ={
  //     height: h*0.2,        
  //     width:"100%",
  //     overflowY: "scroll",
  //     position: "fixed",
  //     top: 0,
  //     left: 0,
  //     zIndex: 999
  //   }

  //   const mobileBottom ={
  //     height: h,        
  //     width:"100%",
  //     overflowY: "scroll",
  //     position: "absolute",
  //     marginTop:h*0.2
  //     // top: 0,
  //     // left: 0,

  // //     width: 100%;
  // // height: 500px;
  // // overflow-y: scroll;
  //   }

  //   return (
  //     <div style={container}>
  //       <div style={mobileTop}>
  //         <div>
  //         <AuctionComponent changeView={changeView} logOut={props.logOut} nominatedPlayer={nominatedPlayer} playerQueue={queue} autoPick={availablePlayers[0]} turn={turn} callBackRemove={callBackRemove} teams={props.data.allTeams} manager={manager} start={start} lähetys={lähetys} />
  //         <div>
  //           <button>Yksi</button>
  //         </div>
  //         </div>
  //       </div>
  //       <div style={mobileBottom}>
  //         <div>
  //           <div>
  //             <h1>Eka rivi</h1> 
   
  //           </div>
  //         </div>
            
  //       </div>      
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <div style={divTop}>
        <AuctionComponent logOut={props.logOut} nominatedPlayer={nominatedPlayer} playerQueue={queue} autoPick={availablePlayers[0]} turn={turn} callBackRemove={callBackRemove} teams={props.data.allTeams} manager={manager} start={start} lähetys={lähetys} />
      </div>
      <div className={styles.FlexiContent}>
        <Players availablePlayers={availablePlayers} addPlayer={addPlayerToQueue} nominate={callBackNominate} validateManagerCanNominate={validateManagerCanNominate}/>
        <SelfInfo start={start} nominatedPlayer={nominatedPlayer} turn={turn}          player={availablePlayers[0]} nominate={callBackNominate} manager={manager} playerQueue={queue} callBackRemove={callBackRemove} xfinalizeSaleButton={xfinalizeSaleButton} teams={props.data.allTeams}/>
        <Teams teams={props.data.allTeams} manager={manager}/>
      </div>          
    </div>
  );
}

export default SubApp;