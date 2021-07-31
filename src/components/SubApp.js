import React, {useState} from "react";
import SelfInfo from "./SelfInfo";
import Players from "./Players"
import AuctionComponent from "./AuctionComponent"
import Teams from "./Teams";
import {useMutation, useQuery} from "@apollo/client";
import {CHANGE_PROPOSER, CHANGE_BID, GET_ALL, ADD_TEAM, SELL_PLAYER, ADD_PLAYER} from "../graphql/queries";

import styles from "../AppStyles.module.css"

const SubApp = (props) => {

    console.log(props.data)
    const [queue, setQueue] = useState([])
    const [playerToNominate, setPlayerToNominate] = useState(null)
    const turn = props.data.lastProposer.proposer                            //Noudetaan viimeinen myydyn pelaajan ehdottaja +1
    
    //
    //Mutaatiovammailua
    //const [eriNimi]=useMutation(ADD_TEAM)//, {  //OK!!!
    //   refetchQueries: GET_ALL
    // })
    const [changeBid] = useMutation(CHANGE_BID)
    //const [changeTurn] = useMutation(CHANGE_PROPOSER)//OK!!!
    //const [sellPlayer] = useMutation(SELL_PLAYER) //OK!!!
    //const [addPlayer] = useMutation(ADD_PLAYER) //OK!!!
    //console.log(turn)
    const WIPmanager = props.data.allTeams.find(t => t.owner === props.manager) // Periytyy Appista? 
    // console.log(props.data.currentBid)

    //const playerToSell = {owner: "6103be19710deb0bac329658", playerName: "Buccaneers", nflTeam:"TB", position:"D", oldId:"60e95ec9c92610e6181ad911", price:3, bye:8}
    // console.log(playerToSell)
    //const newPlayer = {playerName:"Josh Allen", nflTeam:"JAX", rank:287, expectedValue:1, position:"IDP", bye:7}
    // console.log(newPlayer)
    const newBid = {playerId:"6103f7c9cf16687025c8cffa", bidder: "6103bcdb710deb0bac329655", currentPrice:10}
    //console.log(newBid)
    const start = async() =>{      
        changeBid({ variables: newBid })
        //joukkueen lisäys kovakoodilla
        //eriNimi({ variables: {owner:"Simon", place:11} })
        //changeTurn() 
        //sellPlayer( { variables:  playerToSell } )
        //addPlayer({ variables: newPlayer })
        console.log("Vielä elossa")
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