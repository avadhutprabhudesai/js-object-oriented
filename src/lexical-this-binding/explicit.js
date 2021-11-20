/* eslint-disable @babel/no-invalid-this */
export function greet(greeting = 'Hi') {
  return `${greeting}, ${this.name}`;
}

export function hardBind(fn, context) {
  return function (...args) {
    return fn.apply(context, args);
  };
}

export function asyncCall(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, 100);
  });
}
