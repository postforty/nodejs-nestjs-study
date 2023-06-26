const myTuple: [string, number] = ["postforty", 177];

function printMyInfo(label: string, info: [string, number]): void {
  console.log(`[${label}]`, ...info);
}

printMyInfo("튜플 테스트", myTuple);

const fetchUser = (): [string, number] => {
  return ["postforty", 177];
};
// function fetchUser(): [string, number] {
//   return ["postforty", 177];
// }

const [name24, height24] = fetchUser();
console.log(name24, height24);
