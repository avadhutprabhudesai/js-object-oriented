/* eslint-disable @babel/no-invalid-this */
export function getName() {
  return this.name;
}
export const obj1 = {
  name: 'John',
  getName: getName,
};

export const outerObj = {
  name: 'outer',
  getName: getName,
  innerObj: {
    name: 'inner',
    getName: getName,
  },
};

export function printName(fn) {
  return fn();
}

export function asyncPrintName(fn) {
  setTimeout(() => {
    fn();
  }, 100);
}
