import { Node } from "./Node.js";
import { Tree } from "./Tree.js";

describe("Node", () => {
  it("should set the data property upon construction", () => {
    const value = "dataval";
    const node = new Node(value);
    expect(node.data).toBe(value);
  });

  it("should set the left node with setLeft()", () => {
    const leftNode = new Node("test");
    const node = new Node("value");
    node.setLeft(leftNode);
    expect(node.left).toBe(leftNode);
  });

  it("should set the right node with setRight()", () => {
    const rightNode = new Node("test");
    const node = new Node("value");
    node.setRight(rightNode);
    expect(node.right).toBe(rightNode);
  });
});

describe("Tree", () => {
  it("new Tree(arr) construction", () => {
    const arr = [1, 2, 3];
    const tree = new Tree(arr);
    console.log(tree.root);
  });
});
