function collatz(n, sum = 0) {
  if (n === 1) return 0;

  if (n % 2 === 0) {
    sum += collatz(n / 2) + 1;
  }
  if (n % 2 !== 0) {
    sum = collatz(3 * n + 1) + 1;
  }

  return sum;
}

console.log(collatz(5));
console.log(collatz(6));
console.log(collatz(7));
console.log(collatz(8));
console.log(collatz(27));

const fibs = function (n) {
  const arr = [];

  for (let i = 0; i < n; i++) {
    if (i === 0) arr.push(0);
    else if (i === 1) arr.push(1);
    else arr.push(arr[i - 1] + arr[i - 2]);
  }

  return arr;
};

const fibsRec = function (n) {
  if (n === 1) {
    return [0];
  }

  if (n === 2) {
    return [0, 1];
  }

  const arr = fibsRec(n - 1);
  arr.push(arr[n - 2] + arr[n - 3]); // e.g., at n=3 3rd element (at idx 2) should be sum of idx 0 and idx 1 so -1 added
  return arr;
};

console.log(fibs(8));
console.log(fibsRec(8));

const mergeSort = function (arr) {
  if (arr.length === 1) {
    return arr;
  }

  if (arr.length === 0) {
    return [];
  }

  // sort left hand array
  const arrLength = arr.length;
  let leftSort, rightSort;
  leftSort = mergeSort(arr.slice(0, Math.floor(arrLength / 2)));
  rightSort = mergeSort(arr.slice(Math.floor(arrLength / 2)));

  const mergedArr = [];
  // merged sorted arrays
  while (rightSort.length !== 0 || leftSort.length !== 0) {
    if (rightSort.length === 0) {
      mergedArr.push(...leftSort);
      leftSort = [];
      continue;
    }

    if (leftSort.length === 0) {
      mergedArr.push(...rightSort);
      rightSort = [];
      continue;
    }

    if (rightSort[0] > leftSort[0]) {
      mergedArr.push(leftSort.shift());
      continue;
    }

    if (rightSort[0] < leftSort[0]) {
      mergedArr.push(rightSort.shift());
      continue;
    }

    if (rightSort[0] === leftSort[0]) {
      mergedArr.push(rightSort.shift(), leftSort.shift());
    }
  }

  return mergedArr;
};

console.log(mergeSort([1, 2, 3])); // [1, 2, 3, 4, 5]
const sortedArr = mergeSort([3, 1, 4, 2, 11, 123, 153, 6, 8, 4, 6, 3, 45, 4, 4, 4, 6, 34, 8]);
console.log(sortedArr);
console.log(mergeSort([])); // []
console.log(mergeSort([73])); // [73]
console.log(mergeSort([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(mergeSort([105, 79, 100, 110])); // [79, 100, 105, 110]

const binarySearch = function (num, arr) {
  if (arr.length === 1) {
    return num === arr[0];
  }

  let startIndex = 0;
  let endIndex = arr.length - 1;
  let middleIdx = Math.floor((startIndex + endIndex) / 2);

  if (num < arr[middleIdx]) {
    arr = arr.slice(startIndex, middleIdx + 1);
  } else if (num > arr[middleIdx]) {
    arr = arr.slice(middleIdx + 1);
  } else return true;

  return binarySearch(num, arr);
};

console.log(binarySearch(8, [1, 2, 4, 6, 98]));

function factorial(n) {
  if (n === 0) return 1;

  return n * factorial(n - 1);
}

console.log(factorial(3));
