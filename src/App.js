//import useTeams from "./hooks/useTeams"
import {useState} from "react"
import {useQuery} from "@apollo/client";
import {GET_SOLDPLAYERS} from "./graphql/queries";

import Players from "./components/Players"
import Auction from "./components/Auction"
import Teams from "./components/Teams";

import styles from "./AppStyles.module.css"
import SelfInfo from "./components/SelfInfo";

const App = () => {
  const {data, error, loading} = useQuery(GET_SOLDPLAYERS)
  const [queue, setQueue] = useState([])

  if (loading ){
    return <div>loading...</div>
  }
  const soldPlayers = data.allSoldPlayers
  const oldIds=soldPlayers.map(p=>p.oldId)
  //console.log(oldIds)
  //console.log(soldPlayers)

  const addPlayerToQueue = (jotain) => {
    const player = jotain
    console.log(player)
    setQueue([ ...queue, player])
  }

  console.log(queue)
  //console.log("rivi 29")
  //alive()

  return (
    <div className="App">
      <SelfInfo />
      <div className={styles.Flexi}>
        <Players soldPlayers={oldIds} addPlayer={addPlayerToQueue}/>
        <Auction soldPlayers={soldPlayers} playerQueue={queue}/>
        <Teams />
      </div>
      
    </div>
  );
}

export default App;
//        <Players soldPlayers={oldIds} addPlayer={queue => setQueue([ ...queue, {queue} ]) }/>
