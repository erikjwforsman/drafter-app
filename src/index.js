import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
// import {GET_TEAMS, GET_PLAYERS, GET_SOLDPLAYERS} from "./graphql/queries"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000"
  })
})

// const query = gql`
//   query{
//     allTeams{
//       owner
//       players{
//         playerName
//         price
//       }
//     }
//   }
// `

// Poisto tästä 
// const query = GET_SOLDPLAYERS
// client.query({query})
//   .then((response) => {
//     console.log(response.data)
//   })
//Tähän

ReactDOM.render(
  <ApolloProvider client = {client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
