import {useQuery} from "@apollo/client"
import {GET_TEAMS} from "../graphql/queries"

const useTeams = () => {
    const {data, error, loading} = useQuery(GET_TEAMS, {
        fetchPolicy: "cache-and-network",
    })

    return { teams: data ? data.teams : error, loading}
}

export default useTeams