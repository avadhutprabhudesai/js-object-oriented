export class User {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  getScore() {
    return `Current score for user ${this.name}: ${this.score}`;
  }
  login() {
    return `${this.name} logged in`;
  }
}

export class PaidUser extends User {
  constructor(name, score, initialBalance) {
    super(name, score);
    this.accBalance = initialBalance;
  }

  getScore() {
    return `Current score for paid user ${this.name}: ${this.score}`;
  }

  increaseBalance() {
    this.accBalance += 1;
    return this.accBalance;
  }
}
