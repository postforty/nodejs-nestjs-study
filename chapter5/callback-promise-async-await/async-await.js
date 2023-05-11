async function myName() {
  return "Andy";
}

// console.log(myName());
// const result = myName();
// result.then(console.log);
// console.log(result);

async function showName() {
  const name1 = myName();
  const name2 = await myName();
  console.log(name1);
  console.log(name2);
}

// console.log(showName());
showName();
