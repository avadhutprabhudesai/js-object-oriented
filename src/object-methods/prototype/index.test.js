/* eslint-disable no-prototype-builtins */
/**
 * Object prototype methods
 *
 * ================================ Property check ================================
 *  Object.prototype.hasOwnProperty()
 *  Object.prototype.propertyIsEnumerable()
 * ================================ Prototype Check ================================
 *  Object.prototype.isPrototypeOf()
 * ================================ Conversion to primitives ================================
 *  Object.prototype.toLocalString()
 *  Object.prototype.toString()
 *  Object.prototype.valueOf()
 *
 */

function Parent(name) {
  this.name = name;
}
Parent.prototype.foo = function () {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);

Child.prototype.bar = function () {
  return this.age;
};

function GrandChild() {}

GrandChild.prototype = Object.create(Child.prototype);

describe('Testing Object.prototype.hasOwnProperty()', () => {
  var obj = {
      id: 1,
    },
    nullObj = Object.create(null),
    protoObj = Object.create({
      id: 1,
    });
  it('should return a boolean', () => {
    expect(obj.hasOwnProperty('id')).toBeTruthy();
  });
  it('this methods does not exist on the obejcts created using null prototype', () => {
    try {
      nullObj.hasOwnProperty('id');
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should return true if the property exists directly on the given object', () => {
    expect(obj.hasOwnProperty('id')).toBeTruthy();
  });
  it('should return false if the property exists on the prototype chain of the given object', () => {
    expect(protoObj.hasOwnProperty('id')).not.toBeTruthy();
  });
});

describe('Testing Object.prototype.propertyIsEnumerable()', () => {
  const p = new Parent('John');
  const c = new Child('Smith', 33);

  Object.defineProperty(c, 'id', {
    value: 1,
    enumerable: true,
  });
  Object.defineProperty(c, 'profile', {
    value: 'Developer',
  });

  it('should return a boolean', () => {
    expect(p.propertyIsEnumerable('name')).toEqual(true);
  });
  it('should return true for enumerable properties available directly on the object', () => {
    expect(c.propertyIsEnumerable('id')).toEqual(true);
    expect(c.propertyIsEnumerable('name')).toEqual(true);
  });
  it('should return false for non-enumerable properties available directly on the object', () => {
    expect(c.propertyIsEnumerable('profile')).toEqual(false);
  });
  it("should return false for enumerable properties available on the object's prototype chain", () => {
    expect(c.propertyIsEnumerable('bar')).toEqual(false);
    expect(c.propertyIsEnumerable('foo')).toEqual(false);
  });
});

describe('Testing Object.prototype.isPrototypeOf()', () => {
  const p = new Parent(),
    c = new Child(),
    g = new GrandChild();
  it('should return a boolean', () => {
    expect(Object.prototype.isPrototypeOf(p)).toEqual(true);
  });
  it('should return true if obj argument is present in the prototypal chain of the caller object', () => {
    expect(Parent.prototype.isPrototypeOf(p)).toEqual(true);
    expect(Parent.prototype.isPrototypeOf(c)).toEqual(true);
    expect(Parent.prototype.isPrototypeOf(g)).toEqual(true);
  });
  it('should return false if obj argument is not present in the prototypal chain of the caller object', () => {
    expect(Child.prototype.isPrototypeOf(p)).toEqual(false);
  });
  it("should return false if obj's prototype is null ", () => {
    const o = Object.create(null);
    expect(Object.prototype.isPrototypeOf(o)).toEqual(false);
  });
});

// @TODO: Revisit after learning Intl
describe.skip('Testing Object.prototype.toLocaleString()', () => {});

describe('Testing Object.prototype.toString()', () => {
  // Without overriding
  it('without overriding, it should return [object Object] for all primitives', () => {
    expect(Object.prototype.toString('string')).toEqual('[object Object]');
    expect(Object.prototype.toString(1)).toEqual('[object Object]');
    expect(Object.prototype.toString(true)).toEqual('[object Object]');
    expect(Object.prototype.toString(undefined)).toEqual('[object Object]');
    expect(Object.prototype.toString(null)).toEqual('[object Object]');
  });
  it('without overriding, it should return [object Object] for arrays and functions', () => {
    expect(Object.prototype.toString([])).toEqual('[object Object]');
    expect(Object.prototype.toString(function () {})).toEqual(
      '[object Object]'
    );
  });
  // With overriding
  it('with overriding, it should be equal to the return value of the overridden toString() method of the object', () => {
    expect([].toString()).toEqual('');
    expect([1, 2, 3].toString()).toEqual('1,2,3');
    expect({ toString: () => 'custom string' }.toString()).toEqual(
      'custom string'
    );
  });
});

describe('Testing Object.prototype.valueOf()', () => {
  // without overriding
  it('should return either a primitive value or the object itself', () => {
    expect({ id: 1 }.valueOf()).toEqual({
      id: 1,
    });
  });
  // with overriding
  const obj = {
    id: 1,
    valueOf: function () {
      return this.id;
    },
  };
  it('should have the return value of overridden valueOf method', () => {
    expect(obj.valueOf()).toEqual(1);
  });
});
