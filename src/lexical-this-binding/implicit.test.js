/**
 *      . Implicit binding
 *              1. single level context object
 *              2. multi level context object
 *      . Implcitly lost
 *              1. assignment
 *              2. passed as a callback function
 *
 */

import { asyncPrintName, obj1, outerObj, printName } from './implicit';

describe('Testing implicit binding', () => {
  test('implicit this binding with single level context object', () => {
    expect(obj1.getName()).toEqual('John');
  });
  test('implicit this binding with multi level context object', () => {
    expect(outerObj.innerObj.getName()).toEqual('inner');
  });
});

describe('Testing implicitly lost this binding', () => {
  test('this binding lost when assigned to different variable', () => {
    const outerGetName = outerObj.getName; // outerGetName === getName
    try {
      //calling this function throws an error.
      // this is lost(undefined) now in outerGetName as there is no context object
      // hence there is no this.name when outerGetName() is executed.
      outerGetName();
    } catch (error) {
      expect(error instanceof TypeError).toBeTruthy();
    }
  });
  test('this binding lost when a function is passed in as a callback to another function', () => {
    try {
      // when obj1.getName is passed into printName, it loses its implicit binding.
      // hence, when calling fn fromwithin printName, this is set to undefined.
      printName(obj1.getName);
    } catch (error) {
      expect(error instanceof TypeError).toBeTruthy();
    }
  });
  test('this binding lost when a function is passed in as a callback to setTimeout', () => {
    try {
      // when obj1.getName is passed into asyncPrintName, it loses its implicit binding.
      // hence, when calling fn fromwithin asyncPrintName, this is set to undefined.
      asyncPrintName(obj1.getName);
    } catch (error) {
      expect(error instanceof TypeError).toBeTruthy();
    }
  });
});
