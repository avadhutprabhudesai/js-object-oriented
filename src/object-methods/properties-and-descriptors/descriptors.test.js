/**
 * Descriptors
 *
 * How to retrieve descriptors of
 * . Own enumerable + non-enumerable properties of the object
 * . Inherited properties of the object
 *
 * When using descriptor to define a property, what if
 * . descriptor is applied several times with different attributes are updated at each time
 *
 * Behavior with Object.assign
 * . Does Object.assign copy descriptors as well?
 * .
 */

describe('Testing property descriptor retrieval', () => {
  const obj = Object.defineProperties(
    {},
    {
      id: {
        value: 1,
        enumerable: false,
        writable: false,
        configurable: false,
      },
      name: {
        value: 'Smith',
        enumerable: true,
        writable: true,
        configurable: true,
      },
    }
  );

  Object.setPrototypeOf(obj, {
    inheritedProp: 'This prop is inherited',
  });

  test('Object.getOwnPropertyDescriptor()/Object.getOwnPropertyDescriptors() does not retrieve descriptor of a property which does not exist directly on the object', () => {
    // Own properties are found
    const { value } = Object.getOwnPropertyDescriptor(obj, 'name');
    const {
      name: { value: nameValue },
    } = Object.getOwnPropertyDescriptors(obj);
    expect(value).toBe('Smith');
    expect(nameValue).toBe('Smith');

    // Undefined is returned for properties on the prototype chain
    expect(
      Object.getOwnPropertyDescriptor(obj, 'inheritedProp')
    ).toBeUndefined();
    expect(Object.getOwnPropertyDescriptors(obj).inheritedProp).toBeUndefined();
  });
  test('Object.getOwnPropertyDescriptor()/Object.getOwnPropertyDescriptors() retrieves descriptors of a property irrespective of the state of the attributes on them', () => {
    const obj = Object.defineProperties(
      {},
      {
        nonWritable: {
          value: 'nonwritable',
          writable: false,
        },
        nonEnumerable: {
          value: 'nonEnumerable',
          enumerable: false,
        },
        nonConfigurable: {
          value: 'nonConfigurable',
          configurable: false,
        },
      }
    );

    const { nonWritable, nonConfigurable, nonEnumerable } =
      Object.getOwnPropertyDescriptors(obj);
    expect(nonWritable).toBeTruthy();
    expect(nonEnumerable).toBeTruthy();
    expect(nonConfigurable).toBeTruthy();
  });
});

describe('Testing descriptor partial application', () => {
  test('descriptor merges new attribute config with old attribute config', () => {
    const obj = {
      id: 1,
      name: 'John',
      profile: 'Developer',
    };
    Object.defineProperty(obj, 'id', {
      writable: false,
    });
    expect(Object.getOwnPropertyDescriptor(obj, 'id').writable).toBeFalsy();
    expect(Object.getOwnPropertyDescriptor(obj, 'id').enumerable).toBeTruthy();
    expect(
      Object.getOwnPropertyDescriptor(obj, 'id').configurable
    ).toBeTruthy();

    Object.defineProperty(obj, 'id', {
      enumerable: false,
    });

    expect(Object.getOwnPropertyDescriptor(obj, 'id').writable).toBeFalsy();
    expect(Object.getOwnPropertyDescriptor(obj, 'id').enumerable).toBeFalsy();
    expect(
      Object.getOwnPropertyDescriptor(obj, 'id').configurable
    ).toBeTruthy();
  });
});

describe('Testing Object.assign() with descriptors', () => {
  test('Object.assign() does not copy descriptors of the source properties', () => {
    const obj = Object.defineProperties(
      {},
      {
        id: {
          value: 1,
          writable: false,
          enumerable: true,
          configurable: true,
        },
        name: {
          value: 'Smith',
          writable: true,
          enumerable: true,
          configurable: false,
        },
      }
    );

    const copy = Object.assign({}, obj);

    expect(Object.getOwnPropertyDescriptor(copy, 'id').writable).toBeTruthy();
    expect(
      Object.getOwnPropertyDescriptor(copy, 'name').configurable
    ).toBeTruthy();
  });
});
