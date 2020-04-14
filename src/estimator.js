const normalizeDuration = (periodType, timeToElapse) => {
let days = 0;
switch (periodType) {
    case 'days':
        days = timeToElapse;
        break;
    case 'weeks':
        days = timeToElapse * 7;
        break;
    case 'months':
        days = timeToElapse * 30;  
        break;
    default:
        days = 0;
        break;
}
return days;
};
const getImpact = (data,multiplier) => {
    let impact = {};
    const currentlyInfected = data.reportedCases * multiplier;
    const totalDays = normalizeDuration(data.periodType, data.timeToElapse);
    let factor = Math.trunc(totalDays/3);
    let infectionsByRequestedTime = Math.pow(2,factor);
    impact.infectionsByRequestedTime = infectionsByRequestedTime;
    impact.currentlyInfected = currentlyInfected;
    return impact;
};
const covid19ImpactEstimator = (data) => {
    const impact = getImpact(data,10);
    const severeImpact = getImpact(data,50);
    let resp = {data: data, impact:impact, severeImpact:severeImpact};
    return resp;
};
export default covid19ImpactEstimator;
