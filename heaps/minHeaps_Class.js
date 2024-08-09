// HEAPS: JAVASCRIPT

// Introduction
/*
A heap data structure is a specialized tree data structure that satisfies the heap condition:
1.In a max-heap, for any given element, its parent’s value is greater than or equal to its value.
2.In a min-heap, for any given element, its parent’s value is less than or equal to its value.

A heap data structure is commonly implemented as a binary tree. In this lesson, we’re going to implement a min-heap in JavaScript. Min-heaps efficiently keep track of the minimum value in a dataset, even as we add and remove elements.

Heaps enable solutions for complex problems such as finding the shortest path (Dijkstra’s Algorithm) or efficiently sorting a dataset (heapsort).

They’re an essential tool for confidently navigating some of the difficult questions posed in a technical interview.

By understanding the operations of a heap, you will have made a valuable addition to your problem-solving toolkit.
*/



// MinHeap Class
/*
Our MinHeap class will store two pieces of information:
1.An array of elements within the heap.
2.A count of the elements within the heap.

To make our lives easier, we’ll always keep one element at the beginning of the array with the value null. By doing this, we can simplify our coding by always referencing our minimum element at index 1 instead of 0 and our last element at index this.size instead of this.size - 1.
*/

class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }

}


// Bubble Up (part I)
/*
Our MinHeap needs to satisfy two conditions:
1.The element at index 1 is the minimum value in the entire list.
2.Every child element in the list must be larger than its parent.

Let’s define an .add() method which will allow us to add elements into the .heap array. We will also define .bubbleUp() which will do the work of maintaining the heap conditions as we add additional elements.
*/

class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }

  add(value) { // define add method with value as parameter

    this.heap.push(value); // add value to end of the array in this.heap

    this.size++; // increment size property

    console.log(`Value added: ${value}.`);
    this.bubbleUp1(); // We want to call .bubbleUp() each time we add an element

    console.log(this.heap);
  }

  bubbleUp1() { // define a bubbleUp method, whose task is to preserve the heap properties after an element is added to the heap
    console.log('Bubble Up');

  }
}



// Parent and Child Elements
/*
Great work so far! Our MinHeap adds elements to the internal heap, keeps a running count, and has the beginnings of .bubbleUp().

Before we dive into the logic for .bubbleUp(), let’s review how heaps track elements. We use an array for storing internal elements, but we’re modeling it on a binary tree, where every parent element has up to two child elements.

Child and parent elements are determined by their relative indices within the internal heap. By doing some arithmetic on an element’s index, we can determine the indices for parent and child elements (if they exist).

Parent: (index / 2), rounded down
Left Child: index * 2
Right Child: (index * 2) + 1
These calculations are important for the efficiency of the heap, but they’re not necessary to memorize, so we have provided three helper functions: getParent(), getLeft(), and getRight() in MinHeap.js.

These helpers take an index as the sole parameter and return the corresponding parent or child index.
 */

const getParent1 = current => Math.floor((current / 2));
const getLeft1 = current => current * 2;
const getRight1 = current => current * 2 + 1;



// Bubble Up (Part II)
/*
Now that we understand how to determine the relationship of elements with the internal heap, we’re ready to finish .bubbleUp().
In a min-heap, we need to ensure that every child is greater in value than its parent. Let’s add an element to the following heap.

console.log(minHeap.heap)
// returns [null, 10, 13, 21, 61, 22, 23, 99]
heap.add(12)

( new_element )
{ parent_element }
[null, 10, 13, 21, {61}, 22, 23, 99, (12)]

Oh no! We’ve violated the min-heap condition because 12‘s parent, 61, is greater than its child, 12.
To fix this, we will exchange the parent and the child elements.
before
[null, 10, 13, 21, {61}, 22, 23, 99, (12)]
SWAP 12 and 61
after
[null, 10, 13, 21, (12), 22, 23, 99, {61}]

12‘s parent is now 13 and it violates the min-heap condition. To fix this, we continue moving upwards swapping parent-child values.
before
[null, 10, {13}, 21, (12), 22, 23, 99, 61]
SWAP 12 and 13
after
[null, 10, (12), 21, {13}, 22, 23, 99, 61]

12‘s parent is now 10 and no longer violates the min-heap condition. We’ve restored the heap!
[null, {10}, (12), 21, 13, 22, 23, 99, 61]
The child, 12, is greater than the parent, 10!

Let’s recap our strategy for .bubbleUp():

>
Set the current element index to be the last index of heap
While current element is valid and its value is less than its parent's value
Swap the indexes
Update the current element index to be its parent index
<
 */

class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }

  add(value) {
    console.log(`.. adding ${value}`);
    this.heap.push(value);
    this.size++;
    this.bubbleUp();
    console.log(`added ${value} to heap`, this.heap);
  }

  bubbleUp() {
    let current = this.size; // declare a let current variable that will point to the added element’s index, with this.size

    // set up a while loop that will run as long as it meets these 2 conditions: 
    // 1.There is a valid current index. A valid current index is anything greater than 1.
    // 2.The value at the current index is less than its parent’s value. This will violate the min-heap condition and will trigger swapping values. Use a helper method to derive the parent index.
    while (current > 1 && this.heap[current] < this.heap[getParent(current)]) {
      console.log(`current heap...`, this.heap);
      console.log(`.. swap index ${this.heap[current]} with ${this.heap[getParent(current)]}`);
      this.swap(current, getParent(current)); // swap the parent index and the current index using the swap helper method

      current = getParent(current); // update the current index to be its parent’s index
    }
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

}

const getParent = current => Math.floor((current / 2));
const getLeft = current => current * 2;
const getRight = current => current * 2 + 1;



// Removing the Min
/*
Min-heaps would be useless if we couldn’t retrieve the minimum value. We’ve gone through a lot of work to maintain that value because we’re going to need it!

Our goal is to efficiently remove the minimum element from the heap. You’ll recall that we always locate the minimum element at index 1 (a placeholder element occupies index 0).

Our internal heap mirrors a binary tree. There’s a delicate balance of parent and child relationships we would ruin by directly removing the minimum.
>
console.log(minHeap.heap)
// [null, 10, 21, 13, 61, 22, 23, 99]
minHeap.popMin()
// 10
// [null, ???, 21, 13, 61, 22, 23, 99]
<

We need to remove an element that has no children, in this case, the last element. If we swap the minimum with the last element, we can easily remove the minimum from the end of the list.
>
[None, (10), 21, 13, 61, 22, 23, {99}]
minHeap.popMin()
SWAP minimum with last
[None, {99}, 21, 13, 61, 22, 23, (10)]
remove minimum
[None, 99, 21, 13, 61, 22, 23]
10
<

Terrific! We removed the minimum element with minimal disruption. Unfortunately, our heap is out of shape again with 99 sitting where the minimum element should be. We will solve this in exercises to come…
*/

class MinHeap {
  constructor() {
    this.heap = [ null ];
    this.size = 0;
  }

  popMin() { // Define .popMin() method

    if(this.size === 0) { // if our heap is empty

      return null; // return null
    }
    console.log(`...swap ${this.heap[1]} with ${this.heap[this.size]}`)

    this.swap(1, this.size); // exchange the last element of the heap with the minimum element at index 1

    const min = this.heap.pop(); // remove the last element from the heap
    
    console.log(`...Removed ${min} from heap`, this.heap)

    this.size--; // decrement the heap size.

    return min;

  }

  add(value) {
    console.log(`.. adding ${value}`);
    this.heap.push(value);
    this.size++;
    this.bubbleUp();
    console.log(`added ${value} to heap`, this.heap);
  }

  bubbleUp() {
    let current = this.size;
    while (current > 1 && this.heap[getParent(current)] > this.heap[current]) {
      console.log('..', this.heap);
      console.log(`.. swap index ${current} with ${getParent(current)}`);
      this.swap(current, getParent(current));
      current = getParent(current);
    }
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

}



// Heapify (part I)
/*
We’ve retrieved the minimum element but left our MinHeap in disarray. There’s no reason to get discouraged; we’ve handled this type of problem before, and we can get our MinHeap back in shape!

We’ll define a method, .heapify(), which performs a similar role to .bubbleUp(), except now we’re moving down the tree instead of up. The current element is a parent that can have either a left child or two children, but not just a right child.

We have written a helper method, .canSwap(), to return true if swapping can occur for either child and false otherwise:
>
canSwap(current, leftChild, rightChild) {
// Check that one of the possible swap conditions exists
return (this.exists(leftChild) && this.heap[current] > this.heap[leftChild] 
|| this.exists(rightChild) && this.heap[current] > this.heap[rightChild]
);
  
To maintain the min-heap condition, the parent value has to be less than both its child values. To see if a swap is necessary, starting with the left child, we first check that the child exists and then whether the min-heap condition is broken, i.e. the current element has a value greater than that child’s value. If the left child does not break the min-heap condition, the same check is performed on the right child.
<
*/

class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }

  popMin() {
    if (this.size === 0) {
      return null
    }
    console.log(`\n.. Swap ${this.heap[1]} with last element ${this.heap[this.size]}`);
    this.swap(1, this.size);
    const min = this.heap.pop();
    this.size--;
    console.log(`.. Removed ${min} from heap`);
    console.log('..', this.heap);
    return min;
  }

  add(value) {
    console.log(`.. adding ${value}`);
    this.heap.push(value);
    this.size++;
    this.bubbleUp();
    console.log(`added ${value} to heap`, this.heap);
  }

  bubbleUp() {
    let current = this.size;
    while (current > 1 && this.heap[getParent(current)] > this.heap[current]) {
      console.log(`.. swap ${this.heap[current]} with parent ${this.heap[getParent(current)]}`);
      this.swap(current, getParent(current));
      console.log('..', this.heap);
      current = getParent(current);
    }
  }

  heapify() { // Define an empty .heapify() method 

    let current = 1; // Declare a let current which points to index 1. At this stage, index 1 is pointing to the out-of-place value we swapped in while removing the minimum.

    // Declare two local variables leftChild and rightChild and assign them to their appropriate values.
    let leftChild = getLeft(current);
    let rightChild = getRight(current);

    while (this.canSwap(current, leftChild, rightChild)) { // Write a while loop that calls .canSwap()

      // update the leftChild and rightChild to their appropriate values so that the loop will not run infinitely.
      leftChild = getLeft(current);
      rightChild = getRight(current);
      return null; // ignore this line

      // In later exercises, we will continue filling the while loop to restore the heap.
    }
  }

  exists(index) {
    return index <= this.size;
  }

  canSwap(current, leftChild, rightChild) {
    // Check that one of the possible swap conditions exists
    return (
      this.exists(leftChild) && this.heap[current] > this.heap[leftChild]
      || this.exists(rightChild) && this.heap[current] > this.heap[rightChild]
    );
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

}



// Heapify (part II)
/*
In .bubbleUp(), we were always comparing our element with its parent. In .heapify(), we have potentially two options: the left child and the right child.

Which should we choose? We’ll use an example to think it through. Imagine we have a heap with four elements:
>
console.log(minHeap.heap) // [null, 21, 36, 58, 42]
minHeap.popMin() // 21
Now minHeap = [null, 42, 36, 58]
Should we swap 42 with 36 or 58?
<

We want to swap with the smaller of the two children, otherwise, we wouldn’t maintain our heap condition!
*/

class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }

  popMin() {
    if (this.size === 0) {
      return null
    }
    console.log(`\n.. Swap ${this.heap[1]} with last element ${this.heap[this.size]}`);
    this.swap(1, this.size);
    const min = this.heap.pop();
    this.size--;
    console.log(`.. Removed ${min} from heap`);
    console.log('..', this.heap);
    this.heapify(); // make a call to .heapify()
    return min;
  }

  add(value) {
    console.log(`.. adding ${value}`);
    this.heap.push(value);
    this.size++;
    this.bubbleUp();
    console.log(`added ${value} to heap`, this.heap);
  }

  bubbleUp() {
    let current = this.size;
    while (current > 1 && this.heap[getParent(current)] > this.heap[current]) {
      console.log(`.. swap ${this.heap[current]} with parent ${this.heap[getParent(current)]}`);
      this.swap(current, getParent(current));
      console.log('..', this.heap);
      current = getParent(current);
    }
  }

  heapify() {
    console.log('Heapify');
    let current = 1;
    let leftChild = getLeft(current);
    let rightChild = getRight(current);

    while (this.canSwap(current, leftChild, rightChild)) {
      if (this.exists(leftChild) && this.exists(rightChild)) { // check to see if leftChild and rightChild both exist

      // If both children exist, we need to only swap with the smaller of the two. Inside the if statement that checks for the existence of both children, compare the left child’s value with the right child’s value.

        if (this.heap[leftChild] < this.heap[rightChild]) { // If the left child is smaller than the right child

          this.swap(current, leftChild); // swap the current element with the left child

          current = leftChild; // update the current element index to be the left child

        } else { // Otherwise

          this.swap(current, rightChild); // swap the current element with the right child

          current = rightChild; // update the current element index to be the right child
        }
      } else { // If only one child exists, it has to be the left child.

        this.swap(current, leftChild); // swaps the current element with the left child

        current = leftChild; // updates the current element index to be the left child
      }

      leftChild = getLeft(current);
      rightChild = getRight(current);
    }

    // Go back into .popMin() and make a call to .heapify() before we return min.
  }

  exists(index) {
    return index <= this.size;
  }

  canSwap(current, leftChild, rightChild) { // Check that one of the possible swap conditions exists
    return (
      this.exists(leftChild) && this.heap[current] > this.heap[leftChild]
      || this.exists(rightChild) && this.heap[current] > this.heap[rightChild]
    );
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

}