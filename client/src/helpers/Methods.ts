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
