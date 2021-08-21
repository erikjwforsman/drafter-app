// import React from "react";
// import {useQuery} from "@apollo/client"
// import {GET_TEAMS} from "../graphql/queries";
// import SingleTeam from "./SingleTeam"


// const ChangeTeam = () => {
//     const {data, error, loading} = useQuery(GET_TEAMS)

//     if (loading){
//         return(<div>loading...</div>)
//     }

//     console.log(data.allTeams[0].id)


//     return (
//     <div>
//         {data.allTeams.map(t => <button>{t.owner}</button>)}
//         <SingleTeam team={data[0]} key={data.allTeams[0].id} />
//     </div>
//     )
// }

// export default ChangeTeam;