/* eslint-disable no-redeclare */
/**
 * How to set/unset enumerable descriptor attribute
 * . Using Object.defineProperty()
 * . Using Object.defineProperties()
 * . Enumerable is set to true when property is added with literal syntax or dot notation
 *
 * How to get current status of this descriptor prop
 * . Using Object.getOwnPropertyDescriptor()
 * . Using Object.getOwnPropertyDescriptors()
 *
 * When set to true,
 * . this property appears in output of Object.keys()
 * . value of this property appears in output of Object.values()
 * . this property appears in output of Object.entries()
 * . this property appears in output of for-in loop of the object
 * . this property appears in output of object spread
 *
 * When set to false,
 * . this property does not appear in output of Object.keys()
 * . value of this property does not appear in output of Object.values()
 * . this property does not appear in output of Object.entries()
 * . this property does not appear in output of for-in loop of the object
 * . this property does not appear in output of object spread
 * . this property is not copied over to the target in Object.assign
 */

describe('Testing how to set/unset enumerable', () => {
  it('enumerable can be set/unset using Object.defineProperty()', () => {
    const obj = {
      id: 1,
      name: 'John',
    };
    Object.defineProperty(obj, 'id', {
      enumerable: false,
    });
    var { enumerable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(enumerable).toEqual(false);
    Object.defineProperty(obj, 'id', {
      enumerable: true,
    });
    var { enumerable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(enumerable).toEqual(true);
  });
  it('enumerable can be set/unset using Object.defineProperties()', () => {
    const obj = {
      id: 1,
      name: 'John',
    };
    Object.defineProperties(obj, {
      id: {
        enumerable: false,
      },
    });
    var { enumerable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(enumerable).toEqual(false);
    Object.defineProperties(obj, {
      id: {
        enumerable: true,
      },
    });
    var { enumerable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(enumerable).toEqual(true);
  });
  it('enumerable is set to true by default when a property is added via literal syntax or via dot notation', () => {
    const obj = {
      id: 1,
      name: 'John',
    };
    obj.profile = 'Dev';
    var { id, profile } = Object.getOwnPropertyDescriptors(obj);
    expect(id.enumerable).toEqual(true);
    expect(profile.enumerable).toEqual(true);
  });
});

describe('Testing how to get current status of writable', () => {
  it('Getting enumerable attribue using Object.getOwnPropertyDescriptor()', () => {
    const obj = {
      id: 1,
    };
    const { enumerable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(enumerable).toEqual(true);
  });
  it('Getting enumerable attribue using Object.getOwnPropertyDescriptors()', () => {
    const obj = {
      id: 1,
    };
    const {
      id: { enumerable },
    } = Object.getOwnPropertyDescriptors(obj);
    expect(enumerable).toEqual(true);
  });
});

describe('Testing what operations are allowed when enumerable is set to true', () => {
  var obj = {};
  Object.defineProperties(obj, {
    id: {
      value: 1,
      enumerable: false,
      writable: true,
      configurable: true,
    },
    name: {
      value: 'John',
      enumerable: true,
      writable: true,
      configurable: true,
    },
  });
  test('the property should be present in the output of Object.keys()', () => {
    expect(Object.keys(obj).includes('name')).toBeTruthy();
    expect(Object.keys(obj).includes('id')).not.toBeTruthy();
  });
  test('the property value should be present in the output of Object.values()', () => {
    expect(Object.values(obj).includes('John')).toBeTruthy();
    expect(Object.values(obj).includes(1)).not.toBeTruthy();
  });
  test('the key-value pair for the property should be present in the output of Object.entries()', () => {
    expect(Object.entries(obj)).toEqual([['name', 'John']]);
    expect(Object.entries(obj)).not.toEqual([
      ['id', 1],
      ['name', 'John'],
    ]);
  });
  test('the property should be present in the iteration of for-in loop', () => {
    var props = [];
    for (const key in obj) {
      props.push(key);
    }
    expect(props).toEqual(['name']);
  });
  test('the property should be spread when used with the spread operator', () => {
    expect({ ...obj }).toEqual({
      name: 'John',
    });
  });
});

describe('Testing what operations are not allowed when enumerable is set to false', () => {
  var obj = {};
  Object.defineProperties(obj, {
    id: {
      value: 1,
      enumerable: false,
      writable: true,
      configurable: true,
    },
    name: {
      value: 'John',
      enumerable: true,
      writable: true,
      configurable: true,
    },
  });
  test('the property should not be present in the output of Object.keys()', () => {
    expect(Object.keys(obj).includes('id')).not.toBeTruthy();
  });
  test('the property value should not be present in the output of Object.values()', () => {
    expect(Object.values(obj).includes(1)).not.toBeTruthy();
  });
  test('the key-value pair for the property should not be present in the output of Object.entries()', () => {
    expect(Object.entries(obj)).not.toEqual([
      ['id', 1],
      ['name', 'John'],
    ]);
  });
  test('the property should not be present in the iteration of for-in loop', () => {
    var props = [];
    for (const key in obj) {
      props.push(key);
    }
    expect(props.includes('id')).not.toBeTruthy();
  });
  test('the property should not be spread when used with the spread operator', () => {
    expect({ ...obj }).not.toEqual({
      id: 1,
      name: 'John',
    });
  });
  test('the property is not copied over to the target in Object.assign()', () => {
    expect(Object.assign({}, obj)).toEqual({
      name: 'John',
    });
  });
});
