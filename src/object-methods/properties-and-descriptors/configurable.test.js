/* eslint-disable no-redeclare */
/**
 * How to set/unset configurable descriptor attribute
 * . Using Object.defineProperty()
 * . Using Object.defineProperties()
 * . Using Object.seal()
 * . Using Object.freeze()
 * . Writable is set to true when property is added with literal syntax or dot notation
 *
 * How to get the current status of this descriptor prop
 * . Using Object.getOwnPropertyDescriptor()
 * . Using Object.getOwnPropertyDescriptors()
 *
 * When set to true, it
 * . can delete property using delete operator
 * . can change writability of this property
 * . can change enumerability of this property
 * . can change configurability of this property once
 *
 * When set to false
 * . cannot delete property using delete operator
 * . CAN change writability of this property
 * . cannot change enumerability of this property
 * . cannot change configurability of this property
 *
 */

describe('Testing how to set/unset configurable descriptor attribute', () => {
  it('configurable can be set/unset using Object.defineProperty()', () => {
    const obj = {
      id: 1,
    };
    // set
    Object.defineProperty(obj, 'id', {
      configurable: true,
    });
    var { configurable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(configurable).toEqual(true);

    // unset
    Object.defineProperty(obj, 'id', {
      configurable: false,
    });
    var { configurable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(configurable).toEqual(false);
  });

  it('configurable can be set/unset using Object.defineProperties()', () => {
    const obj = {
      id: 1,
    };

    // unset
    Object.defineProperties(obj, {
      id: {
        configurable: true,
      },
    });
    var { configurable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(configurable).toEqual(true);

    // set
    Object.defineProperties(obj, {
      id: {
        configurable: false,
      },
    });
    var { configurable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(configurable).toEqual(false);
  });

  it('configurable can be unset using Object.freeze()', () => {
    const obj = {
      id: 1,
    };
    Object.freeze(obj);
    var { configurable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(configurable).toEqual(false);
  });

  it('configurable is set to true when property is added with literal syntax or dot notation', () => {
    const obj = {
      id: 1,
    };
    obj.name = 'John';
    const { configurable: idconfigurable } = Object.getOwnPropertyDescriptor(
      obj,
      'id'
    );
    const { configurable: nameconfigurable } = Object.getOwnPropertyDescriptor(
      obj,
      'name'
    );
    expect(idconfigurable).toEqual(true);
    expect(nameconfigurable).toEqual(true);
  });
});

describe('Testing how to get current status of configurable', () => {
  const obj = {
    id: 1,
  };
  test('Getting configurable attribute value using Object.getOwnPropertyDescriptor()', () => {
    const { configurable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(configurable).toEqual(true);
  });
  test('Getting configurable attribute value using Object.defineProperties()', () => {
    const {
      id: { configurable },
    } = Object.getOwnPropertyDescriptors(obj);
    expect(configurable).toEqual(true);
  });
});

describe('Testing what operations are allowed when configurable is set to true', () => {
  it('should be able to delete property using delete operator', () => {
    const obj = {
      id: 1,
    };
    Object.defineProperty(obj, 'name', {
      configurable: true,
    });
    delete obj.name;
    expect(obj).toEqual({
      id: 1,
    });
    expect(Object.getOwnPropertyNames(obj).includes('name')).not.toBeTruthy();
  });
  it('should be able to change writability of the property', () => {
    const obj = {
      id: 1,
    };
    Object.defineProperty(obj, 'name', {
      configurable: true,
    });

    Object.defineProperty(obj, 'name', {
      writable: false,
    });
    try {
      obj.name = 'Smith';
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should be able to change enumerability of the property', () => {
    const obj = {
      id: 1,
    };
    Object.defineProperty(obj, 'name', {
      configurable: true,
    });
    Object.defineProperty(obj, 'name', {
      enumerable: false,
    });
    expect(Object.keys(obj).includes('name')).not.toBeTruthy();
  });
  it('should be able to change configurability of the property once', () => {
    const obj = {
      id: 1,
    };
    Object.defineProperty(obj, 'name', {
      configurable: true,
    });
    // configurable cannot be changed once it is set to false
    Object.defineProperty(obj, 'name', {
      configurable: false,
    });
  });
});

describe('Testing what operations are not allowed when configurable is set to false', () => {
  const obj = {
    id: 1,
  };
  Object.defineProperty(obj, 'name', {
    configurable: false,
  });
  it('should not be able to delete property using delete operator', () => {
    try {
      delete obj.name;
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should be able to change writability of the property', () => {
    Object.defineProperty(obj, 'name', {
      writable: false,
    });
    const { writable } = Object.getOwnPropertyDescriptor(obj, 'name');
    expect(writable).not.toBeTruthy();
  });
  it('should not be able to change enumerability of the property', () => {
    try {
      Object.defineProperty(obj, 'name', {
        enumerable: false,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('should not be able to change configurability of the property once', () => {
    Object.defineProperty(obj, 'name', {
      configurable: false,
    });
    try {
      // configurable cannot be changed once it is set to false
      Object.defineProperty(obj, 'name', {
        configurable: true,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});
