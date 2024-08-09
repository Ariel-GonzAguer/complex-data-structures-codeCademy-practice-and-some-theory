const getParent = current => Math.floor((current / 2));
const getLeft = current => current * 2;
const getRight = current => current * 2 + 1;

console.log(getParent(10))
console.log(getLeft(10))
console.log(getRight(10))