export function User(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function (greetings = 'Hi') {
    return `${greetings}, ${this.name}`;
  };
}

export function Employee(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function (greetings = 'Hi') {
    return `${greetings}, ${this.name}`;
  };
  return {
    name,
    age,
    print: function () {
      return name;
    },
  };
}
