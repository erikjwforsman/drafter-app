import React, {useState} from "react";
import AuctionComponent from "./AuctionComponent"
import Players from "./Players"
import Teams from "./Teams"
import SelfInfo from "./SelfInfo"

const MobileView = (props) => {
    const [view, setView] = useState("players")

    const changeView = (view) => {
        setView(view)
    }
    console.log(props)

    const h = window.innerHeight;
    const container ={
      width: "100%",
      height: h,
      position: "relative",
      backgroundColor: "maroon"
    }

    const mobileTop ={
      height: h*0.2,        
      width:"100%",
      overflowY: "scroll",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 999
    }

    const mobileButtons ={
        width:"100%",
        overflowY: "scroll",
        position: "fixed",
        marginTop:h*0.18,
        zIndex: 950,
        backgroundColor:"goldenRod",
        paddingTop:"1%"
    }
    const selectionButton = {
        width:"33%",
        padding: "none",
        margin: "none",
        height:h*0.05,
        backgroundColor:"maroon",
        border: "goldenRod 2px solid",
        color:"gold",
        textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
    }
    const pushedButton ={
        width:"33%",
        padding: "none",
        margin: "none",
        height:h*0.05,
        backgroundColor:"goldenRod",
        border: "maroon 2px solid",
        color:"black",
    }
    const mobileBottom ={
      height: h*0.75,        
      width:"100%",
      overflowY: "scroll",
      position: "absolute",
      marginTop:h*0.25,
      // top: 0,
      // left: 0,

  //     width: 100%;
  // height: 500px;
  // overflow-y: scroll;
    }
    
    

    return (
      <div style={container}>
        <div style={mobileTop}>
          <AuctionComponent logOut={props.logOut} nominatedPlayer={props.nominatedPlayer} playerQueue={props.playerQueue} autoPick={props.availablePlayers[0]} turn={props.turn} callBackRemove={props.callBackRemove} teams={props.teams} manager={props.manager} start={props.start} lähetys={props.lähetys} />
        </div>
        <div style={mobileButtons}>
            <button style={view !== "players" ? selectionButton : pushedButton} onClick={()=>changeView("players")}>Players</button>
            <button style={view !== "queue" ? selectionButton : pushedButton} onClick={()=>changeView("queue")}>Queue</button>
            <button style={view !== "teams" ? selectionButton : pushedButton} onClick={()=>changeView("teams")}>Teams</button>
          </div>
        <div style={mobileBottom}>
            {
                view==="players" ? <Players mobile={true} availablePlayers={props.availablePlayers} addPlayer={props.addPlayer} nominate={props.nominate} validateManagerCanNominate={props.validateManagerCanNominate}   /> : 
                view==="queue" ? <SelfInfo mobile={true} start={props.start} nominatedPlayer={props.nominatedPlayer} turn={props.turn} player={props.availablePlayers[0]} nominate={props.nominate} manager={props.manager} playerQueue={props.playerQueue} callBackRemove={props.callBackRemove} xfinalizeSaleButton={props.xfinalizeSaleButton} teams={props.teams} /> :
                <Teams teams={props.teams} manager={props.manager} mobile={true}/>
            }
        </div>      
      </div>
    );
}

export default MobileView;