export function getTimeFromDate(date: string): string {
  const currentDate = new Date();
  const givenDate = new Date(date);
  const timeDifference = Math.abs(currentDate.getTime() - givenDate.getTime());

  // Less than a minute
  if (timeDifference < 60000) {
    return "Now";
  }
  // Less than an hour
  else if (timeDifference < 3600000) {
    const MS_TO_MIN = 1000 * 60;
    const differenceInMinutes = Math.floor(timeDifference / MS_TO_MIN);
    return `${differenceInMinutes}m`;
  }
  // Less than a day
  else if (timeDifference < 86400000) {
    const MS_TO_HOURS = 1000 * 60 * 60;
    const differenceInHours = Math.floor(timeDifference / MS_TO_HOURS);
    return `${differenceInHours}h`;
  }
  // Less than a week
  else if (timeDifference < 604800000) {
    const MS_TO_DAYS = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.floor(timeDifference / MS_TO_DAYS);
    return `${differenceInDays}d`;
  }

  const minute =
    givenDate.getMinutes() >= 10
      ? givenDate.getMinutes()
      : `0${givenDate.getMinutes()}`;
  const hour =
    givenDate.getHours() >= 10
      ? givenDate.getHours()
      : `0${givenDate.getHours()}`;
  const day =
    givenDate.getDate() >= 10 ? givenDate.getDate() : `0${givenDate.getDate()}`;
  const month = givenDate.toLocaleString("default", { month: "long" });
  const year = givenDate.getFullYear();

  if (year === currentDate.getFullYear()) {
    return `${month} ${day} at ${hour}:${minute}`;
  }

  return `${month} ${day}, ${year} at ${hour}:${minute}`;
}
