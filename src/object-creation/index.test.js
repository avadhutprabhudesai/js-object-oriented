/**
 * Object creation
 * 1. Literals
 * 2. Factory function using Object.create()
 * 3. Constructor functions using new
 * 4. Classes with new
 *
 *
 */

describe('Creating objects using literals', () => {
  var literal = {
    name: 'Julia',
    age: 23,
  };
  it('properties and methods added to literal should be attached to it', () => {
    expect(Object.prototype.hasOwnProperty.call(literal, 'name')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(literal, 'age')).toBeTruthy();
  });
  it('should have __proto__ pointing to Object.prototype', () => {
    expect(literal.__proto__).toEqual(Object.prototype);
  });
});

describe('Creating objects with factory functions using Object.create()', () => {
  const functionStore = {
    getNum: () => 2,
  };
  var withNull = Object.create(null);
  var withObj = Object.create(functionStore);
  it('should return an empty object', () => {
    expect(withNull).toEqual({});
    expect(withObj).toEqual({});
  });
  it('should return an object whose __proto__ is set to undefined when called with null', () => {
    expect(withNull.__proto__).toBeUndefined();
  });
  it('should return an object which throws TypeError when trying to access Object.prototype methods when called with null', () => {
    try {
      withNull.toString(); // calling Object.prototype methods on withNull throws TypeError
    } catch (error) {
      expect(error instanceof TypeError).toBeTruthy();
    }
  });
  it('should return an object whose __proto__ to an object with which Object.create() is called', () => {
    expect(withObj.__proto__).toEqual(functionStore);
  });
  it('returns an object which has access to methods set on the object argument which is passed to Object.create()', () => {
    expect(withObj.getNum()).toEqual(2);
  });
});

describe('Creating objects with constructor functions using new', () => {
  function User(name, age) {
    this.name = name;
    this.age = age;
  }
  User.prototype.getName = function () {
    return this.name;
  };
  const user = new User('John', 30);
  it('should return an object whose __proto__ is set to the prototype of constructor function', () => {
    expect(user.__proto__).toEqual(User.prototype);
  });
  it('should return an object which has access to methods added to the prototype of the constructor function', () => {
    expect(user.getName()).toEqual('John');
  });
});

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
}

describe('Creating objects with classes using new', () => {
  var user = new User('John', 10);
  it('should return an object whose __proto__ is set to prototype of User class', () => {
    expect(user.__proto__).toEqual(User.prototype);
  });
  it('should return an object which has access to methods', () => {
    expect(user.getName()).toEqual('John');
  });
});
