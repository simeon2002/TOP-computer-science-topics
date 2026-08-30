export class LinkedList {
  #head;

  constructor(value) {
    if (value) {
      this.#head = new Node(value);
    }
  }

  get head() {
    return this.#head;
  }

  append(data) {
    // if (!(node instanceof Node))
    //   throw new TypeError("Input should of type Node");
    const newNode = new Node(data)


    // set head if null
    if (!this.#head) {
      this.#head = newNode;
      return this;
    }

    let nextNode = this.#head;
    while (nextNode) {
      if (!this.#hasNextNode(nextNode)) {
        nextNode.next = newNode;
        break;
      }

      nextNode = nextNode.next;
    }

    return this;
  }

  prepend(value) {
    const node = new Node(value);
    console.log(node);
    
    node.next = this.#head;
    this.#head = node;
    return this;
  }

  size() {
    if (!this.#head) return 0;

    let nodeItem = this.#head;
    let counter = 0;
    while (nodeItem) {
      counter++;

      if (!this.#hasNextNode(nodeItem)) return counter;

      nodeItem = nodeItem.next;
    }
  }

  tail() {
    if (!this.#head) return;

    let nodeItem = this.#head;
    while (nodeItem) {
      if (!nodeItem.next) break;

      nodeItem = nodeItem.next;
    }

    return nodeItem;
  }

  at(idx) {
    if (!this.#head) return;

    let itemCounter = 0;
    let nodeItem = this.#head;

    while (nodeItem) {
      
      if (idx === itemCounter) {
        break;
      }
      
      if (!this.#hasNextNode(nodeItem)) return;
      itemCounter++;
      nodeItem = nodeItem.next;
    }

    return nodeItem;
  }

  pop() {
    if (!this.#head) return;
    const headNode = this.#head;

    if (this.#head.next) this.#head = this.#head.next;
    else this.#head = undefined;

    return headNode;
  }

  contains(value) {
    if (!this.#head) return false;

    let nodeItem = this.#head;
    while (nodeItem) {
      if (nodeItem.data === value) return true;

      if (!this.#hasNextNode(nodeItem)) break;
      nodeItem = nodeItem.next;
    }

    return false;
  }

  findIndex(value) {
    if (!this.#head) return -1;

    let nodeItem = this.#head;
    let idx = 0;
    while (nodeItem) {
      if (nodeItem.data === value) return idx;

      if (!this.#hasNextNode(nodeItem)) break;

      idx++;
      nodeItem = nodeItem.next;
    }

    return -1;
  }

  toString() {
    if (!this.#head) return "";

    let str = "";
    let nodeItem = this.#head;
    while (nodeItem) {
      str += `( ${nodeItem.data} ) -> `;

      if (!this.#hasNextNode(nodeItem)) {
        str += "null";
      }

      nodeItem = nodeItem.next;
    }

    return str;
  }

  insertAt(value, idx) {
    const newNode = new Node(value)
    if (!this.#head) {
      this.#head = newNode;
      return;
    }

    if (!Number.isFinite(idx))
      throw new TypeError("Index is not a number")

    if (!this.#idxWithinListBounds(idx))
      throw new RangeError("idx is out of bounds!");

    let nodeItem = this.#head;
    let itemIdx = 0;
    while (nodeItem) {
      if (itemIdx === idx - 1) {
        const nextNode = nodeItem.next;
        nodeItem.next = newNode;
        newNode.next = nextNode;
        break;
      }

      nodeItem = nodeItem.next;
      itemIdx++;
    }
  }

  removeAt(idx) {
    if (!this.#idxWithinListBounds(idx)) {
      throw new RangeError("Index out of bounds");
    }

    if (idx === 0) return this.pop();

    let nodeItem = this.#head;
    let removedNode;
    let itemIndex = 0;
    while (nodeItem) {
      if (itemIndex === idx - 1) {
        removedNode = nodeItem.next
        nodeItem.next = removedNode.next
        
      }

      itemIndex++;
      nodeItem = nodeItem.next;
    }

    return removedNode;
  }

  #idxWithinListBounds(idx) {
    return idx >= 0 && idx < this.size();
  }

  #hasNextNode(node) {
    return Boolean(node.next);
  }
}

export class Node {
  next;
  data;

  constructor(data) {
    this.data = data;
  }
}


// example uses class syntax - adjust as necessary
const list = new LinkedList();

list.append(new Node("dog"))
list.append(new Node("cat"))
list.append(new Node("parrot"))
list.append(new Node("hamster"))
list.append(new Node("snake"))
list.append(new Node("turtle"))
console.log(list.toString());