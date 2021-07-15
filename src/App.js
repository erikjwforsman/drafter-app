//import useTeams from "./hooks/useTeams"
import {useState} from "react"
import {useQuery} from "@apollo/client";
import {GET_SOLDPLAYERS} from "./graphql/queries";

import Players from "./components/Players"
import AuctionComponent from "./components/AuctionComponent"
import Teams from "./components/Teams";

import styles from "./AppStyles.module.css"
import SelfInfo from "./components/SelfInfo";

const App = () => {
  const {data, error, loading} = useQuery(GET_SOLDPLAYERS)
  const [queue, setQueue] = useState([])
  const [turn, setTurn] = useState()

  if (loading ){
    return <div>loading...</div>
  }
  console.log(data)
  const soldPlayers = data.allSoldPlayers
  const oldIds=soldPlayers.map(p=>p.oldId)
  //console.log(oldIds)
  //console.log(soldPlayers)

  const addPlayerToQueue = (p) => {
    const player = p
    //console.log(player)
    setQueue([ ...queue, player])
  }

  const callBackRemove = (removePlayerId) => {
    //console.log("Päällä", r)
    const backer = queue.filter(p => p.id !== removePlayerId)
    //console.log(backer)
    setQueue(backer)
  }

  //console.log(queue)
  //console.log("rivi 29")
  //alive()

  return (
    <div className="App">
      <SelfInfo />
      <div className={styles.Flexi}>
        <Players soldPlayers={oldIds} addPlayer={addPlayerToQueue}/>
        <AuctionComponent soldPlayers={soldPlayers} playerQueue={queue} callBackRemove={callBackRemove}/>
        <Teams teams={data.allTeams}/>
      </div>
      
    </div>
  );
}

export default App;
//        <Players soldPlayers={oldIds} addPlayer={queue => setQueue([ ...queue, {queue} ]) }/>
