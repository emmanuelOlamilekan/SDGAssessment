const normalizeDuration = (periodType, timeToElapse) => {
  let days = 0;
  if (periodType === 'days') {
    days = timeToElapse;
  }
  if (periodType === 'months') {
    days = timeToElapse * 30;
  }
  if (periodType === 'weeks') {
    days = timeToElapse * 7;
  }
  return days;
};

const getAvailableBeds = (totalHospitalBeds, severeCasesByRequestedTime) => {
  const availableHospitalBed = totalHospitalBeds * (35 / 100);
  const hospitalBedsByRequestedTime = availableHospitalBed - severeCasesByRequestedTime;
  return hospitalBedsByRequestedTime;
};

const getImpact = (data, multiplier) => {
  const currentlyInfected = data.reportedCases * multiplier;
  const totalDays = normalizeDuration(data.periodType, data.timeToElapse);
  const factor = Math.trunc(totalDays / 3);
  const infectionsByRequestedTime = Math.trunc(currentlyInfected * (2 ** factor));
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * (15 / 100));
  const hospitalBedsByRequestedTime = Math.trunc(getAvailableBeds(data.totalHospitalBeds,
    severeCasesByRequestedTime));
  const impact = {
    data,
    infectionsByRequestedTime,
    currentlyInfected,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
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
