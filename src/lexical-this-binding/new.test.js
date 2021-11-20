/**
 *      1. function called with new
 *      2. function with no explicit return
 *      3. function with explicit returned object
 *
 */

import { Employee, User } from './new';

describe('Testing this binding with new keyword', () => {
  it('with implicit return from the constructor function, this object should be returned', () => {
    const user = new User('John', 30);
    expect(user).toBeInstanceOf(Object);
    expect(user.name).toBe('John');
    expect(user.age).toBe(30);
    expect(user.greet).toBeInstanceOf(Function);
    expect(user.greet()).toBe('Hi, John');
  });
  it('with explicit returned object from the constructor function,', () => {
    const employee = new Employee('Smith', 22);
    expect(employee).toBeInstanceOf(Object);
    expect(employee.name).toBe('Smith');
    expect(employee.age).toBe(22);
    expect(employee.greet).toBeUndefined();
    expect(employee.print()).toBe('Smith');
  });
});
