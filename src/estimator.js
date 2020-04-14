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
const getImpact = (data, multiplier) => {
  const currentlyInfected = data.reportedCases * multiplier;
  const totalDays = normalizeDuration(data.periodType, data.timeToElapse);
  const factor = Math.trunc(totalDays / 3);
  const infectionsByRequestedTime = 2 ** factor;
  const impact = {
    data,
    infectionsByRequestedTime,
    currentlyInfected
  };
  return impact;
};
const covid19ImpactEstimator = (data) => {
  const impact = getImpact(data, 10);
  const severeImpact = getImpact(data, 50);
  const resp = { data, impact, severeImpact };
  return resp;
};
export default covid19ImpactEstimator;
