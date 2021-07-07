import {useQuery} from "@apollo/client"
import {GET_PLAYERS} from "../graphql/queries"

const usePlayers = () => {
    const {data, error, loading} = useQuery(GET_PLAYERS,{
        fetchPolicy: "cache-and-network"
    })

    return { players: data ? data.players : error, loading }
}

export default usePlayers