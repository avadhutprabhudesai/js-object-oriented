/* eslint-disable @babel/no-invalid-this */
var name = 'John';

export const foo = () => {
  return this.name;
};

export const fooStrict = () => {
  'use strict';
  return this.name;
};

export const user = {
  printThis: () => {
    return this;
  },
};

export const printThis = () => {
  return this;
};

export function emphasize() {
  const upper = () => {
    return this.name.toUpperCase();
  };
  return upper();
}

export function Employee(name, age) {
  const getName = () => {
    return this.name;
  };

  this.name = name;
  this.age = age;
  this.getName = getName;
}
