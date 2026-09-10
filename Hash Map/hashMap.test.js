import { HashMap } from "./hashMap.js";

describe("HashMap", () => {
  it("HashMap class exists", () => {
    expect(HashMap).toBeDefined();
  });

  it("has properties load factor and capacity deifned", () => {
    const map = new HashMap(0.9, 32);
    expect(map.loadFactor).toBe(0.9);
    expect(map.capacity).toBe(32);
  });

  it("properties have default value 0.75 and 16 (always a power of 2)", () => {
    const map = new HashMap();
    expect(map.loadFactor).toBe(0.75);
    expect(map.capacity).toBe(16);
  });

  /**@type {HashMap} */
  let hashMap;
  beforeEach(() => {
    hashMap = new HashMap();
  });

  describe("hash()", () => {
    it("Takes in a key and returns a different hash depending on hashmap capacity", () => {
      for (let i = 0; i < 10; i++) {
        const hash = hashMap.hash(`test${i}`);
        expect(hash).toBeGreaterThanOrEqual(0);
        expect(hash).toBeLessThanOrEqual(15);
      }
    });

    it("Throws an error if input is something different from string", () => {
      expect(() => hashMap.hash(555)).toThrow(TypeError);
    });
  });

  describe("set()", () => {
    it("Should add an entry to the bucket if the key is not present", () => {
      const key = "test";
      const value = 2;

      hashMap.set(key, value);
      expect(hashMap.get(key)).toBe(value);
    });

    it("should replace the key value if key is present", () => {
      hashMap.set("key", "value");
      expect(hashMap.get("key")).toBe("value");

      hashMap.set("key", "different value");
      expect(hashMap.get("key")).toBe("different value");
    });

    it("should return Type error if key is not string", () => {
      expect(() => hashMap.set(233, 2433)).toThrow(TypeError);
    });

    it("should double the capacity once the load capacity has been reached (to avoid collisions)", () => {
      for (let i = 0; i < 12; i++) {
        hashMap.set(`${i}`, "value");
        expect(hashMap.capacity).toBe(16);
      }
      hashMap.set("last before load increase", "value");
      expect(hashMap.capacity).toBe(32);
    });
  });

  describe("get()", () => {
    it("should return a value for a given key", () => {
      hashMap.set("key", "value");
      expect(hashMap.get("key")).toBe("value");
    });

    it("should return undefined if the key is not present", () => {
      hashMap.set("key", "value");
      expect(hashMap.get("key")).toBe("value");
      expect(hashMap.get("no key")).toBeUndefined();
    });

    it("should return Typeerror if key is not string", () => {
      expect(() => hashMap.get(322)).toThrow(TypeError);
    });
  });

  describe("remove()", () => {
    it("should remove the element for a given key", () => {
      hashMap.set("remove", 1);
      hashMap.set("stay", 2);
      hashMap.set("stay", 3);

      expect(hashMap.get("remove")).toBeDefined();
      hashMap.remove("remove");

      expect(hashMap.get("remove")).toBeUndefined();
    });

    it("should returnt true if the item is removed", () => {
      hashMap.set("remove", 1);
      expect(hashMap.remove("remove")).toBeTruthy();
    });

    it("should return false if the entry with this key doesn't exist", () => {
      expect(hashMap.remove("remove")).toBeFalsy();
    });
  });

  describe("length()", () => {
    it("should return a length of 4", () => {
      hashMap.set("key", "value");
      hashMap.set("key2", "value2");
      hashMap.set("key3", "value3");
      hashMap.set("key4", "value4");

      expect(hashMap.length()).toBe(4);
    });

    it("should retur`n a length of 0 is the hashmap is empty", () => {
      expect(hashMap.length()).toBe(0);
    });
  });

  describe("clear()", () => {
    it("should return length 0 upon clear", () => {
      hashMap.set("key", "value");
      hashMap.set("key2", "value2");
      hashMap.set("key3", "value3");
      hashMap.set("key4", "value4");

      expect(hashMap.length()).toBe(4);
      hashMap.clear();
      expect(hashMap.length()).toBe(0);
    });
  });

  describe("keys()", () => {
    it("should returns an array of keys of the hash map", () => {
      hashMap.set("key", "value");
      hashMap.set("key2", "value2");
      hashMap.set("key3", "value3");
      hashMap.set("key4", "value4");

      expect(hashMap.keys()).toHaveLength(4);
      expect(hashMap.keys()).toEqual(
        expect.arrayContaining(["key", "key2", "key3", "key4"]),
      );
    });

    it("should return an empty array if no entries are present", () => {
      expect(hashMap.keys()).toHaveLength(0);
    });
  });

  describe("values()", () => {
    it("should returns an array of values of the hash map", () => {
      hashMap.set("key", "value");
      hashMap.set("key2", "value2");
      hashMap.set("key3", "value3");
      hashMap.set("key4", "value4");

      expect(hashMap.values()).toHaveLength(4);
      expect(hashMap.values()).toEqual(
        expect.arrayContaining(["value", "value2", "value3", "value4"]),
      );
    });

    it("should return an empty array if no entries are present", () => {
      expect(hashMap.values()).toHaveLength(0);
    });
  });

  describe("entries()", () => {
    it("should returns an array of entries of the hash map", () => {
      hashMap.set("key", "value");
      hashMap.set("key2", "value2");
      hashMap.set("key3", "value3");
      hashMap.set("key4", "value4");

      expect(hashMap.entries()).toHaveLength(4);
      expect(hashMap.entries()).toEqual(
        expect.arrayContaining([
          ["key", "value"],
          ["key2", "value2"],
          ["key3", "value3"],
          ["key4", "value4"],
        ]),
      );
    });

    it("should return an empty array if no entries are present", () => {
      expect(hashMap.values()).toHaveLength(0);
    });
  });
});
