/**
 *  Object creation
 *      1. Using literals
 *      2. Using Object.create
 *      3. Using constructor functions with new
 *      4. Using classes with new
 *
 *
 *  Things to check for
 *      1. __proto__ for new object
 *
 */

import { Employee, store, User, user } from '.';

describe('Testing object creation using literals', () => {
  it('should have properties on itself ', () => {
    expect(Object.prototype.hasOwnProperty.call(user, 'name')).toBeTruthy();
  });
  it('should have methods on itself ', () => {
    expect(Object.prototype.hasOwnProperty.call(user, 'getName')).toBeTruthy();
  });
  it('should have __proto__ pointed to Object.prototype ', () => {
    expect(user.__proto__ === Object.prototype).toBeTruthy();
  });
});

describe('Testing object creation using Object.create', () => {
  const user = Object.create(store);
  user.name = 'John';
  it('should have properties on itself ', () => {
    expect(Object.prototype.hasOwnProperty.call(user, 'name')).toBeTruthy();
  });
  it('should have methods on object pointed by __proto__ ', () => {
    expect(
      Object.prototype.hasOwnProperty.call(user.__proto__, 'getName')
    ).toBeTruthy();
  });
  it('should have __proto__ pointed to the same object passed in to Object.create() ', () => {
    expect(user.__proto__ === store).toBeTruthy();
  });
});

describe('Testing object creation using constructor function', () => {
  const user = new User('John', 30);
  it('should have properties on itself ', () => {
    expect(Object.prototype.hasOwnProperty.call(user, 'name')).toBeTruthy();
  });
  it('should have methods on object pointed by __proto__ ', () => {
    expect(
      Object.prototype.hasOwnProperty.call(user.__proto__, 'getName')
    ).toBeTruthy();
  });
  it('should have __proto__ pointed to the prototype object of constructor function ', () => {
    expect(user.__proto__ === User.prototype).toBeTruthy();
  });
});

describe('Testing object creation using class', () => {
  const emp = new Employee('John', 30);
  it('should have properties on itself ', () => {
    expect(Object.prototype.hasOwnProperty.call(emp, 'name')).toBeTruthy();
  });
  it('should have methods on object pointed by __proto__ ', () => {
    expect(
      Object.prototype.hasOwnProperty.call(emp.__proto__, 'getName')
    ).toBeTruthy();
  });
  it('should have __proto__ pointed to the prototype object of constructor function ', () => {
    expect(emp.__proto__ === Employee.prototype).toBeTruthy();
  });
});
