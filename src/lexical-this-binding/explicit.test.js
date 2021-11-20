/**
 *      1. call
 *      2. apply
 *      3. custom bind
 *      4. built-in bind
 *
 */

import { asyncCall, greet, hardBind } from './explicit';

describe('Testing explicit binding with call', () => {
  it('call method should be available on Function.prototype', () => {
    expect(
      Object.prototype.hasOwnProperty.call(Function.prototype, 'call')
    ).toBeTruthy();
  });
  it('should be able to pass this reference to the function via call method', () => {
    expect(greet.call({ name: 'John' })).toEqual('Hi, John');
  });
  it('call should accept parameters in comma separated list form along with this reference', () => {
    expect(greet.call({ name: 'John' }, 'Welcome')).toEqual('Welcome, John');
  });
});
describe('Testing explicit binding with apply', () => {
  it('apply method should be available on Function.prototype', () => {
    expect(
      Object.prototype.hasOwnProperty.call(Function.prototype, 'apply')
    ).toBeTruthy();
  });
  it('should be able to pass this reference to the function via apply method', () => {
    expect(greet.apply({ name: 'John' })).toEqual('Hi, John');
  });
  it('apply should accept parameters in array form along with this reference', () => {
    expect(greet.apply({ name: 'John' }, ['Welcome'])).toEqual('Welcome, John');
  });
});

describe('Testing hard binding with custom utility', () => {
  const greetJohn = hardBind(greet, { name: 'John' });
  it('should return a function', () => {
    expect(greetJohn).toBeInstanceOf(Function);
  });
  it('should return a function whose this is always bound to the obj argument', () => {
    expect(greetJohn()).toEqual('Hi, John');
  });
  it('function returned by the utility should accept parameters', () => {
    expect(greetJohn('Welcome')).toEqual('Welcome, John');
  });
  it('should not lose context if passed in as a callback', () => {
    return expect(asyncCall(greetJohn)).resolves.toEqual('Hi, John');
  });
});

describe('Testing built-in bind utility', () => {
  const greetJohn = greet.bind({ name: 'John' });
  it('should return a function', () => {
    expect(greetJohn).toBeInstanceOf(Function);
  });
  it('should return a function whose this is always bound to the obj argument', () => {
    expect(greetJohn()).toEqual('Hi, John');
  });
  it('function returned by the utility should accept parameters', () => {
    expect(greetJohn('Welcome')).toEqual('Welcome, John');
  });
  it('should not lose context if passed in as a callback', () => {
    return expect(asyncCall(greetJohn)).resolves.toEqual('Hi, John');
  });
});
