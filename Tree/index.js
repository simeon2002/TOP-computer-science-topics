import { Tree } from "./Tree.js";
const arr = [1, 2, 3, 4, 9, 6, 5, 20];
const tree = new Tree(arr);
console.log(tree.root);
tree.prettyPrint();

console.log("includes the number two", tree.includes(2));
console.log("includes the number five", tree.includes(5));
console.log("includes the number seven", tree.includes(7));

// tree.insert(7);
// tree.insert(15);
// tree.insert(21);

// // case no children
// console.log(tree.root);
// debugger;
// tree.deleteItem(21);
// console.log(tree.root);

// // case one child
// tree.deleteItem(20);
// console.log(tree.root);

// // case two children.

// tree.deleteItem(6);
// console.log(tree.root);

tree.levelOrderForEach((val) => console.log(val));
tree.levelOrderForEachRec((val) => console.log(val));

// testing depth-first call back function
tree.inOrderForEach((val) => console.log(val));

tree.preOrderForEach((val) => console.log(val));
tree.postOrderForEach((value) => console.log(value));
console.log(tree.height(2));
console.log(tree.height(6));
console.log(tree.height(20));
console.log(tree.height(9));
console.log(tree.height(4));
console.log(tree.height(7));

console.log(tree.depth(2));
console.log(tree.depth(4));
console.log(tree.depth(6));
console.log(tree.depth(7));
console.log(tree.depth(5));
console.log(tree.depth(20));
console.log(tree.depth(9));

console.log(tree.isBalanced());
tree.insert(21);
console.log(tree.isBalanced());
console.log(tree.rebalance());
console.log(tree.isBalanced());
