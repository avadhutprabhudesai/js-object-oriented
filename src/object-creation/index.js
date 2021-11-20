/* eslint-disable @babel/no-invalid-this */

export const user = {
  name: 'John',
  getName: () => {
    return this.name;
  },
};

export const store = {
  getName: () => {
    return this.name;
  },
};

export function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.getName = function () {
  return this.name;
};

export class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
}
