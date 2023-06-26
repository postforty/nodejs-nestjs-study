function print(value: any): void {
  console.log(value);
}

function throwError(message: string): never {
  throw new Error(message);
}

console.log(throwError("hi"));

function infiniteLoop(): never {
  let add = 1;
  while (true) {
    console.log(add);
    add++;
  }
}

// console.log(infiniteLoop());
