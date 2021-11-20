/* eslint-disable @babel/new-cap */
/**
 * Prototypes
 *      1. Function-Object nature of functions
 *      2. prototype property of Function
 *      3. prototype property of Object
 *      4. prototype property of custom functions
 *      5. constructor property on prototypes
 */

describe('Testing Function-Object nature of functions', () => {
  function foo() {}
  test('a function is an instance of Object', () => {
    expect(foo).toBeInstanceOf(Object);
  });
  test('properties can be added onto function-object', () => {
    foo.count = 5;
    expect(foo.count).toBe(5);
  });
  test('function-object has __proto__ pointing to Function.prototype', () => {
    expect(foo.__proto__ === Function.prototype).toBeTruthy();
  });
});

describe('Testing prototype property of Function', () => {
  test('the object face of Function should have prototype property on it and that property should be an object', () => {
    expect(
      Object.prototype.hasOwnProperty.call(Function, 'prototype')
    ).toBeTruthy();
    expect(Function.prototype).toBeInstanceOf(Object);
  });
  test('prototype object of Function should contain methods like call, apply and bind', () => {
    expect(
      Object.prototype.hasOwnProperty.call(Function.prototype, 'call')
    ).toBeTruthy();
    expect(
      Object.prototype.hasOwnProperty.call(Function.prototype, 'apply')
    ).toBeTruthy();
    expect(
      Object.prototype.hasOwnProperty.call(Function.prototype, 'bind')
    ).toBeTruthy();
  });
  test('prototype object of Function should have __proto__ pointing to Object.prototype', () => {
    expect(Function.prototype.__proto__ === Object.prototype).toBeTruthy();
  });
});

describe('Testing prototype property of Object', () => {
  test('the object face of Object should have a prototype property on it and it should be an Object', () => {
    expect(
      Object.prototype.hasOwnProperty.call(Object, 'prototype')
    ).toBeTruthy();
    expect(typeof Object.prototype === 'object').toBeTruthy();
  });
  test('the Object.prototype should have methods like hasOwnProperty', () => {
    expect(
      Object.prototype.hasOwnProperty.call(Object.prototype, 'hasOwnProperty')
    );
  });
  test('the Object.prototype should have its __proto__ set to null', () => {
    expect(Object.prototype.__proto__).toBeNull();
  });
});

describe('Testing constructor property on prototypes', () => {
  function foo() {}
  function bar() {}
  test('the prototype object of any function should have a constructor property', () => {
    expect(
      Object.prototype.hasOwnProperty.call(foo.prototype, 'constructor')
    ).toBeTruthy();
  });
  test('the constructor property on prototype of the function should point back to the object face of the same function', () => {
    expect(foo.prototype.constructor === foo).toBeTruthy();
  });
  test('the constructor property can be changed to point to different object', () => {
    bar.prototype.constructor = foo;
    expect(bar.prototype.constructor === foo).toBeTruthy();
  });
});
