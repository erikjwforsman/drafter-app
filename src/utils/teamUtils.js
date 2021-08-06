export const teamInfo = (teamSize, teamSalary) =>{
    const moneyAtStart = 200
    const moneyLeft = moneyAtStart-teamSalary
    const maxRosterSize= 19
    const seatsLeft = maxRosterSize-teamSize

    const avgPrice = moneyLeft/seatsLeft
    const maxBid = moneyLeft-(seatsLeft-1)

    return {moneyAtStart:moneyAtStart, moneyLeft:moneyLeft, maxRosterSize:maxRosterSize, avgPrice:Math.trunc(avgPrice), maxBid:maxBid, seatsLeft:seatsLeft} 
}

export const rosterInfo = (team) => {
    //console.log(team.length)
    const qb = team.filter(p => p.position ==="QB")
    const rb = team.filter(p => p.position ==="RB")
    const wr = team.filter(p => p.position ==="WR")
    const te = team.filter(p => p.position ==="TE")
    const d = team.filter(p => p.position ==="D")
    const k = team.filter(p => p.position ==="K")
    const idp = team.filter(p => p.position ==="IDP")

    return { qb: qb.length, rb: rb.length, wr: wr.length, te: te.length, k: k.length, d: d.length, idp: idp.length}
}

export const validateBid = (currentBid, newBid, managerRestrictions) => {
    console.log("maxBid",managerRestrictions.maxBid)
    console.log("current price",currentBid)
    console.log("new bid",newBid)
    if(isNaN(Number(newBid.currentPrice))){
        alert("Olet aasi, et hakkeri")
        return false
    }
    //Lisää että uusi tarjoaja on sama kuin vanha tarjoaja
    if(currentBid.bidder===newBid.bidder){
        alert("Sinulla on jo johtava tarjous")
        return false
    }

    if (currentBid.currentPrice >= newBid.currentPrice){
        //Tähän alert/custom-viesti
        alert("Liian pieni tarjous") 
        //console.log("Tarjoat liian vähän")
        return false
    } else if (managerRestrictions.seatsLeft===0){
        alert("Joukkueesi on jo täynnä")
        //console.log("Sinulla ei ole tilaa joukkueessasi")
        return false
    } else if (managerRestrictions.maxBid<newBid.currentPrice){
        alert("VITUN KÖYHÄ")
        //console.log("Sinulla ei ole tarpeeksi varoja")
        return false
    } else {
        //console.log("Valmis")
        return true
    }  
}

export const bidButtonDisabled = (nominatedPlayer, manager) => {
    const seatsLeft=19-manager.players.length
    const moneyLeft = 200-manager.salary 
    const manMaxBid=moneyLeft-seatsLeft+1

    if (manager.players.length>=19){
        // console.log("Joukkue täynnä")
        return false
    }

    if (nominatedPlayer===null){
        // console.log("Player Null")   
        return false
    }
    if(nominatedPlayer.currentPrice>=manMaxBid){
        // console.log("Out of money")
        return false
    }
    if(nominatedPlayer.bidder===manager.id){
        // console.log("Already highest bid")
        return false
    }
    return true
} 

export const nominateButtonDisabled = (nominatedPlayer, manager, turn) => {
    // Aktivoi lopuksi
    // if(manager.id!==turn.id){
    //     return false
    // }
    if (nominatedPlayer===null | nominatedPlayer===undefined){
        return true
    }
    
    //Tähän vielä vuorokohtainen nomineittaus
    return manager.id===turn.id
}

export const playerNextInLine = (playerList, nextPlayer) => {
    if (playerList===null | playerList.length===0){
        return nextPlayer
    }

    return playerList[0]
}