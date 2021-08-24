import {gql} from "@apollo/client"

export const LOGIN = gql`
    mutation login($owner: String, $password: String) {
        login(owner: $owner, password:$password) {
            value
        }
    }
`

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
                bye
                id
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
            injury
            id
        }
    }
`

export const GET_ALL = gql`
    query{
        allPlayers{
            playerName
            nflTeam
            rank
            expectedValue
            position
            bye
            injury
            id
        }
        allSoldPlayers{
            playerName
            nflTeam
            position
            price
            id
            oldId
        }
        allTeams{
            owner
            id
            place
            salary
            players{
                playerName
                nflTeam
                position
                price
                bye
                id
            }
        }
        lastProposer{
            proposer
        }
        currentBid{
            bidder
            currentPrice
            timeLeft
            player{
                playerName
                nflTeam
                rank
                expectedValue
                position
                bye
                id
            }
        }

    }
`
export const ADD_TEAM = gql`
    mutation addTeam($owner:String!, $place: Int){
        addTeam(owner:$owner, place:$place){
            owner
        }
    }
`

// export const CHANGE_PROPOSER = gql`
//     mutation changeProposer($current:Int){
//         changeProposer(current:$current){
//             current
//         }
//     }
// `
export const CHANGE_PROPOSER = gql`
    mutation changeProposer{
        changeProposer{
            proposer
        }
    }
`

export const NULL_PROPOSER = gql`
    mutation nullProposer{
        nullProposer{
            true
        }
    }
`

//bidder tarkoitaa bidderin id:tä
export const CHANGE_BID = gql`
    mutation changeBid($bidder: String!, $playerId: String!, $currentPrice:Int, $timeLeft:String){
        changeBid(bidder:$bidder, playerId:$playerId, currentPrice:$currentPrice, timeLeft: $timeLeft){
            currentPrice
        }
    }
`

export const SELL_PLAYER = gql`
    mutation sellPlayer($owner:String!, $playerName:String!, $nflTeam:String!, $position:String!, $price:Int!, $oldId:String!, $bye:Int!){
        addSoldPlayer(owner: $owner, playerName: $playerName, nflTeam:$nflTeam, position:$position, price:$price, oldId:$oldId, bye:$bye){
            playerName
        }
    }
`

export const ADD_PLAYER = gql`
    mutation addPlayer($playerName: String!, $nflTeam: String!, $rank: Int!, $expectedValue: Int!, $position: String!, $bye: Int!){
        addPlayer(playerName:$playerName, nflTeam:$nflTeam, rank:$rank, expectedValue:$expectedValue, position:$position, bye:$bye){
            playerName
        }
    }
`
