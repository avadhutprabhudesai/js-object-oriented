/**
 *      1. standalone arrow functions
 *      2. arrow functions on objects
 *      3. arrow functions with call/apply/bind
 *      4. arrow functions inside normal functions
 *      5. arrow functions on constructor functions
 *      6. arrow functions on class TBD
 */

import { emphasize, Employee, foo, fooStrict, printThis, user } from './arrow';

describe('Testing this binding for standalone arrow functions', () => {
  it('standalone global arrow functions should refer to global object for this reference in non-strict mode', () => {
    try {
      expect(foo()).toBe('John'); //Jest runs test in strict mode.
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('standalone global arrow functions should have undefined as this reference in strict mode', () => {
    try {
      fooStrict();
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});

describe('Testing this binding for arrow functions on objects', () => {
  it('this should point to global object for arrow functions of objects', () => {
    expect(user.printThis()).toBeUndefined(); //Jest runs test in strict mode. In non-strict mode it will be windows
  });
});

describe('Testing arrow functions with call/apply/bind', () => {
  it('arrow functions should ignore explicit this binding provided by call/apply/bind', () => {
    expect(
      printThis.call({
        name: 'John',
      })
    ).toBeUndefined();
    expect(
      printThis.apply({
        name: 'John',
      })
    ).toBeUndefined();
    expect(
      printThis.bind({
        name: 'John',
      })()
    ).toBeUndefined();
  });
});

describe('Testing arrow functions inside normal functions', () => {
  it('should use this binding of first non-arrow parent function', () => {
    expect(
      emphasize.call({
        name: 'John',
      })
    ).toBe('JOHN');
  });
});

describe('Testing arrow functions inside constructor functions', () => {
  it('arrow functions inside the constructor functions should use the this binding provided by the new keyword', () => {
    const emp = new Employee('John', 20);
    expect(emp.getName()).toBe('John');
  });
});
