import {gql} from "@apollo/client"

export const GET_TEAMS = gql`
    query{
        allTeams{
            owner
            id
            players{
                playerName
                nflTeam
                position
                price
            }
        }
    }
`

export const GET_PLAYERS = gql`
    query{
        allPlayers{
            playerName
            nflTeam
            rank
            expectedValue
            position
            bye
            id
        }
    }
`

export const GET_SOLDPLAYERS = gql`
    query{
        allSoldPlayers{
            playerName
            nflTeam
            position
            price
        }
    }
`