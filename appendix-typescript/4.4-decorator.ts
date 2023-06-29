type Constructor = new (...args: any[]) => {};
function HelloDecorator(constructor: Constructor) {
  return class extends constructor {
    constructor() {
      console.log(`HELLO!`);
      super();
    }
  };
}

@HelloDecorator
class DecoratorTest {
  constructor() {
    console.log(`인스턴스 생성됨`);
  }
}

const decoTest = new DecoratorTest();
