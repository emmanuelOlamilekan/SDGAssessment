const covid19ImpactEstimator = (data) =>{ 
    data;
    let currentlyInfected = data.reportedCases
}


const getImpact = (data,multiplier)=>{
    let impact = {};
    let currentlyInfected = data.reportedCases * multiplier;
    let totalDays = normalizeDuration(data.periodType,data.timeToElapse);
    let factor = Math.trunc(totalDays/3);
    let infectionsByRequestedTime =  Math.pow(2,factor);
    impact.infectionsByRequestedTime = infectionsByRequestedTime
    impact.currentlyInfected = currentlyInfected;
}

const normalizeDuration = (periodType, timeToElapse)=>{
    
    let days = 0;

    switch (periodType) {
        case 'days':
            days = timeToElapse;
        case 'weeks':
            days = timeToElapse * 7
        case 'months':
            days = timeToElapse *30;   

    return days;

    }
}



export default covid19ImpactEstimator;
