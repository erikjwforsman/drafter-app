import {useQuery} from "@apollo/client"
import {GET_SOLDPLAYERS} from "../graphql/queries"

const useSoldPlayers = () => {
    const { data, error, loading } = useQuery(GET_SOLDPLAYERS, {
        fetchPolicy: "cache-and-network"
    })

    return { soldPlayers: data ? data.soldPlayers : error, loading}
}

export default useSoldPlayers