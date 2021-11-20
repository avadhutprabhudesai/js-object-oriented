export function User(name, score) {
  this.name = name;
  this.score = score;
}

User.prototype.login = function () {
  return `${this.name} logged in`;
};
User.prototype.getScore = function () {
  return `Current score for user ${this.name}: ${this.score}`;
};

export function PaidUser(name, score, initialBalance) {
  User.call(this, name, score);
  this.accBalance = initialBalance;
}

User.prototype.getScore = function () {
  return `Current score for paid user ${this.name}: ${this.score}`;
};

PaidUser.prototype.increaseBalance = function () {
  this.accBalance += 1;
  return this.accBalance;
};

// These are 3 ways to link prototypes of 2 constructor functions
Object.setPrototypeOf(PaidUser.prototype, User.prototype);
// PaidUser.prototype = Object.create(User.prototype);
// PaidUser.prototype = new User();
