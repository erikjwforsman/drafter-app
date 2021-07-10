//import useTeams from "./hooks/useTeams"
import {useQuery} from "@apollo/client";
import {GET_SOLDPLAYERS} from "./graphql/queries";

import Players from "./components/Players"
import SoldPlayers from "./components/SoldPlayers"
import Teams from "./components/Teams";

import styles from "./AppStyles.module.css"
import SelfInfo from "./components/SelfInfo";

const App = () => {
  const {data, error, loading} = useQuery(GET_SOLDPLAYERS)

  if (loading ){
    return <div>loading...</div>
  }
  const soldPlayers = data.allSoldPlayers
  const oldIds=soldPlayers.map(p=>p.oldId)
  //console.log(oldIds)
  //console.log(soldPlayers)



  return (
    <div className="App">
      <SelfInfo />
      <div className={styles.Flexi}>
        <Players soldPlayers={oldIds} className={styles.SmallScreen}/>
        <SoldPlayers soldPlayers={soldPlayers} />
        <Teams />
      </div>
      
    </div>
  );
}

export default App;
