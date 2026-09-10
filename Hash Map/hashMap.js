import { LinkedList } from "../Linked List/index.js";
import murmur from "murmurhash-js";

export class HashMap {
  #loadFactor;
  #capacity;
  #hashSeed = Math.random();
  #buckets;

  constructor(loadfactor, capacity) {
    this.#loadFactor = loadfactor ?? 0.75;
    this.#capacity = capacity ?? 16;
    this.#buckets = [];
    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets[i] = new LinkedList();
    }
  }

  get loadFactor() {
    return this.#loadFactor;
  }

  get capacity() {
    return this.#capacity;
  }

  get buckets() {
    return this.#buckets;
  }

  hash(key) {
    if (typeof key !== "string") {
      throw new TypeError("Key should be of type string");
    }

    const hash = murmur.murmur3(key, this.#hashSeed);

    return hash % this.#capacity;
  }

  set(key, value) {
    if (typeof key !== "string") {
      throw new TypeError("Key should be of type string");
    }

    const bucketIdx = this.hash(key);
    const bucket = this.#buckets[bucketIdx];

    const bucketItemIdx = this.getIdxBucketItem(bucket, key);

    if (bucketItemIdx === -1) {
      bucket.append({ key, value });
      if (this.isAtLoadCapacity()) {
        console.log(this.#buckets.map((bucket) => bucket.size()));

        this.increaseBucketsCapacity();
        console.log(this.#buckets.map((bucket) => bucket.size()).length);
      }
    } else {
      bucket.removeAt(bucketItemIdx);
      bucket.append({ key, value });
    }
  }

  get(key) {
    if (typeof key !== "string")
      throw new TypeError("key should be of type string");

    const bucketIdx = this.hash(key);
    /** @type {LinkedList} */
    const bucket = this.#buckets[bucketIdx];
    const bucketItemIdx = this.getIdxBucketItem(bucket, key);

    if (bucketItemIdx === -1) return;

    return bucket.at(bucketItemIdx).value;
  }

  remove(key) {
    /** @type {LinkedList} */
    const bucket = this.#buckets[this.hash(key)];
    const idxItemToRemove = this.getIdxBucketItem(bucket, key);

    if (idxItemToRemove === -1) return false;

    bucket.removeAt(idxItemToRemove);
    return true;
  }

  length() {
    const length = this.#buckets.reduce(
      (length, bucket) => length + bucket.size(),
      0,
    );
    return length;
  }

  clear() {
    this.#buckets.forEach((bucket) => bucket.clear());
  }

  keys() {
    const keys = this.getItemsArr().map((item) => item.key);

    return keys;
  }

  values() {
    const values = this.getItemsArr().map((item) => item.value);

    return values;
  }

  entries() {
    const items = this.getItemsArr().map(({ key, value }) => [key, value]);
    return items;
  }

  getItemsArr() {
    const items = this.#buckets.flatMap((bucket) => {
      const itemsArr = [];
      for (let i = 0; i < bucket.size(); i++) {
        itemsArr.push(bucket.at(i));
      }

      return itemsArr;
    });

    return items;
  }

  getIdxBucketItem(bucket, key) {
    const itemIdx = bucket.findIndex(key, (bucketItem, key) => {
      return key === bucketItem.key;
    });

    return itemIdx;
  }

  increaseBucketsCapacity() {
    this.#capacity *= 2;

    const entries = this.entries();
    this.#buckets = [];
    let idx = 0;
    while (this.#buckets.length < this.#capacity) {
      this.#buckets[idx] = new LinkedList();
      idx++;
    }

    entries.forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  isAtLoadCapacity() {
    const loadCapacity = Math.ceil(this.#capacity * this.#loadFactor);

    return this.length() > loadCapacity;
  }
}

const test = new HashMap(); // or HashMap() if using a factory
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(`Length: ${test.length()} and capacity: ${test.capacity}`);
// test.set("kite", "yellow");
test.set("lion", "brown");
test.set("kite", "pink");
test.set("jacket", "blue");
console.log(`Length: ${test.length()} and capacity: ${test.capacity}`);
test.set("moon", "silver");
test.set("moon", "silver");
console.log(`Length: ${test.length()} and capacity: ${test.capacity}`);

test.set("moon", "silver");
test.set("moon", "silver");
console.log(`Length: ${test.length()} and capacity: ${test.capacity}`);
test.set("dmoon", "dssilver");
test.set("dmoonds", "dssilver");
console.log(`Length: ${test.length()} and capacity: ${test.capacity}`);
