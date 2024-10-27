function isMeetingWithinWorkingHours(startTime, endTime, meetingStartTime, meetingDuration) {
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const workStart = timeToMinutes(startTime);
  const workEnd = timeToMinutes(endTime);
  const meetingStart = timeToMinutes(meetingStartTime);
  const meetingEnd = meetingStart + meetingDuration;

  return meetingStart >= workStart && meetingEnd <= workEnd;
}

console.log(isMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90));
