export function getDisplayedTime(dateTime: Date) {
  const currentDate = new Date();
  const givenDateTime = new Date(Number(dateTime));
  const timeDifference = Math.abs(
    currentDate.getTime() - givenDateTime.getTime()
  );
  const hour =
    dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours();
  const minute =
    dateTime.getMinutes() < 10
      ? `0${dateTime.getMinutes()}`
      : dateTime.getMinutes();

  // Today
  if (givenDateTime.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
    return `${hour}:${minute}`;
  }
  // Less than a week
  else if (timeDifference < 604800000) {
    const dayName = dateTime.toLocaleString("en-us", {
      weekday: "short",
    });
    return `${dayName} ${hour}:${minute}`;
  } else {
    const monthName = dateTime.toLocaleString("en-us", { month: "short" });
    return `${monthName} ${dateTime.getDate()} ${dateTime.getFullYear()}, ${hour}:${minute}`;
  }
}

export function getTimePassedFromDateTime(
  dateTime: string | null,
  component: "CHAT" | "COMMENT" | "POST"
) {
  if (!dateTime || isNaN(Number(dateTime))) {
    return null;
  }

  const currentDate = new Date();
  const givenDateTime = new Date(Number(dateTime));
  const timeDifference = Math.abs(
    currentDate.getTime() - givenDateTime.getTime()
  );

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
  } else if (component === "CHAT") {
    const oneYearAgoDate = new Date();
    oneYearAgoDate.setFullYear(oneYearAgoDate.getFullYear() - 1);
    const msFromOneYearAgo = Math.abs(
      new Date().getTime() - oneYearAgoDate.getTime()
    );

    // Less than a year
    if (timeDifference < msFromOneYearAgo) {
      const MS_TO_WEEKS = 1000 * 60 * 60 * 24 * 7;
      const differenceInWeeks = Math.floor(timeDifference / MS_TO_WEEKS);
      return `${differenceInWeeks}w`;
    } else {
      const MS_TO_YEARS = 1000 * 60 * 60 * 24 * 7 * 52;
      const differenceInYears = Math.floor(timeDifference / MS_TO_YEARS);
      return `${differenceInYears}y`;
    }
  }

  const minute =
    givenDateTime.getMinutes() >= 10
      ? givenDateTime.getMinutes()
      : `0${givenDateTime.getMinutes()}`;
  const hour =
    givenDateTime.getHours() >= 10
      ? givenDateTime.getHours()
      : `0${givenDateTime.getHours()}`;
  const day =
    givenDateTime.getDate() >= 10
      ? givenDateTime.getDate()
      : `0${givenDateTime.getDate()}`;
  const month = givenDateTime.toLocaleString("default", { month: "long" });
  const year = givenDateTime.getFullYear();

  if (year === currentDate.getFullYear()) {
    return `${month} ${day} at ${hour}:${minute}`;
  }

  return `${month} ${day}, ${year} at ${hour}:${minute}`;
}
