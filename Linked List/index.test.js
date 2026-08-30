import { LinkedList, Node } from "./index.js";

describe("A linked list node", () => {
  it("should exist", () => {
    const node = new Node("data", new Node());
    expect(node).toBeDefined();
  });

  it("should have data and head as propertries", () => {
    const node = new Node("data");

    expect(node.data).toBe("data");
    expect(node.next).toBeUndefined();
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
      // const newNode = new Node("Node 1");
      list.append("Node 1");
      expect(list.head.data).toBe("Node 1");
    });

    it("should be able to append new node to end of the list", () => {
      const newNode = "node 2";
      list.append(newNode);
      expect(list.head.next.data).toBe(newNode);

      let prevNode = newNode;
      for (let i = 3; i < 6; i++) {
        const newNode = `Node ${i}`;

        list.append(newNode);
      }
    });

    it("should return the list itself", () => {
      expect(list.append("Node 7")).toBe(list);
    });
  });

  

  describe("prepend()", () => {
    it("should add the new node as the new head", () => {
      const newHead = "New head";
      const oldHead = list.head;

      list.prepend(newHead);
      expect(list.head.data).toBe(newHead);
      expect(list.head.next).toBe(oldHead);
    });

    it("should add two new nodes at the start", () => {
      const newNode1 = "new head 1";
      const newNode2 = "new head 2";

      list.prepend(newNode1);
      list.prepend(newNode2);

      expect(list.head.data).toBe(newNode2);
      expect(list.head.next.data).toBe(newNode1);
    });

    it("should return the list itself", () => {
      expect(list.prepend("test")).toBe(list);
    });
  });

  describe("size()", () => {
    it("should return the size of the linked list", () => {
      expect(list.size()).toBe(10);

      const newList = new LinkedList("ehad");
      newList
        .append("1")
        .append("1")
        .append("1")
        .append("1")
        .append("1");

      expect(newList.size()).toBe(6);
    });

    it("should return 0 if the linked list is empty", () => {
      const list = new LinkedList();
      expect(list.size()).toBe(0);
    });

    it("should return 1 if only the head is present", () => {
      const list = new LinkedList("head");
      expect(list.size()).toBe(1);
    });
  });

  describe("head()", () => {
    it("should return the head of the element", () => {
      const headNode = "new node head";
      list.prepend(headNode);
      expect(list.head.data).toBe(headNode);
    });

    it("should return undefined if no head element is present", () => {
      const list = new LinkedList();
      expect(list.head).not.toBeDefined();
    });
  });

  describe("tail()", () => {
    it("should return the last element in the list", () => {
      const lastNode = "last element";
      list.append(lastNode);
      expect(list.tail().data).toBe(lastNode);
    });

    it("should return undefined if the list is empty", () => {
      const emptyList = new LinkedList();
      expect(emptyList.tail()).toBeUndefined();
    });
  });

  describe("at()", () => {
    let nodeAt1, nodeAt3, list;

    beforeAll(() => {
      nodeAt1 = "node 2";
      nodeAt3 = "node 4";
      list = new LinkedList();

      list
        .append("new node 1")
        .append(nodeAt1)
        .append("node 3")
        .append(nodeAt3)
        .append("node 5");
    });

    it("should return the node item at a given index (starting from 0)", () => {
      expect(list.at(1).data).toBe(nodeAt1);
      expect(list.at(3).data).toBe(nodeAt3);
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
      headNode = "head";
      newList.prepend(headNode);
    });

    it("should remove and return the head of the list if list has one element", () => {
      // this is an impure function modifying the head but also returning something, so we have to check list state as well check expected return value!
      expect(newList.head.data).toBe(headNode);
      expect(newList.pop().data).toBe(headNode);
      expect(newList.head).toBeUndefined();
    });

    it("if list has multiple items, should have the next node item as new head", () => {
      const secondNode = 2;
      newList.append(secondNode);
      newList.pop();
      expect(newList.head.data).toBe(secondNode);
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
      list.append(1);
      list.append(2);
      list.append(3);
      list.append(4);
      list.append(4);
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
      list.append(1);
      list.append(2);
      list.append(5);
      list.append(5);

      expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 5 ) -> ( 5 ) -> null");
    });
  });

  describe("insertAt(node, idx)", () => {
    let nodeToInsert, nodeBefore, nodeAfter, list;
    beforeEach(() => {
      list = new LinkedList();
      nodeToInsert = 1;
      nodeBefore = 2;
      nodeAfter = 3;
      list.append("head").append(nodeBefore).append(nodeAfter);
    });

    it("should insert a given node at the given index", () => {
      expect(list.findIndex(3)).toBe(2);
      expect(list.findIndex(nodeToInsert)).toBe(-1);

      list.insertAt(nodeToInsert, 2);
      expect(list.findIndex(nodeToInsert)).toBe(2);
      expect(list.findIndex(nodeBefore)).toBe(1);
      expect(list.findIndex(nodeAfter)).toBe(3);
    });

    it("should insert the node as head if the list is empty regardless of the index number", () => {
      const list = new LinkedList();
      list.insertAt(nodeToInsert, 3);
      expect(list.head.data).toBe(nodeToInsert);
      list.pop();

      expect(list.head).toBeUndefined();
      list.insertAt(nodeToInsert, -23);
      expect(list.head.data).toBe(nodeToInsert);
    });

    it("should throw a range error when index is < 0 or above the size", () => {
      expect(() => list.insertAt(nodeToInsert, 3)).toThrow(RangeError);
      expect(() => list.insertAt(nodeToInsert, -3)).toThrow(RangeError);
    });

    it("should throw a type error when index is not a number", () => {
      expect(() => list.insertAt(nodeToInsert, "test")).toThrow(TypeError);
    });

    it("should throw a type error if value is not a number", () => {
      expect(() => list.insertAt("test", 5)).toThrow(RangeError);
    });
    
  });

  // describe("removeAt()", () => {
  //   let nodetoRemove, nodeBefore, nodeAfter, list;
  //   beforeEach(() => {
  //     list = new LinkedList();
  //     nodetoRemove = new Node(1);
  //     nodeBefore = new Node(2);
  //     nodeAfter = new Node(3);
  //     list
  //       .append(new Node("head"))
  //       .append(nodeBefore)
  //       .append(nodetoRemove)
  //       .append(nodeAfter);
  //   });

  //   it("should return a range error if index is out of bounds", () => {
  //     expect(() => list.removeAt(5)).toThrow(RangeError);
  //     expect(() => list.removeAt(-1)).toThrow(RangeError);
  //   });

  //   it("should return the node to be removed", () => {
  //     expect(list.removeAt(2).data).toBe(nodetoRemove.data);
  //     expect(list.at(1).next).toBe(nodeAfter)
  //     expect(list.at(2)).toBe(nodeAfter)
  //   });
  // });
});
