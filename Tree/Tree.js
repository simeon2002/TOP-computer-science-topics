import { Node } from "./Node.js";

export class Tree {
  root;

  constructor(arr = []) {
    const sortedArr = arr.sort((a, b) => a - b);
    this.constructTree(sortedArr);
  }

  constructTree(arr) {
    if (arr.length === 1) {
      const node = new Node(arr[0]);
      node.setLeft(null);
      node.setRight(null);
      return node;
    }

    if (arr.length === 0) {
      return null;
    }

    const idxMiddle = Math.floor((arr.length - 1) / 2);
    const node = new Node(arr[idxMiddle]);
    node.setLeft(this.constructTree(arr.slice(0, idxMiddle)));
    node.setRight(this.constructTree(arr.slice(idxMiddle + 1, arr.length)));

    this.root = node;
    return node;
  }

  prettyPrint(node = this.root) {
    if (node === null) {
      return;
    }

    console.log(`Node:`, node);
    this.prettyPrint(node.left);
    this.prettyPrint(node.right);
  }

  includes(value) {
    let node = this.root;

    while (node !== null) {
      console.log(node);

      if (node.data === value) return true;
      if (node?.data > value) node = node?.left ?? null;
      if (node?.data < value) node = node?.right ?? null;
    }

    return false;
  }

  insert(value) {
    let node = this.root;

    while (true) {
      if (value === node.data) return;
      if (value > node.data) {
        if (!node.right) {
          const newNode = new Node(value);
          newNode.right = null;
          newNode.left = null;
          node.right = newNode;
          return;
        }

        node = node.right;
      }

      if (value < node.data) {
        if (!node.left) {
          const newNode = new Node(value);
          newNode.right = null;
          newNode.left = null;
          node.left = newNode;
          return;
        }

        node = node.left;
      }
    }
  }

  deleteItem(value) {
    let node = this.root;
    let parentNode = this.root;

    while (true) {
      if (value === node.data) {
        if (!node.left && !node.right)
          this.deleteCaseNoChildren(node, parentNode);
        if ((!node.left && node.right) || (node.left && !node.right)) {
          this.deleteCaseOneChild(node, parentNode);
        }

        if (node.left && node.right) {
          this.deleteCaseTwoChildren(node, parentNode);
        }
        break;
      }

      parentNode = node;
      if (value > node.data) node = node.right;
      if (value < node.data) node = node.left;
    }
  }

  deleteCaseNoChildren(node, parentNode) {
    if (parentNode.right === node) parentNode.right = null;
    if (parentNode.left === node) parentNode.left = null;
  }

  deleteCaseOneChild(node, parentNode) {
    if (parentNode.right === node) parentNode.right = node?.left ?? node.right;
    if (parentNode.left === node) parentNode.left = node?.left ?? node.right;
  }

  deleteCaseTwoChildren(node, parentNode) {
    const successorNode = this.getInOrderSuccessor(node.right);

    if (parentNode?.right === node) parentNode.right = successorNode;
    if (parentNode?.left === node) parentNode.left = successorNode;

    successorNode.left = node.left;
    successorNode.right = node.right;
  }

  getInOrderSuccessor(node) {
    if (node.left === null) return node;

    const successorNode = this.getInOrderSuccessor(node.left);

    if (node.left.left === null) {
      node.left = null; // remove previous nodes' connection to this node.
    }

    return successorNode;
  }

  levelOrderForEach(cb) {
    if (!cb) throw new Error("Please provide a callback function");

    let node = this.root;
    const queue = [];
    queue.push(node);

    while (queue.length !== 0) {
      node = queue.shift();
      if (node?.left) queue.push(node.left);
      if (node?.right) queue.push(node.right);
      cb(node.data);
    }
  }

  levelOrderForEachRec(cb) {
    const forEachNode = (cb, queue) => {
      if (queue.length === 0) return;

      const node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
      cb(node.data);
      forEachNode(cb, queue);
    };
    const queue = [];
    queue.push(this.root);
    forEachNode(cb, queue);
  }

  inOrderForEach(cb, node = this.root) {
    // throw error if no callback provided
    if (!cb) throw Error("please provide a callback function");

    // base case -> node is null
    if (!node) return;

    // recursive case -> in order traversal
    this.inOrderForEach(cb, node.left);
    cb(node.data);
    this.inOrderForEach(cb, node.right);
  }

  postOrderForEach(cb, node = this.root) {
    if (!cb) throw "Please provide a callback";

    if (!node) return;

    this.postOrderForEach(cb, node.left);
    this.postOrderForEach(cb, node.right);
    cb(node.data);
  }

  preOrderForEach(cb, node = this.root) {
    if (!cb) throw "Please provide a callback";

    if (!node) return;

    cb(node.data);
    this.preOrderForEach(cb, node.left);
    this.preOrderForEach(cb, node.right);
  }

  height(value) {
    // the node has two different paths connected to it.
    // however, there are many are many different was possible paths can be taken.
    // so i have to explore each path and determine the loonger path to the leaf node.

    const node = this.getNode(value);
    if (!node) return;
    return this.getHeight(node);
  }

  getHeight(node) {
    if (!node?.right && !node?.left) return 0;

    const leftHeight = this.getHeight(node.left) + 1;
    const rightHeight = this.getHeight(node.right) + 1;

    return Math.max(leftHeight, rightHeight);
  }

  getNode(value, node = this.root) {
    if (node === null) return;
    if (node.data === value) return node;

    const result =
      this.getNode(value, node.left) ?? this.getNode(value, node.right);
    return result;
  }

  depth(value) {
    // this time using breath-first search to determine it (height was determined iteratively instead)

    const queue = [this.root];
    let firstNodeOfLevel = this.root.left;
    let depth = 0;

    while (queue.length !== 0) {
      const node = queue.shift();
      if (node === firstNodeOfLevel) {
        firstNodeOfLevel = node.left ?? node.right;
        depth++;
      }

      if (!firstNodeOfLevel) firstNodeOfLevel = node.left ?? node.right;

      if (node.data === value) return depth;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return;
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    if (!node.left && !node.right) return true;

    const leftBalanced = this.isBalanced(node.left);
    const rightBalanced = this.isBalanced(node.right);
    let heightLeft, heightRight;

    if (node.left?.data) heightLeft = this.height(node.left.data);
    else heightLeft = 0;

    if (node.right?.data) heightRight = this.height(node.right.data);
    else heightRight = 0;

    return (
      Math.abs(heightLeft - heightRight) <= 1 && leftBalanced && rightBalanced
    );
  }

  rebalance() {
    if (this.isBalanced()) return;

    // Extract all nodes to create new array
    const arr = this.getTreeAsArray();
    console.log(arr);

    // sort array
    const sortedArr = arr.sort((a, b) => a - b);

    // create new tree
    this.constructTree(sortedArr);
  }

  getTreeAsArray(node = this.root, arr = []) {
    if (!node) return;

    this.getTreeAsArray(node.left, arr);
    arr.push(node.data);
    this.getTreeAsArray(node.right, arr);

    return arr;
  }

  get root() {
    return this.root;
  }
}
