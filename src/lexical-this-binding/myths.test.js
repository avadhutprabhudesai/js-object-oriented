/**
 * Myths and misconceptions around this
 *
 *      1. 'this' refers to the function object
 *              How to count the number of times a function was called?
 *      2. 'this' refers to the scope of the function
 */

import { bar, foo } from './myths';

describe('Testing misconceptions around this keywords', () => {
  test('Myth: this keyword refers to the enclosing function object', () => {
    try {
      foo();
    } catch (error) {
      expect(error instanceof TypeError).toBeTruthy(); //this inside foo should have referred to the foo function-object but it does not.
    }
  });
  test('Myth: this keyword refers to the scope of the enclosing function', () => {
    try {
      bar();
    } catch (error) {
      expect(error instanceof TypeError).toBeTruthy(); //this inside bar should have referred to the scope of the bar.
    }
  });
});
