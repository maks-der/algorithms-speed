function funcExecutionTime(func) {
  const startTime = process.hrtime();
  func();
  const endTime = process.hrtime(startTime);

  return (endTime[0] * 1000) + (endTime[1] / 1e6);
}

module.exports = {funcExecutionTime};