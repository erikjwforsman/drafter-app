import React from "react";
import SingleSoldPlayer from "./SingleSoldPlayer";

const SingleTeam = (props) => {
     console.log(props)
    // console.log(props.team.players)

    if (!props){
        console.log("Toimii")
    }

    if (!props){
        return <div>Testi onnistui</div>
    }

    return (
        <div>
            <h3><strong>{props.team.owner}</strong></h3>
            <h3>Roster size: {props.team.players.length}/19</h3>
            <h3>Rahaa jäljellä ja avg hinta</h3>
            <h3>QB:</h3>
            {props.team.players.filter(p => p.position==="QB").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
            <h3>RB:</h3>
            {props.team.players.filter(p => p.position==="RB").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
            <h3>WR:</h3>
            {props.team.players.filter(p => p.position==="WR").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
            <h3>TE:</h3>
            {props.team.players.filter(p => p.position==="TE").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
            <h3>K:</h3>
            {props.team.players.filter(p => p.position==="K").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
            <h3>D:</h3>
            {props.team.players.filter(p => p.position==="D").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
            <h3>IDP:</h3>
            {props.team.players.filter(p => p.position==="IDP").map(p => <SingleSoldPlayer player={p} key={p.id}/>)}
        </div>
    )
}

export default SingleTeam;

//{props.team.players.map(p => <SingleSoldPlayer />)}