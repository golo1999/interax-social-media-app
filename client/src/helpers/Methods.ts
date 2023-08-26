export function emailValidation(email: string) {
  const expression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

  return expression.test(String(email).trim().toLowerCase());
}

export function getNumbersBetween(first: number, second: number) {
  let numbers: string[] = [];

  if (first < second) {
    for (let counter = first; counter <= second; ++counter) {
      numbers.push(counter.toString());
    }
  } else if (first === second) {
    return [first.toString()];
  } else {
    for (let counter = second; counter >= first; --counter) {
      numbers.push(counter.toString());
    }
  }

  return numbers;
}
