import { LinkedList, Node } from "./index.js";

describe("A linked list node", () => {
  it("should exist", () => {
    const node = new Node("data", new Node());
    expect(node).toBeDefined();
  });

  it("should have data and head as propertries", () => {
    const node = new Node("data");

    expect(node.data).toBe("data");
    expect(node.next).toBeNull();
  });
});

describe("LinkedList class", () => {
  let list;

  beforeAll(() => {
    list = new LinkedList();
  });

  it("should have head node property", () => {
    expect(list).toHaveProperty("head");
  });

  describe("append()", () => {
    it("should be able to append a new node as head", () => {
      const newNode = new Node("Node 1");
      list.append(newNode);
      expect(list.head).toBe(newNode);
    });

    it("should be able to append new node to end of the list", () => {
      const newNode = new Node("node 2");
      list.append(newNode);
      expect(list.head.next).toBe(newNode);

      let prevNode = newNode;
      for (let i = 3; i < 6; i++) {
        const newNode = new Node(`Node ${i}`);

        list.append(newNode);

        expect(prevNode.next).toBe(newNode);
        prevNode = newNode;
      }
    });

    it("should return the list itself", () => {
      expect(list.append(new Node("Node 7"))).toBe(list);
    });

    it("should throw a type error if input is not a node", () => {
      expect(() => list.append("not a node")).toThrow(TypeError);
    });
  });

  describe("prepend()", () => {
    it("should add the new node as the new head", () => {
      const newHead = new Node("New head");
      const oldHead = list.head;

      list.prepend(newHead);
      expect(list.head).toBe(newHead);
      expect(list.head.next).toBe(oldHead);
    });

    it("should add two new nodes at the start", () => {
      const newNode1 = new Node("new head 1");
      const newNode2 = new Node("new head 2");

      list.prepend(newNode1);
      list.prepend(newNode2);

      expect(list.head).toBe(newNode2);
      expect(list.head.next).toBe(newNode1);
    });

    it("should return the list itself", () => {
      expect(list.prepend(new Node("test"))).toBe(list);
    });

    it("should throw an error if no instance of Node is inputted", () => {
      expect(() => list.prepend(15)).toThrow(TypeError);
    });
  });

  describe("size()", () => {
    it("should return the size of the linked list", () => {
      expect(list.size()).toBe(10);

      const newList = new LinkedList(new Node("ehad"));
      newList
        .append(new Node("1"))
        .append(new Node("1"))
        .append(new Node("1"))
        .append(new Node("1"))
        .append(new Node("1"));

      expect(newList.size()).toBe(6);
    });

    it("should return 0 if the linked list is empty", () => {
      const list = new LinkedList();
      expect(list.size()).toBe(0);
    });

    it("should return 1 if only the head is present", () => {
      const list = new LinkedList(new Node("head"));
      expect(list.size()).toBe(1);
    });
  });

  describe("head()", () => {
    it("should return the head of the element", () => {
      const headNode = new Node("new node head");
      list.prepend(headNode);
      expect(list.head).toBe(headNode);
    });

    it("should return undefined if no head element is present", () => {
      const list = new LinkedList();
      expect(list.head).not.toBeDefined();
    });
  });

  describe("tail()", () => {
    it("should return the last element in the list", () => {
      const lastNode = new Node("last element");
      list.append(lastNode);
      expect(list.tail()).toBe(lastNode);
    });

    it("should return undefined if the list is empty", () => {
      const emptyList = new LinkedList();
      expect(emptyList.tail()).toBeUndefined();
    });
  });

  describe("at()", () => {
    let nodeAt1, nodeAt3, list;

    beforeAll(() => {
      nodeAt1 = new Node("node 2");
      nodeAt3 = new Node("node 4");
      list = new LinkedList();

      list
        .append(new Node("new node 1"))
        .append(nodeAt1)
        .append(new Node("node 3"))
        .append(nodeAt3)
        .append(new Node("node 5"));
    });

    it("should return the node item at a given index (starting from 0)", () => {
      expect(list.at(1)).toBe(nodeAt1);
      expect(list.at(3)).toBe(nodeAt3);
      expect(list.at(4).data).toBe("node 5");
    });

    it("should return undefined if no node item at that index", () => {
      expect(list.at(6)).toBeUndefined();
    });

    it("should return undefined for empty list", () => {
      expect(new LinkedList().at(0)).toBeUndefined();
    });
  });

  describe("pop()", () => {
    let headNode, newList;

    beforeEach(() => {
      newList = new LinkedList();
      headNode = new Node("head");
      newList.prepend(headNode);
    });

    it("should remove and return the head of the list if list has one element", () => {
      // this is an impure function modifying the head but also returning something, so we have to check list state as well check expected return value!
      expect(newList.head).toBe(headNode);
      expect(newList.pop()).toBe(headNode);
      expect(newList.head).toBeUndefined();
    });

    it("if list has multiple items, should have the next node item as new head", () => {
      const secondNode = new Node(2);
      newList.append(secondNode);
      newList.pop();
      expect(newList.head).toBe(secondNode);
    });

    it("should return undefined if the list is empty", () => {
      expect(new LinkedList().pop()).toBeUndefined();
    });
  });

  describe("contains()", () => {
    it("should return true if value is present in the list", () => {
      expect(list.contains("node 2")).toBeTruthy();
    });

    it("should return false if value is not present in the list", () => {
      expect(list.contains(155)).toBeFalsy();
    });

    it("should return false if the list is empty", () => {
      expect(new LinkedList().contains("dsfsd")).toBeFalsy();
    });
  });

  describe("findIndex", () => {
    let list;

    beforeEach(() => {
      list = new LinkedList();
      list.append(new Node(1));
      list.append(new Node(2));
      list.append(new Node(3));
      list.append(new Node(4));
      list.append(new Node(4));
    });
    it("should return the index for a given value", () => {
      expect(list.findIndex(3)).toBe(2);
    });

    it("should return -1 if the value is not present in the list", () => {
      expect(list.findIndex(10)).toBe(-1);
    });

    it("should return the first index if more than one node match the same value", () => {
      // should return 3 instead of 4 here
      expect(list.findIndex(4)).toBe(3);
    });

    it("should return -1 if list is empty", () => {
      expect(new LinkedList().findIndex(54)).toBe(-1);
    });
  });

  describe("toString()", () => {
    it("should return an empty string when list is empty", () => {
      expect(new LinkedList().toString()).toBe("");
    });

    it("should return the node list in string format", () => {
      const list = new LinkedList();
      list.append(new Node(1));
      list.append(new Node(2));
      list.append(new Node(5));
      list.append(new Node(5));

      expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 5 ) -> ( 5 ) -> null");
    });
  });

  describe("insertAt(node, idx)", () => {
    let nodeToInsert, nodeBefore, nodeAfter, list;
    beforeEach(() => {
      list = new LinkedList();
      nodeToInsert = new Node(1);
      nodeBefore = new Node(2);
      nodeAfter = new Node(3);
      list.append(new Node("head")).append(nodeBefore).append(nodeAfter);
    });

    it("should insert a given node at the given index", () => {
      expect(list.findIndex(3)).toBe(2);
      expect(list.findIndex(nodeToInsert.data)).toBe(-1);

      list.insertAt(nodeToInsert, 2);
      expect(list.findIndex(nodeToInsert.data)).toBe(2);
      expect(list.findIndex(nodeBefore.data)).toBe(1);
      expect(list.findIndex(nodeAfter.data)).toBe(3);
    });

    it("should insert the node as head if the list is empty regardless of the index number", () => {
      const list = new LinkedList();
      list.insertAt(nodeToInsert, 3);
      expect(list.head).toBe(nodeToInsert);
      list.pop();

      expect(list.head).toBeUndefined();
      list.insertAt(nodeToInsert, -23);
      expect(list.head).toBe(nodeToInsert);
    });

    it("should throw a range error when index is < 0 or above the size", () => {
      expect(() => list.insertAt(nodeToInsert, 3)).toThrow(RangeError);
      expect(() => list.insertAt(nodeToInsert, -3)).toThrow(RangeError);
    });

    it("should throw a range error when index is not a number", () => {
      expect(() => list.insertAt(nodeToInsert, "test")).toThrow(RangeError);
    });

    it("should throw a type error if node is not Node type", () => {
      expect(() => list.insertAt("test", 2)).toThrow(TypeError);
    });
  });

  describe("removeAt()", () => {
    let nodetoRemove, nodeBefore, nodeAfter, list;
    beforeEach(() => {
      list = new LinkedList();
      nodetoRemove = new Node(1);
      nodeBefore = new Node(2);
      nodeAfter = new Node(3);
      list
        .append(new Node("head"))
        .append(nodeBefore)
        .append(nodetoRemove)
        .append(nodeAfter);
    });

    it("should return a range error if index is out of bounds", () => {
      expect(() => list.removeAt(5)).toThrow(RangeError);
      expect(() => list.removeAt(-1)).toThrow(RangeError);
    });

    it("should return the node to be removed", () => {
      expect(list.removeAt(2).data).toBe(nodetoRemove.data);
      expect(list.at(1).next).toBe(nodeAfter)
      expect(list.at(2)).toBe(nodeAfter)
    });
  });
});
