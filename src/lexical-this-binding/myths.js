/* eslint-disable no-unused-vars */
/* eslint-disable @babel/no-invalid-this */
export function foo() {
  this.count++; // this.count !== foo.count
}

foo.count = 0;

export function bar() {
  var a = 2;
  return this.a; //this.a !== var a
}
