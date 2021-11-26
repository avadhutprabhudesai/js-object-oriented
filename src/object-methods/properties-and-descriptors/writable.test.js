/* eslint-disable no-redeclare */

/**
 * How to set/unset writable descriptor attribute
 * . Using Object.defineProperty()
 * . Using Object.defineProperties()
 * . Using Object.freeze()
 * . Writable is set to true when property is added with literal syntax or dot notation
 *
 * How to get the current status of this descriptor prop
 * . Using Object.getOwnPropertyDescriptor()
 * . Using Object.getOwnPropertyDescriptors()
 *
 * When set to true, it
 * . can assign/change value to property using =
 * . can assign/change value to property Object.defineProperty()
 * . can assign/change value to property Object.defineProperties()
 * . can override this property value in the target object of Object.assign
 * . can assign/modify property value when an object is sealed.
 *
 * When set to false
 * . cannot assign/change value to property using =
 * . cannot assign/change value to property Object.defineProperty()
 * . cannot assign/change value to property Object.defineProperties()
 * . cannot override this property value in the target object of Object.assign
 * . cannot assign/modify property value when an object is sealed.
 *
 */

describe('Testing how to set/unset writable', () => {
  it('writable can be set/unset using Object.defineProperty()', () => {
    const obj = {
      id: 1,
    };
    // set
    Object.defineProperty(obj, 'id', {
      writable: true,
    });
    var { writable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(writable).toEqual(true);

    // unset
    Object.defineProperty(obj, 'id', {
      writable: false,
    });
    var { writable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(writable).toEqual(false);
  });

  it('writable can be set/unset using Object.defineProperties()', () => {
    const obj = {
      id: 1,
    };

    // set
    Object.defineProperties(obj, {
      id: {
        writable: false,
      },
    });
    var { writable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(writable).toEqual(false);

    // unset
    Object.defineProperties(obj, {
      id: {
        writable: true,
      },
    });
    var { writable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(writable).toEqual(true);
  });

  it('writable can be unset using Object.freeze()', () => {
    const obj = {
      id: 1,
    };
    Object.freeze(obj);
    var { writable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(writable).toEqual(false);
  });

  it('Writable is set to true when property is added with literal syntax or dot notation', () => {
    const obj = {
      id: 1,
    };
    obj.name = 'John';
    const { writable: idWritable } = Object.getOwnPropertyDescriptor(obj, 'id');
    const { writable: nameWritable } = Object.getOwnPropertyDescriptor(
      obj,
      'name'
    );
    expect(idWritable).toEqual(true);
    expect(nameWritable).toEqual(true);
  });
});

describe('Testing how to get current status of writable', () => {
  const obj = {
    id: 1,
  };
  test('Getting writable attribute value using Object.getOwnPropertyDescriptor()', () => {
    const { writable } = Object.getOwnPropertyDescriptor(obj, 'id');
    expect(writable).toEqual(true);
  });
  test('Getting writable attribute value using Object.defineProperties()', () => {
    const {
      id: { writable },
    } = Object.getOwnPropertyDescriptors(obj);
    expect(writable).toEqual(true);
  });
});

describe('Testing what operations are allowed when writable property is set', () => {
  var obj = {};
  beforeEach(() => {
    Object.defineProperty(obj, 'name', {
      value: 'John',
      writable: true,
    });
  });
  it('should be able to assign value using = operator', () => {
    obj.name = 'Smith';
    expect(obj.name).toBe('Smith');
  });
  it('should be able to modify value using Object.defineProperty()', () => {
    Object.defineProperty(obj, 'name', {
      value: 'Dona',
      writable: true,
    });
    expect(obj.name).toBe('Dona');
  });
  it('should be able to modify value using Object.defineProperties()', () => {
    Object.defineProperties(obj, {
      name: {
        value: 'Dona',
        writable: true,
      },
    });
    expect(obj.name).toBe('Dona');
  });
  it('should be able to override value using Object.assign()', () => {
    Object.assign(obj, {
      name: 'Mary',
    });
    expect(obj.name).toBe('Mary');
  });
  it('should be able to modify value using =, . or defineProperty when the object is non-extensible', () => {
    Object.preventExtensions(obj);
    obj.name = 'Samantha';
    expect(obj.name).toBe('Samantha');
    Object.defineProperty(obj, 'name', {
      value: 'Johny',
    });
    expect(obj.name).toBe('Johny');
  });
  it('should be able to modify value using =, . or defineProperty when the object is sealed', () => {
    Object.seal(obj);
    obj.name = 'Will';
    expect(obj.name).toBe('Will');
  });
});

describe('Testing what operations produce TypeError in strict mode when writable property is unset', () => {
  var obj = {};
  beforeEach(() => {
    Object.defineProperty(obj, 'name', {
      value: 'John',
      writable: false,
    });
  });
  it('TypeError in strict mode while assigning value using = operator', () => {
    try {
      obj.name = 'Smith';
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('TypeError in strict mode while modifying value using Object.defineProperty()', () => {
    try {
      Object.defineProperty(obj, 'name', {
        value: 'Dona',
        writable: true,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('TypeError in strict mode while modifying value using Object.defineProperties()', () => {
    try {
      Object.defineProperties(obj, {
        name: {
          value: 'Dona',
          writable: true,
        },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('TypeError in strict mode while overriding value using Object.assign()', () => {
    try {
      Object.assign(obj, {
        name: 'Mary',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('TypeError in strict mode while modifying value using =, . or defineProperty when the object is non-extensible', () => {
    try {
      Object.preventExtensions(obj);
      obj.name = 'Samantha';
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
  it('TypeError in strict mode while modifying value using =, . or defineProperty when the object is sealed', () => {
    try {
      Object.seal(obj);
      obj.name = 'Will';
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});

describe('Testing writable flag of built in properties on Function', () => {
  function foo(a) {}
  it('prototype is the only writable property on Function', () => {
    const { length, name, prototype } = Object.getOwnPropertyDescriptors(foo);
    expect(length.writable).toEqual(false);
    expect(name.writable).toEqual(false);
    expect(prototype.writable).toEqual(true);
  });
  it('we can change prototype of a function since it is writable', () => {
    foo.prototype = {
      name: 'new prototype',
    };
    const { prototype } = Object.getOwnPropertyDescriptors(foo);
    expect(prototype.value.name).toBe('new prototype');
  });
});
