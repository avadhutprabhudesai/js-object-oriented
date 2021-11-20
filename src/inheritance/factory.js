/* eslint-disable @babel/new-cap */
export function User(name, score) {
  var user = Object.create(userStore);
  user.name = name;
  user.score = score;
  return user;
}

export const userStore = {
  login: function () {
    return `${this.name} logged in`;
  },
  getScore: function () {
    return `Current score for user ${this.name}: ${this.score}`;
  },
};

export function PaidUser(name, score, initialBalance) {
  var paidUser = User(name, score);
  Object.setPrototypeOf(paidUser, paidUserStore);
  paidUser.accBalance = initialBalance;
  return paidUser;
}

export const paidUserStore = {
  getScore: function () {
    return `Current score for paid user ${this.name}: ${this.score}`;
  },
  increaseBalance: function () {
    this.accBalance += 1;
    return this.accBalance;
  },
};

Object.setPrototypeOf(paidUserStore, userStore);
