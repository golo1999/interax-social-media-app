export function getFormattedDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return hours === 0
    ? `${formattedMinutes}:${formattedSeconds}`
    : `${hours}:${formattedMinutes}:${formattedSeconds}`;
}
