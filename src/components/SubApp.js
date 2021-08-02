import React, {useState} from "react";
import SelfInfo from "./SelfInfo";
import Players from "./Players"
import AuctionComponent from "./AuctionComponent"
import Teams from "./Teams";
import {useMutation, useQuery} from "@apollo/client";
import {CHANGE_PROPOSER, CHANGE_BID, GET_ALL, ADD_TEAM, SELL_PLAYER, ADD_PLAYER} from "../graphql/queries";

import styles from "../AppStyles.module.css"
//import { QueryManager } from "@apollo/client/core/QueryManager";

const SubApp = (props) => {

    console.log(props.data)
    const [queue, setQueue] = useState([])
    const nominatedPlayer = props.data.currentBid

    const turn = props.data.allTeams.find(t => t.place === props.data.lastProposer.proposer)                            //Noudetaan viimeinen myydyn pelaajan ehdottaja +1
    const manager = props.data.allTeams.find(t => t.owner === props.manager) // Periytyy Appista? 
    const [changeTurn] = useMutation(CHANGE_PROPOSER)//
    const [changeBid] = useMutation(CHANGE_BID)//Muokkaa null-ehto
    console.log(props)
    console.log(turn)
    
    const start = async() =>{     
        changeTurn() 
    }

    //#######################################
    //#######################################
    //Playersin funkitiot ja propsit
    const addPlayerToQueue = (player) => { 
        setQueue([ ...queue, player])
    }
    const callBackNominate = (player) => {
        // Tähän ainoastaansuora nimeäminen, EI QUERYÄ!!!
        const firstBid = {bidder: turn.id, playerId:player.id, price:1}
        changeBid({ variables: firstBid })
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
          <SelfInfo manager={manager} start={start}/>
          <div className={styles.Flexi}>
            <Players availablePlayers={availablePlayers} addPlayer={addPlayerToQueue} nominate={callBackNominate}/>
            <AuctionComponent nominatedPlayer={nominatedPlayer} playerQueue={queue} autoPick={availablePlayers[0]} turn={turn} callBackRemove={callBackRemove} />
            <Teams teams={props.data.allTeams} manager={manager}/>
          </div>
          
        </div>
      );
}

// const [changeBid] = useMutation(CHANGE_BID)
//     const [sellPlayer] = useMutation(SELL_PLAYER) //OK!!!
//     const [addPlayer] = useMutation(ADD_PLAYER) //OK!!!
    //const playerToSell = {owner: "6103be19710deb0bac329658", playerName: "Buccaneers", nflTeam:"TB", position:"D", oldId:"60e95ec9c92610e6181ad911", price:3, bye:8}
    // console.log(playerToSell)
    //const newPlayer = {playerName:"Josh Allen", nflTeam:"JAX", rank:287, expectedValue:1, position:"IDP", bye:7}
    // console.log(newPlayer)
        //changeBid({ variables: newBid })
        //joukkueen lisäys kovakoodilla
        //eriNimi({ variables: {owner:"Simon", place:11} })
        //sellPlayer( { variables:  playerToSell } )
        //addPlayer({ variables: newPlayer })
    //const newBid = {playerId:"6103f7c9cf16687025c8cffa", bidder: "6103bcdb710deb0bac329655", currentPrice:10}

    //Mutaatiovammailua
    //const [eriNimi]=useMutation(ADD_TEAM)//, {  //OK!!!
    //   refetchQueries: GET_ALL
    // })

export default SubApp;