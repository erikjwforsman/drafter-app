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