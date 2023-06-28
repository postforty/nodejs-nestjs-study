interface ICheckLength {
  length: number;
}

// function echoWithLength<T extends ICheckLength>(message: T) {
function echoWithLength<T>(message: T) {
  console.log(message);
}

echoWithLength<string>("Hello");
echoWithLength<number[]>([1, 2, 3]);
echoWithLength<ICheckLength>({ length: 10 });
echoWithLength(10);
