/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/**
 * Operators related to Object Oriented Programming
 *
 *      1. instanceof
 *      2. in
 *      3. ?. optional chaining
 *      4. delete
 *      5. super
 *
 * Loop constructs related to Object Oriented Programming
 *      1. for-in loop
 */

var globalVar = 'Global var';

describe('Testing instanceof operator', () => {
  function Parent() {}
  function Child() {}
  Child.prototype = Object.create(Parent.prototype);
  function GrandChild() {}
  GrandChild.prototype = Object.create(Child.prototype);

  const p = new Parent();
  const c = new Child();
  const g = new GrandChild();

  // return value
  it('should return a boolean', () => {
    expect(g instanceof GrandChild).toEqual(true);
  });
  // constructor prototype appears in the object prototype chain
  it('should return true if the constructor prototype appears in the object prototype chain', () => {
    expect(g instanceof GrandChild).toEqual(true);
    expect(g instanceof Child).toEqual(true);
    expect(g instanceof Parent).toEqual(true);
    expect(c instanceof Parent).toEqual(true);
  });
  // constructor prototype does not appear in the object prototype chain
  it('should return false if the constructor prototype does not appear in the object prototype chain', () => {
    expect(p instanceof Child).toEqual(false);
  });
  // how to use Object.prototype.isPrototypeOf() and instanceof operator to achieve same results
  it('Object.prototype.isPrototypeOf() and instanceof to achieve same results', () => {
    expect(c instanceof Child).toEqual(true);
    expect(Child.prototype.isPrototypeOf(c)).toEqual(true);
  });
});

describe('Testing in operator', () => {
  var obj = {
    id: 1,
  };
  Object.defineProperty(obj, 'name', {
    value: 'Smith',
    enumerable: false,
  });
  Object.setPrototypeOf(obj, {
    propOnProto: 'propOnProto',
  });
  // return value
  it('should return a boolan', () => {
    expect('id' in { id: 1 }).toEqual(true);
  });
  // what if rhs is not an object
  it('should throw an error if right hand side is not an object', () => {
    try {
      const present = 'id' in 2;
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  // does it check on self
  it('should return true if property is directly found on the object', () => {
    expect('id' in obj).toEqual(true);
  });

  // does it check on prototype chain
  it('should return true if property is found on the prototype chain of the object', () => {
    expect('propOnProto' in obj).toEqual(true);
  });
  // does it check non-enumerable props
  it('should return true if non-enumerable property is found on the object or up the prototype chain of the object', () => {
    expect('name' in obj).toEqual(true);
  });
  // how does it behave with array
  it('should return true if given index exists for the array', () => {
    const arr = [1, 2, 3, 4];
    expect(0 in arr).toEqual(true);
    expect(3 in arr).toEqual(true);
    expect(5 in arr).toEqual(false);
    expect(1 in [, , ,]).toEqual(false); // such array has length = 3 but no index properties
  });
});

describe('Testing ?. operator', () => {
  const obj = {
    id: 1,
    arr: [1, 2, 3],
    getName: () => 'John',
    nestedObj: {
      name: 'Dona',
    },
  };
  // for accessing object prop
  it('should return the value of the object prop if it exists on the object, else return undefined ', () => {
    expect(obj?.id).toBe(1);
    expect(obj?.name).toBeUndefined();
  });
  // for invoking object method
  it('should invoke the method on the object if it exists, else return undefined', () => {
    expect(obj.getName?.()).toBe('John');
    expect(obj.getDisplayName?.()).toBeUndefined();
  });
  // for accessing arr index
  it('should return the value at given index it index exists, else return undefined', () => {
    expect(obj.arr?.[0]).toBe(1);
    expect(obj.arr1?.[0]).toBeUndefined();
  });
  // for accessing object/array with an expression
  it('should access the property with bracket notation if it exists, else return undefined', () => {
    expect(obj.nestedObj?.['name']).toBe('Dona');
  });
});

describe('Testing delete operator', () => {
  var obj;
  beforeEach(() => {
    obj = {
      id: 1,
      name: 'John',
      profile: 'Developer',
    };
    Object.defineProperty(obj, 'nonConfig', {
      configurable: false,
    });
  });
  // delete on existing object props
  it('should return true after deleting an existing object property', () => {
    expect(delete obj.id).toEqual(true);
  });
  // delete on non-existing object props
  it('should return true if delete is used with non-existiing object properties', () => {
    expect(delete obj.nonExistentProp).toEqual(true);
  });
  // delete on non-configurable object props
  it('should raise TypeError in strict mode for trying to delete non-configurable prop ', () => {
    try {
      delete obj.nonConfig;
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });

  // delete on global var
  it.skip('should raise a SyntaxError in strict mode while trying to delete direct references to variable, function name or function arguments', () => {
    try {
      // delete globalVar; // deleting a direct reference to variable is a SyntaxError in strict mode. Hence need to comment this line and skip this test
    } catch (error) {
      expect(error).toBeInstanceOf(SyntaxError);
    }
  });
});
