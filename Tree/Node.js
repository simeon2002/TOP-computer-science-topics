export class Node {
  data;
  left;
  right;

  constructor(data) {
    this.data = data;
  }

  setLeft(node) {
    this.left = node;
  }

  setRight(node) {
    this.right = node;
  }
}
