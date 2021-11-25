/* eslint-disable @babel/no-invalid-this */
/**
 *  Object static methods
 *        //=========================Object property creation/modification=========================
 *      . Object.defineProperty()
 *      . Object.defineProperties()
 *        //=========================Object property retrieval=========================
 *      . Object.keys()
 *      . Object.values()
 *      . Object.entries()
 *      . Object.fromEntries()
 *      . Object.getOwnPropertyDescriptor()
 *      . Object.getOwnPropertyDescriptors()
 *      . Object.getOwnPropertyNames()
 *        //=========================Object creation=========================
 *      . Object.assign()
 *      . Object.create()
 *        //=========================Object __proto__ retrieval/modification=========================
 *      . Object.getPrototypeOf()
 *      . Object.setPrototypeOf()
 *        //=========================Object equality=========================
 *      . Object.is()
 *        //=========================Object extension behavior modification=========================
 *      . Object.preventExtensions()
 *      . Object.seal()
 *      . Object.freeze()
 *      . Object.isExtensible()
 *      . Object.isSealed()
 *      . Object.isFrozen()
 */

//=========================Object property creation/modification=========================

describe('Testing object.defineProperty()', () => {
  var obj = {
    id: 1,
    name: 'John',
  };
  /**
   * Return value
   */
  it('should return the same object passed in as the argument', () => {
    expect(
      Object.defineProperty(obj, 'profile', {
        value: 'Developer',
      })
    ).toEqual(obj);
  });
  /**
   *    Descriptors
   *        1. Data descriptors
   *            value
   *            writable
   *        2. Access descriptors
   *            get
   *            set
   *        3. Common
   *            enumerable
   *            configurable
   */
  it('if descriptor is provided as a blank object then all options should be at defaults', () => {
    const output = Object.defineProperty({}, 'name', {});
    const { value, writable, configurable, enumerable } =
      Object.getOwnPropertyDescriptors(output);
    expect(value).toBeUndefined();
    expect(writable).toBeFalsy();
    expect(enumerable).toBeFalsy();
    expect(configurable).toBeFalsy();
  });
  it('value of the property should be set to value option from the descriptor', () => {
    const output = Object.defineProperty({}, 'name', {
      value: 'Smith',
    });
    expect(output.name).toBe('Smith');
  });
  it('if the property is non-writable, then reassigning it with assignment operator should throw TypeError in strict mode', () => {
    const obj = Object.defineProperty({}, 'name', {
      value: 'Smith',
      writable: false,
    });
    try {
      // Error in strict mode, but no effect in non-strict mode
      obj.name = 'John';
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('if the property is non-writable, then reassigning it with descriptor should throw TypeError in strict mode', () => {
    const obj = Object.defineProperty({}, 'name', {
      value: 'Smith',
      writable: false,
    });
    try {
      // Error in strict mode, but no effect in non-strict mode
      Object.defineProperty(obj, 'name', { value: 'John' });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });

  it('if the property is non-enumerable, then it should not appear in object enumeration', () => {
    /**
     * Object.assign
     * Object.keys
     * Object.values
     * Object.entries
     * for-in loop
     * spread operator
     */
    const obj = Object.defineProperty({}, 'name', {
      value: 'Smith',
      enumerable: false,
    });
    expect(
      Object.assign(obj, {
        id: 1,
      })
    ).toEqual({
      id: 1,
    });

    try {
      Object.assign(obj, {
        id: 1,
        name: 'John',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }

    expect(Object.keys(obj)).toEqual(['id']);
    expect(Object.values(obj)).toEqual([1]);
    expect(Object.entries(obj)).toEqual([['id', 1]]);
    var props = [];
    for (const key in obj) {
      props.push(key);
    }
    expect(props).toEqual(['id']);
    expect({ ...obj }).toEqual({
      id: 1,
    });
  });
  it('if the property is non-configurable, then it should not allow to modify existing writable and enumerable options', () => {
    const obj = Object.defineProperty({}, 'name', {
      value: 'John',
      writable: false,
      enumerable: false,
      configurable: false,
    });
    try {
      //this Object.defineProperty() produces error as configurable is set to false already
      Object.defineProperty(obj, 'name', {
        writable: true,
        enumerable: true,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
    expect({ ...obj }).toEqual({});
  });
  it('if the property is non-configurable, then it should not allow that property to be deleted', () => {
    const obj = Object.defineProperty({}, 'name', {
      value: 'John',
      writable: false,
      enumerable: false,
      configurable: false,
    });
    try {
      delete obj.name; // cannot delete name prop as it is non-configurable
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('get() function should be called whenever there is an attempt to retrive the value of the property', () => {
    const obj = Object.defineProperty({}, 'name', {
      get: function () {
        return this._name.toUpperCase();
      },
      set: function (n) {
        this._name = n;
      },
    });
    obj.name = 'John';
    expect(obj.name).toEqual('JOHN');
  });
  it('set() function should be called whenever there is an attempt to set the value of the property', () => {
    const obj = Object.defineProperty({}, 'name', {
      get: function () {
        return this._name;
      },
      set: function (n) {
        this._name = n.toLowerCase();
      },
    });
    obj.name = 'JOHN';
    expect(obj.name).toEqual('john');
  });
  it('should throw TypeError if both data and access modifiers are present in the descriptor', () => {
    try {
      // Following descriptor produces TypeError as data and accessor props are present together.
      Object.defineProperty({}, 'name', {
        value: 'John',
        get: function () {
          return 'error';
        },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});

describe('Testing object.defineProperties()', () => {
  it('should return the same object passed to it', () => {
    const obj = {};
    expect(
      Object.defineProperties(obj, {
        name: {
          value: 'John',
        },
        id: {
          value: 1,
        },
      })
    ).toEqual(obj);
  });
  //   For some reasons, Object.defineProperties is not modifying the original object here.
  //   @TODO: File an issue on Jest repo about this
  it.skip('should accept multiple descriptors to be added to the given object', () => {
    const obj1 = {};
    var newObj = Object.defineProperties(obj1, {
      name: {
        value: 'John',
      },
      id: {
        value: 1,
      },
    });
    console.log(newObj);
    expect(obj1).toEqual({
      name: 'John',
      id: 1,
    });
  });
});

//=========================Object key/property retrieval=========================

describe('Testing Object.keys()', () => {
  it('should return an array', () => {
    expect(Object.keys({ id: 1 })).toBeInstanceOf(Array);
  });
  it('should return an array of strings representing passed in objects own enumerable properties', () => {
    var obj = {
      id: 1,
      name: 'John',
    };
    Object.defineProperty(obj, 'profile', {
      value: 'Devops',
      enumerable: false,
    });
    expect(Object.keys(obj)).toEqual(['id', 'name']);
  });
  it('should return a blank array if there are no enumerable own properties', () => {
    expect(Object.keys({})).toEqual([]);
  });
  it('should traverse all integer keys in the object in the ascending order', () => {
    expect(
      Object.keys({
        10: 10,
        9: 20,
        8: 30,
        '01': 100,
      })
    ).toEqual(['8', '9', '10', '01']);
  });
  it('should traverse all string keys in the order they were inserted, after traversing integer keys is finished', () => {
    expect(
      Object.keys({
        '01': 100,
        10: 10,
        9: 20,
        8: 30,
        '05': 500,
      })
    ).toEqual(['8', '9', '10', '01', '05']);
  });
});

describe('Testing Object.values()', () => {
  it('should return an array', () => {
    expect(Object.values({ id: 1 })).toBeInstanceOf(Array);
  });
  it("should return an array representing passed in object's own enumerable property values", () => {
    var obj = {
      id: 1,
      name: 'John',
    };
    Object.defineProperty(obj, 'profile', {
      value: 'Devops',
      enumerable: false,
    });
    expect(Object.values(obj)).toEqual([1, 'John']);
  });
  it('should return a blank array if there are no enumerable own properties', () => {
    expect(Object.values({})).toEqual([]);
  });
  it('should first traverse values of all integer keys in the object in the ascending order', () => {
    expect(
      Object.values({
        10: 10,
        9: 20,
        8: 30,
        '01': 100,
      })
    ).toEqual([30, 20, 10, 100]);
  });
  it('should traverse all property values of string keys in the order they were inserted, after traversing interger keys', () => {
    expect(
      Object.values({
        '01': 100,
        10: 10,
        9: 20,
        8: 30,
        '05': 500,
      })
    ).toEqual([30, 20, 10, 100, 500]);
  });
});

describe('Testing Object.entries()', () => {
  it('should return an array', () => {
    expect(Object.entries({ id: 1 })).toBeInstanceOf(Array);
  });
  it('should return an array of tuples representing [key, value] pair for own enumerable properties of given object', () => {
    var obj = {
      id: 1,
      name: 'John',
    };
    Object.defineProperty(obj, 'profile', {
      value: 'Devops',
      enumerable: false,
    });
    expect(Object.entries(obj)).toEqual([
      ['id', 1],
      ['name', 'John'],
    ]);
  });
  it('should return a blank array if there are no enumerable own properties', () => {
    expect(Object.entries({})).toEqual([]);
  });
  it('should first traverse values of all integer keys in the object in the ascending order', () => {
    expect(
      Object.entries({
        10: 10,
        9: 20,
        8: 30,
        '01': 100,
      })
    ).toEqual([
      ['8', 30],
      ['9', 20],
      ['10', 10],
      ['01', 100],
    ]);
  });
  it('should traverse all property values of string keys after integer keys in the order they were inserted', () => {
    expect(
      Object.entries({
        '01': 100,
        10: 10,
        9: 20,
        8: 30,
        '05': 500,
      })
    ).toEqual([
      ['8', 30],
      ['9', 20],
      ['10', 10],
      ['01', 100],
      ['05', 500],
    ]);
  });
});

describe('Testing Object.fromEntries()', () => {
  const arr = [
    ['id', 1],
    ['name', 'John'],
  ];
  const map = new Map();
  map.set('id', 1);
  map.set('name', 'John');

  it('should return an object', () => {
    expect(Object.fromEntries(arr)).toBeInstanceOf(Object);
  });
  it('should accept an array as iterable having key-value tuples and return an object with same key values', () => {
    expect(Object.fromEntries(arr)).toEqual({
      id: 1,
      name: 'John',
    });
  });
  it('should accept an map as iterable having key-value entries and return an object with same key values', () => {
    expect(Object.fromEntries(map)).toEqual({
      id: 1,
      name: 'John',
    });
  });
  it('should be able to transform objects with a mapper function using Object.entries() and Object.fromEntries()', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const doubler = ([key, value]) => [key, value * 2];

    expect(Object.fromEntries(Object.entries(obj).map(doubler))).toEqual({
      a: 2,
      b: 4,
      c: 6,
    });
  });
  it('should throw TypeError if argument is not an iterable with key value pairs', () => {
    try {
      console.log(Object.fromEntries([1, 2, 3, 4]));
      expect(Object.fromEntries([1, 2, 3, 4]));
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});

describe('Testing Object.getOwnPropertyDescriptor()', () => {
  it('should return an object', () => {
    expect(Object.getOwnPropertyDescriptor({ id: 1 }, 'id')).toBeInstanceOf(
      Object
    );
  });
  it('should return descriptor object which always has common properties configurable/enumaerable', () => {
    const { configurable, enumerable } = Object.getOwnPropertyDescriptor(
      { id: 1 },
      'id'
    );
    expect(configurable).toBeTruthy();
    expect(enumerable).toBeTruthy();
  });
  it('should return data descriptor for all cases except when the property is defined with accessor descriptor', () => {
    const desc = Object.getOwnPropertyDescriptor({ id: 1 }, 'id'); // desc is a data descriptor
    expect(desc).toEqual({
      configurable: true,
      writable: true,
      enumerable: true,
      value: 1,
    });
  });
  it('should return accessor descriptor, if the property is defined with accessor descriptor', () => {
    const obj = {};
    Object.defineProperty(obj, 'id', {
      get: function () {
        return this._id;
      },
      set: function (val) {
        this._id = val;
      },
    });
    expect(Object.getOwnPropertyDescriptor(obj, 'id')).toEqual(
      expect.objectContaining({
        configurable: false,
        enumerable: false,
        get: expect.any(Function),
        set: expect.any(Function),
      })
    );
  });
});

describe('Testing Object.getOwnPropertyDescriptors()', () => {
  it('should return an object', () => {
    const obj = {
      id: 1,
      name: 'John',
    };
    expect(Object.getOwnPropertyDescriptors(obj)).toEqual(
      expect.objectContaining({
        id: expect.any(Object),
        name: expect.any(Object),
      })
    );
  });
  it('should return an object with keys equal to properties and values containing corresponding descriptor objects', () => {
    const obj = {
      id: 1,
    };
    Object.defineProperty(obj, 'name', {
      enumerable: false,
      writable: false,
      value: 'John',
    });
    const desc = Object.getOwnPropertyDescriptors(obj);
    expect(desc.id).toEqual({
      value: 1,
      configurable: true,
      writable: true,
      enumerable: true,
    });
    expect(desc.name).toEqual({
      value: 'John',
      configurable: false,
      writable: false,
      enumerable: false,
    });
  });
});

describe('Testing Object.getPropertyNames()', () => {
  var sym = Symbol.for('symbol prop');
  const obj = {
    id: 1,
    [sym]: 'This is a Symbol prop',
  };
  Object.defineProperty(obj, 'name', {
    value: 'John',
    configurable: true,
    enumerable: true,
    writable: true,
  });
  Object.defineProperty(obj, 'profile', {
    value: 'DevOps',
    configurable: true,
    writable: true,
    enumerable: false,
  });
  const ownProps = Object.getOwnPropertyNames(obj);
  it('should return an array of strings', () => {
    expect(ownProps).toBeInstanceOf(Array);
  });
  it('should return an array of all property names present on the object itself', () => {
    expect(ownProps).toEqual(['id', 'name', 'profile']);
  });
  it('should return an array of all property names including non-enumerable properties as well', () => {
    expect(ownProps.includes('profile')).toBeTruthy();
  });
  it('should return an array of all property names except Symbol property names', () => {
    expect(ownProps.includes(sym)).toBeFalsy();
  });
});

//=========================Object creation=========================
describe('Testing Object.assign()', () => {
  const obj = {
    id: 1,
  };
  Object.defineProperty(obj, 'name', {
    value: 'John',
    configurable: true,
    enumerable: true,
    writable: true,
  });
  Object.defineProperty(obj, 'profile', {
    value: 'DevOps',
    configurable: true,
    writable: true,
    enumerable: false,
  });
  const target = {};
  it('should return the target object', () => {
    expect(Object.assign(target, obj)).toBeInstanceOf(Object);
    expect(Object.assign(target, obj)).toEqual(target);
  });
  it('should assign all own and enumerable properties of source object to target object ', () => {
    expect(Object.keys(Object.assign(target, obj))).toStrictEqual([
      'id',
      'name',
    ]);
    expect(
      Object.keys(Object.assign(target, obj)).includes('profile')
    ).toBeFalsy();
  });
  it('should override the properties in the target object from source object', () => {
    const obj = {
      id: 10,
      name: 'John',
    };
    const target = {
      id: 2,
    };
    expect(Object.assign(target, obj)).toEqual({
      id: 10,
      name: 'John',
    });
  });
  it('should merge properties from serveral sources into the target', () => {
    expect(
      Object.assign(
        {},
        {
          id: 1,
        },
        {
          name: 'John',
        },
        {
          profile: 'Engineer',
        }
      )
    ).toEqual({
      id: 1,
      name: 'John',
      profile: 'Engineer',
    });
  });
  it("can accept multiple sources. Later sources' value overrides previous ones for same keys", () => {
    const source = {
      id: 1,
      name: 'John',
    };
    const nextSource = {
      name: 'Smith',
    };
    expect(Object.assign({}, source, nextSource)).toEqual({
      id: 1,
      name: 'Smith',
    });
  });
});

describe('Testing Object.create()', () => {
  const store = {
    method: function () {
      return this.name;
    },
  };
  it('should return a new object', () => {
    expect(Object.create(store)).toBeInstanceOf(Object);
  });
  it('should throw a TypeError if anything except null or Object(excluding primitive wrappers) is passed as the proto argument', () => {
    try {
      Object.create();
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should return an object with NO members (even __proto__) when null is passed as a proto argument', () => {
    const nullObj = Object.create(null);
    expect(Object.keys(nullObj)).toEqual([]);
    expect(Object.getOwnPropertyNames(nullObj)).toEqual([]);
    expect(nullObj.__proto__).toBeUndefined();
    expect(Object.getPrototypeOf(nullObj)).toBeNull();
  });
  it('should create a new object with its __proto__ link pointing to the object passed in as first argument', () => {
    const obj = Object.create(store);
    expect(obj).toBeInstanceOf(Object);
    expect(Object.getPrototypeOf(obj)).toEqual(store);
    expect(obj.__proto__).toEqual(store);
  });
  it('should accept propertiesObject as second argument and return new object with those properties added by default', () => {
    const obj = Object.create(store, {
      id: {
        value: 1,
        writable: true,
        enumerable: true,
        configurable: true,
      },
      name: {
        value: 'John',
        writable: true,
        enumerable: true,
        configurable: true,
      },
    });
    expect(obj.id).toBe(1);
    expect(obj.method()).toBe('John');
  });
});

//=========================Object __proto__ modification=========================

describe('Testing Object.getPrototypeOf', () => {
  it('should return an object', () => {
    expect(Object.getPrototypeOf(Object.create({}))).toBeInstanceOf(Object);
  });
  it('should return the object pointed by __proto__ of the input object', () => {
    const methodStore = {
      display: function () {},
    };
    const obj = Object.create(methodStore);
    expect(Object.getPrototypeOf(obj)).toEqual(methodStore);
  });
  it('if the input is not an object, then it should coerce it to the respective wrapper object and then return the __proto__ link', () => {
    expect(Object.getPrototypeOf('String')).toEqual(String.prototype);
    expect(Object.getPrototypeOf(1)).toEqual(Number.prototype);
  });
  it('should return Function.prototype for all kinds of functions', () => {
    function foo() {}
    const bar = function () {};
    expect(Object.getPrototypeOf(foo)).toEqual(Function.prototype);
    expect(Object.getPrototypeOf(bar)).toEqual(Function.prototype);
    expect(Object.getPrototypeOf(() => {})).toEqual(Function.prototype);
  });
  it('should return Array.prototype for array', () => {
    const bar = [];
    expect(Object.getPrototypeOf(bar)).toEqual(Array.prototype);
  });
});

describe('Testing Object.setPrototypeOf()', () => {
  const obj = {};
  const obj1 = {};
  const store = {
    display: function () {},
  };
  it('should modify the input object', () => {
    expect(Object.setPrototypeOf(obj, store)).toEqual(obj);
  });
  it.skip('should do nothing if second argument is anything except null or an object', () => {
    expect(Object.getPrototypeOf(obj1)).toEqual(Object.prototype);
    Object.setPrototypeOf(obj1, false); //jest throws error for any value except null or a valid object. thus need to skip this
    expect(Object.getPrototypeOf(obj1)).toEqual(Object.prototype);
  });
  it('should set the __proto__ of first argument to second argument', () => {
    Object.setPrototypeOf(obj1, store);
    expect(Object.getPrototypeOf(obj1)).toEqual(store);
  });
});
//=========================Object equality=========================
describe('Testing Object.is()', () => {
  it('should return a boolean', () => {
    expect(Object.is(1, 2)).toBe(false);
  });
  it('should check the equality of 2 values using same value abstract operation', () => {
    const obj = {},
      arr = [1, 2, 3];
    expect(Object.is(undefined, undefined)).toBe(true);
    expect(Object.is(null, null)).toBe(true);
    expect(Object.is(+0, +0)).toBe(true);
    expect(Object.is(-0, -0)).toBe(true);
    expect(Object.is(NaN, NaN)).toBe(true);
    expect(Object.is(true, true)).toBe(true);
    expect(Object.is(false, false)).toBe(true);
    expect(Object.is('exactsamestring', 'exactsamestring')).toBe(true);
    expect(Object.is(1, 1)).toBe(true);
    expect(Object.is(obj, obj)).toBe(true);
    expect(Object.is(arr, arr)).toBe(true);

    expect(Object.is(undefined, null)).toBe(false);
    expect(Object.is(true, false)).toBe(false);
    expect(Object.is(+0, -0)).toBe(false);
    expect(Object.is('string', 'diffString')).toBe(false);
    expect(Object.is({ id: 1 }, { id: 1 })).toBe(false);
    expect(Object.is([1, 2], [1, 2])).toBe(false);
  });
});
//=========================Object property behavior modification=========================
describe('Testing Object.preventExtension()', () => {
  function User(name) {
    this.name = name;
  }
  User.prototype.getName = function () {
    return this.name;
  };
  var user;
  beforeEach(() => {
    user = new User('John');
    user.id = 1;
  });
  it('should return the same object passed as an argument', () => {
    expect(Object.preventExtensions(user)).toEqual(user);
  });
  it('should allow to delete existing on non-extensible object', () => {
    Object.preventExtensions(user);
    delete user.id;
    expect(Object.getOwnPropertyNames(user).includes('id')).toBeFalsy();
  });
  it('should allow to add new properties ON PROTOTYPE of a non-extensible object', () => {
    Object.preventExtensions(user);
    User.prototype.addName = function (value) {
      return value;
    };
    expect(user.addName('Smith')).toEqual('Smith');
  });
  it('should allow to modify existing properties on a non-extensible object', () => {
    Object.preventExtensions(user);
    user.name = 'Smith';
    expect(user.name).toEqual('Smith');
  });
  it('should throw TypeError when trying to define a property on non-extensible object', () => {
    try {
      Object.defineProperty(user, 'profile', {
        value: 'Dev',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError when trying to assign new property on non-extensible object', () => {
    try {
      user.profile = 'Dev';
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError when trying to re-assign prototype of a non-extensible object', () => {
    try {
      Object.setPrototypeOf(user, {
        foo: function () {},
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});

describe('Testing Object.seal', () => {
  var user = {
    id: 1,
    name: 'John',
  };
  var store = {
    displayName: function () {
      return this.name;
    },
  };
  Object.setPrototypeOf(user, store);
  Object.defineProperty(user, 'profile', {
    value: 'Engineer',
    writable: false,
  });
  it('should the same object passed in as argument', () => {
    expect(Object.seal(user)).toEqual(user);
  });
  it('should set all properties of an object as non-reconfigurable', () => {
    const { id, name, profile } = Object.getOwnPropertyDescriptors(user);
    expect(id.configurable).toBeFalsy();
    expect(name.configurable).toBeFalsy();
    expect(profile.configurable).toBeFalsy();
  });
  it('should throw TypeError when trying to define new properties on sealed object', () => {
    try {
      Object.defineProperty(user, 'salary', {});
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError when trying to add new properties on sealed object', () => {
    try {
      user.salary = 10000;
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError when trying to remove existing properties on sealed object', () => {
    try {
      delete user.name;
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError when trying to reconfigure object properties', () => {
    try {
      Object.defineProperty(user, 'profile', {
        writable: true,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError when trying to re-assign __proto__ of a sealed object', () => {
    try {
      Object.setPrototypeOf(user, {
        foo: function () {},
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should allow to change value of a data property on sealed object if writable was set to true', () => {
    user.name = 'Smith';
    expect(user.name).toBe('Smith');
  });
});
describe('Testing Object.freeze()', () => {
  var user = {
    id: 1,
    name: 'John',
  };
  var store = {
    displayName: function () {
      return this.name;
    },
  };
  Object.setPrototypeOf(user, store);
  Object.defineProperty(user, 'profile', {
    value: 'Engineer',
    writable: false,
  });
  it('should the same object passed in as argument', () => {
    expect(Object.freeze(user)).toEqual(user);
  });
  it('should set all properties of an object as non-reconfigurable and non-writable', () => {
    Object.freeze(user);
    const { id, name, profile } = Object.getOwnPropertyDescriptors(user);
    expect(id.configurable).toBeFalsy();
    expect(name.configurable).toBeFalsy();
    expect(profile.configurable).toBeFalsy();
    expect(id.writable).toBeFalsy();
    expect(name.writable).toBeFalsy();
    expect(profile.writable).toBeFalsy();
  });
  it('should throw TypeError when trying to define new properties on frozen object', () => {
    try {
      Object.defineProperty(user, 'salary', {});
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError when trying to add new properties on frozen object', () => {
    try {
      user.salary = 10000;
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError when trying to remove existing properties on frozen object', () => {
    try {
      delete user.name;
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError when trying to reconfigure object properties', () => {
    try {
      Object.defineProperty(user, 'profile', {
        writable: true,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError when trying to re-assign __proto__ of a frozen object', () => {
    try {
      Object.setPrototypeOf(user, {
        foo: function () {},
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should throw TypeError while changing value of a data property on frozen object', () => {
    try {
      user.name = 'Smith';
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});

describe('Testing Object.isExtensible()', () => {
  it('should return a boolean', () => {
    expect(Object.isExtensible({})).toBe(true);
  });
  it('all objects are by default extensible', () => {
    expect(Object.isExtensible({ id: 1 })).toBe(true);
  });
  it('should return true if an object is marked non-extensible using Object.preventExtension/Object.seal/Object.freeze', () => {
    const a = Object.preventExtensions({ id: 1 });
    const b = Object.seal({ id: 1 });
    const c = Object.freeze({ id: 1 });
    expect(Object.isExtensible(a)).toBeFalsy();
    expect(Object.isExtensible(b)).toBeFalsy();
    expect(Object.isExtensible(c)).toBeFalsy();
  });
});

describe('Testing Object.isSealed()', () => {
  it('should return a boolean', () => {
    expect(Object.isSealed({})).toBe(false);
  });
  it('all objects are by default non-sealed', () => {
    expect(Object.isSealed({ id: 1 })).toBe(false);
  });
  it('an empty, non-extensible obejct is considered sealed', () => {
    const ene = Object.preventExtensions({});
    expect(Object.isSealed(ene)).toBeTruthy();
  });
  it('should return true for objects marked with Object.seal and Object.freeze', () => {
    const a = Object.seal({});
    const b = Object.freeze({});
    expect(Object.isSealed(a)).toBeTruthy();
    expect(Object.isSealed(b)).toBeTruthy();
  });
  it('should return true if object is non extensible and all properties are non-configurable', () => {
    const a = {
      id: 1,
    };
    Object.defineProperty(a, 'id', {
      configurable: false,
    });
    Object.preventExtensions(a);
    expect(Object.isSealed(a)).toBeTruthy();
  });
});

describe('Testing Object.isFrozen()', () => {
  it('should return a boolean', () => {
    expect(Object.isFrozen({})).toBe(false);
  });
  it('all objects are by default non-frozen', () => {
    expect(Object.isFrozen({ id: 1 })).toBe(false);
  });
  it('should return true for objects marked Object.freeze', () => {
    const b = Object.freeze({});
    expect(Object.isSealed(b)).toBeTruthy();
  });
  it('should return true if object is non extensible and all properties are non-configurable and non-writable', () => {
    const a = {
      id: 1,
    };
    Object.defineProperty(a, 'id', {
      configurable: false,
      writable: false,
    });
    Object.preventExtensions(a);
    expect(Object.isFrozen(a)).toBeTruthy();
  });
});
