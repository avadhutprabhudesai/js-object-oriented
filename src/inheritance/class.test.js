/* eslint-disable @babel/new-cap */
/**
 *
 *  Inheritance through constructor functions using new
 *
 *  . check __proto__ of parent object
 *  . check __proto__ of child object
 *  . verify prototype linkage between parent and child constructor
 *  . verify that a parent object is able to call parent method with own data
 *  . verify that a child object is able to call overloaded parent method with own data
 *  . verify parent object do not have access to child object method or properties
 */

import { PaidUser, User } from './class';

describe('Testing inheritance through constructor functions', () => {
  const user = new User('John', 20);
  const paidUser = new PaidUser('Smith', 30, 100);
  test('__proto__ of parent object should point to prototype object of Parent constructor function', () => {
    expect(user.__proto__ === User.prototype).toBeTruthy();
  });
  test('__proto__ of child object should point to prototype object of Child constructor function', () => {
    expect(paidUser.__proto__ === PaidUser.prototype).toBeTruthy();
  });
  test('__proto__ of Child.prototype should point to Parent.prototype', () => {
    expect(PaidUser.prototype.__proto__ === User.prototype).toBeTruthy();
  });
  test('parent object can call parent method with own data', () => {
    expect(user.login()).toBe('John logged in');
  });
  test('parent object cannot call child method', () => {
    try {
      user.increaseBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  test('parent object cannot access child properties', () => {
    expect(user.accBalance).toBeUndefined();
  });
  test('child object can call parent method with own data', () => {
    expect(paidUser.getScore()).toBe('Current score for paid user Smith: 30');
  });
  test('child object can call child method with own data', () => {
    expect(paidUser.increaseBalance()).toBe(101);
  });
});
