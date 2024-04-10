import { UserError, UserWithMessage } from "models";

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

export function instanceOfUserError(object: any): object is UserError {
  if (!object) {
    return false;
  }

  return "message" in object && !("user" in object);
}

export function instanceOfUserWithMessage(
  object: any
): object is UserWithMessage {
  if (!object) {
    return false;
  }

  return "message" in object && "user" in object;
}

export function passwordValidation(password: string) {
  if (!password || password.length < 8) return false;

  let digitCount = 0;
  let letterCount = 0;
  let symbolCount = 0;

  Array.from(password).forEach((character) => {
    if (character.charCodeAt(0) >= 48 && character.charCodeAt(0) <= 57) {
      ++digitCount;
    } else if (
      (character.charCodeAt(0) >= 65 && character.charCodeAt(0) <= 90) ||
      (character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122)
    ) {
      ++letterCount;
    } else if (
      (character.charCodeAt(0) >= 32 && character.charCodeAt(0) <= 47) ||
      (character.charCodeAt(0) >= 58 && character.charCodeAt(0) <= 64) ||
      (character.charCodeAt(0) >= 91 && character.charCodeAt(0) <= 96) ||
      (character.charCodeAt(0) >= 123 && character.charCodeAt(0) <= 126)
    ) {
      ++symbolCount;
    }
  });

  if (digitCount === 0 || letterCount === 0 || symbolCount === 0) return false;
  return true;
}
