/* eslint-disable @babel/new-cap */
/**
 *
 *  Inheritance through factory functions using Object.create()
 *
 *  . check __proto__ of parent object
 *  . check __proto__ of child object
 *  . verify __proto__ linkage between parent and child object
 *  . verify that a parent object is able to call parent method with own data
 *  . verify that a child object is able to call overloaded parent method with own data
 *  . verify parent object do not have access to child object method or properties
 */

import { PaidUser, paidUserStore, User, userStore } from './factory';

describe('Testing inheritance through factory functions', () => {
  const user = User('John', 20);
  const paidUser = PaidUser('Smith', 30, 100);
  test('parent object __proto__ should point to the object containing parent methods', () => {
    expect(user.__proto__ === userStore).toBeTruthy();
  });
  test('child object __proto__ should point to the object containing child methods', () => {
    expect(paidUser.__proto__ === paidUserStore).toBeTruthy();
  });
  test('child store __proto__ is linked to parent store', () => {
    expect(paidUserStore.__proto__ === userStore).toBeTruthy();
  });
  test('parent object is able to call parent method with own data', () => {
    expect(user.getScore()).toBe('Current score for user John: 20');
  });
  test('child object is able to call overloaded parent method with own data', () => {
    expect(paidUser.getScore()).toBe('Current score for paid user Smith: 30');
  });
  test('parent object does not have access to child properties', () => {
    expect(user.accBalance).toBeUndefined();
  });
  test('parent object does not have access to child methods', () => {
    try {
      user.increaseBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});
