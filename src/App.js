import React, {useState} from "react"
import {useQuery} from "@apollo/client";
import {GET_ALL} from "./graphql/queries";
import SubApp from "./components/SubApp";

const App = () => {
  const {data, error, loading} = useQuery(GET_ALL)//, {
   //   pollInterval: 1000
   //})
  console.log(data)
  const [manager, setManager] = useState("Erik")

  if (loading ){
    return <div>loading...</div>
  }  
  if (error){
    console.log(error)
  }

  //console.log(data)
  // return(<div>WIP</div>)
  return(<SubApp data={data} manager={manager}/>)
}

export default App;
