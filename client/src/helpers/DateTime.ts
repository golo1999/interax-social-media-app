export function getDate(dateTime: string | null) {
  if (!dateTime || isNaN(Number(dateTime))) {
    return null;
  }

  const currentDate = new Date();
  const givenDateTime = new Date(Number(dateTime));
  const day =
    givenDateTime.getDate() >= 10
      ? givenDateTime.getDate()
      : `0${givenDateTime.getDate()}`;
  const month = givenDateTime.toLocaleString("default", { month: "long" });
  const year = givenDateTime.getFullYear();

  if (year === currentDate.getFullYear()) {
    return `${month} ${day}`;
  }

  return `${month} ${day}, ${year}`;
}

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

type TimePassedComponent = "CHAT" | "COMMENT" | "NOTIFICATION" | "POST";

export function getTimePassedFromDateTime(
  dateTime: string | null | undefined,
  component: TimePassedComponent
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

    if (component === "NOTIFICATION") {
      return differenceInMinutes > 1
        ? `${differenceInMinutes} minutes ago`
        : "a minute ago";
    }

    return `${differenceInMinutes}m`;
  }
  // Less than a day
  else if (timeDifference < 86400000) {
    const MS_TO_HOURS = 1000 * 60 * 60;
    const differenceInHours = Math.floor(timeDifference / MS_TO_HOURS);

    if (component === "NOTIFICATION") {
      return differenceInHours > 1
        ? `${differenceInHours} hours ago`
        : "an hour ago";
    }

    return `${differenceInHours}h`;
  }
  // Less than a week
  else if (timeDifference < 604800000) {
    const MS_TO_DAYS = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.floor(timeDifference / MS_TO_DAYS);

    if (component === "NOTIFICATION") {
      return differenceInDays > 1
        ? `${differenceInDays} days ago`
        : "a day ago";
    }

    return `${differenceInDays}d`;
  } else if (component === "CHAT" || component === "NOTIFICATION") {
    const oneYearAgoDate = new Date();
    oneYearAgoDate.setFullYear(oneYearAgoDate.getFullYear() - 1);
    const msFromOneYearAgo = Math.abs(
      new Date().getTime() - oneYearAgoDate.getTime()
    );

    // Less than a year
    if (timeDifference < msFromOneYearAgo) {
      const MS_TO_WEEKS = 1000 * 60 * 60 * 24 * 7;
      const differenceInWeeks = Math.floor(timeDifference / MS_TO_WEEKS);

      if (component === "NOTIFICATION") {
        return differenceInWeeks > 1
          ? `${differenceInWeeks} weeks ago`
          : "a week ago";
      }

      return `${differenceInWeeks}w`;
    } else {
      const MS_TO_YEARS = 1000 * 60 * 60 * 24 * 7 * 52;
      const differenceInYears = Math.floor(timeDifference / MS_TO_YEARS);

      if (component === "NOTIFICATION") {
        return differenceInYears > 1
          ? `${differenceInYears} years ago`
          : "a year ago";
      }

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
