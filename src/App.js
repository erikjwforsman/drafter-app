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
  const {data, error, loading} = useQuery(GET_SOLDPLAYERS) //Uusi versio sisältää jo kootut joukkueet
  const [queue, setQueue] = useState([])
  const [turn, setTurn] = useState(null) //Noudetaan viimeinen myydyn pelaajan ehdottaja +1
  const [manager, setManager] = useState(null) //Noudetaan combinaatiolla sisäänkirjautuja & joukkueet

  if (loading ){
    return <div>loading...</div>
  }

  const start = () =>{
    //Alustava rakennelma, lopullinen tulee useQueryn viimeisen tarjouksen og ehdottajasta
    const lastToNominate = "60e596cbef2cab7f604fc1eb"
    let index = data.allTeams.findIndex(team => team.id === lastToNominate)
    console.log(index)
    console.log(data.allTeams.length)
    if (index+1===data.allTeams.length){
      index+=1
    }
    //console.log(data.allTeams[index+1])

    setTurn(data.allTeams[index])
  }
  
  console.log(turn)
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

  const nominate = () => {
    if (turn===null){ //Joku parempi ratkaisu
      console.log("ASSSSSS")
    } else if (turn.id === "60e596cfef2cab7f604fc1ec"){  //Testivaiheen id
      console.log("On vuorosi")
    } else {
      console.log("Ei ole vuorosi")
    }
  }

  //console.log(queue)
  //console.log("rivi 29")
  //alive()

  return (
    <div className="App">
      <SelfInfo />
      <button onClick={()=>start()}>start</button>
      <div className={styles.Flexi}>
        <Players soldPlayers={oldIds} addPlayer={addPlayerToQueue} nominate={nominate}/>
        <AuctionComponent soldPlayers={soldPlayers} playerQueue={queue} callBackRemove={callBackRemove}/>
        <Teams teams={data.allTeams}/>
      </div>
      
    </div>
  );
}

export default App;
//        <Players soldPlayers={oldIds} addPlayer={queue => setQueue([ ...queue, {queue} ]) }/>
