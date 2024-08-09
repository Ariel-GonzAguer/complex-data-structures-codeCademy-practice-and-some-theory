// Introduction
/*
Trees are wonderful data structures that can model real life hierarchical information, including organizational charts, genealogical trees, computer file systems, HTML elements on a web page (also known as the Document Object Model, or DOM), state diagrams, and more.

A tree is composed of tree nodes. A tree node is a very simple data structure that contains:
1.Data
2.A list of children, where each child is itself a tree node

We can add data to and remove data from a tree and traverse it in two different ways:
1.Depth-first, or
2.Breadth-first
*/

class TreeNode {
  constructor(data) { // Define a constructor that takes data as parameter

  this.data= data, // define a data class property and assign it to the parameter

  this.children= []// define a children class property and assign it to an empty array. This way it easier to add and remove a child.
  }
};



// Adding a Child
/*
The next task is to add a child to our tree. Each child in our children array has to be an instance of a TreeNode, however we want to allow our user interface to accept adding data in other forms as well.

For instance, if our method to add a child is .addChild(), we want to accommodate calling tree.addChild(3) as well as tree.addChild(new TreeNode(3)).
*/

class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  addChild(child) { // define method .addChild() which takes child as parameter

    if(child instanceof TreeNode) { // check if child is an instance of TreeNode

      this.children.push(child) // If it is, add child to the end of the children array

    } else {
      this.children.push(new TreeNode(child)); // create a new instance and added to the children array 
    }
  }
};



// Removing a Child
/*
Like with .addChild(), we want to provide a flexible interface for removing a child from a tree based on either its data or a TreeNode match. For example, if our method to remove a child is .removeChild(), we want to be able to execute the following:
` 
const blue = 'blue';
const green = new TreeNode('green');
tree.addChild(blue);        // add data
tree.addChild(green);       // add TreeNode
tree.removeChild('blue');   // remove by data
tree.removeChild(green);    // remove by TreeNode
`

The generic steps to execute in removing a child from a tree are as follows:
>
If target child is an instance of TreeNode,
  Compare target child with each child in the children array
  Update the children array if target child is found
Else 
  Compare target child with each child's data in the children array
  Update the children array if target child is found
If target child is not found in the children array
  Recursively call .removeChild() for each grandchild.
<

Because we implemented the children as an array, we can use the array .filter() method to update children. Like with .addChild(), we can also use instanceof to check if our target child is an instance of a TreeNode.
*/

class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  addChild(child) {
    if (child instanceof TreeNode) {
      this.children.push(child);
    } else {
      this.children.push(new TreeNode(child));
    }
  }

  removeChild(childToRemove) { // Define a new method, .removeChild(), that takes one parameter, childToRemove

  // If the target child is not found in the children array, then we would have to descend another level by traversing each child in the array and repeat the process. How do we know that the target child has been removed from the children array? One way is to compare the length of the original children array with the updated children array that has been filtered.

   const length = this.children.length; // Define a const variable called length and assign it to the length of the children array at the beginning of .removeChild() before the filtering.

    let filteredChildren = this.children.filter(child => { // Call the .filter() method on the children array

      if (childToRemove instanceof TreeNode) { // If childToRemove is a TreeNode

        if (childToRemove !== child) { // return true if childToRemove is not equal to child
          return true;

        } else {
          return false; // else return false.

        }

      } else { // If childToRemove is not a TreeNode

        if (childToRemove !== child.data) { // return true if childToRemove is not equal to child‘s data
          return true;

        } else {
          return false; // else return false.
        }
      }

    })

    this.children = filteredChildren; // Reassign the value of children.

   if(this.children.length === length) { // Compare length with the updated children‘s length after filtering
    this.children.forEach(child => child.removeChild(childToRemove)); // If they are the same, recursively call .removeChild() for each child in the children array.
   }

  }
};

// Ejemplo:
const tree = new TreeNode(1);

tree.addChild(15);
const node = new TreeNode(30);
tree.addChild(node);

console.log(tree);

tree.removeChild(15); // Remove the element in the tree by data

console.log(tree);

tree.removeChild(node) // Remove the element in the tree by TreeNode

console.log(tree);



// Pretty Print
/*
Wouldn’t it be nice to be able to display the structure of our tree in a captivating visual way? We have provided a helpful method, .print() that will give you a formatted text display of our tree.

For example, a tree with 3 levels starting with root node 15, children 3, 12, 0, and grandchildren 6, 9, 19, 8, 10, 19 is displayed below:
>
15
-- 3
-- -- 6
-- -- 9
-- 12
-- -- 19
-- -- 8
-- 0
-- -- 10
-- -- 19
<
This method takes one parameter, level, which is initialized to 0, to enable printing the entire tree structure from the top to the bottom.
*/

class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  addChild(child) {
    if (child instanceof TreeNode) {
      this.children.push(child);
    } else {
      this.children.push(new TreeNode(child));
    }
  }
  
  removeChild(childToRemove) {
    const length = this.children.length;
    this.children = this.children.filter(child => {
      return childToRemove instanceof TreeNode
      ? child !== childToRemove
      : child.data !== childToRemove;
    });

    if (length === this.children.length) {
      this.children.forEach(child => child.removeChild(childToRemove));
    }
  }

  print(level = 0) { // Define a new method, .print(), that takes one parameter, level, which is initialized to 0, to enable printing the entire tree structure from the top to the bottom.

    let result = ''; // Define a variable called result and initialize it to an empty string.

    for (let i = 0; i < level; i++) { // Use a for loop to iterate through the level parameter.

      result += '-- '; // Add two dashes to the result string for each iteration of the loop.
    }

    console.log(`${result}${this.data}`); // Print the current node‘s data and append the result string to the console.

    this.children.forEach(child => child.print(level + 1)); // Call the .print() method recursively for each child in the children array.
  }
};



// Depth-first Tree Traversal
/*
Now that we can add nodes to our tree, the next step is to be able to traverse the tree and display its content. We can do this in one of two ways: depth-first or breadth-first.

Depth-first traversal visits the first child in the children array and that node’s children recursively before visiting its siblings and their children recursively. The algorithm is as follows:
>
For each node
  Display its data
  For each child in children, call itself recursively
<

Based on this tree displayed using .print():
>
15
-- 3
-- -- 6
-- -- 9
-- 12
-- -- 19
-- -- 8
-- 0
-- -- 10
-- -- 19
<

we can traverse it depth-wise to produce this result:
>
15
3
6
9
12
19
8
0
10
19
<
*/

class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  addChild(child) {
    if (child instanceof TreeNode) {
      this.children.push(child);
    } else {
      this.children.push(new TreeNode(child));
    }
  }
  
  removeChild(childToRemove) {
    const length = this.children.length;
    this.children = this.children.filter(child => {
      return childToRemove instanceof TreeNode
      ? child !== childToRemove
      : child.data !== childToRemove;
    });

    if (length === this.children.length) {
      this.children.forEach(child => child.removeChild(childToRemove));
    }
  }

  print(level = 0) {
    let result = '';
    for (let i = 0; i < level; i++) {
      result += '-- ';
    }
    console.log(`${result}${this.data}`);
    this.children.forEach(child => child.print(level + 1));
  }

  depthFirstTraversal() { // define a method, .depthFirstTraversal()

  console.log(this.data) //  display the data of the current TreeNode 

  this.children.forEach(child => child.depthFirstTraversal(child)) // For each child in the children array, call .depthFirstTraversal() recursively.

  }
};



// Breadth-first Tree Traversal
/*
Breadth-first traversal visits each child in the children array starting from the first child before visiting their children and further layers until the bottom level is visited. The algorithm is as follows:
>
Assign an array to contain the current root node
While the array is not empty
  Extract the first tree node from the array
  Display tree node's data
  Append tree node's children to the array
<

Based on this tree displayed using .print():
>
15
-- 3
-- -- 6
-- -- 9
-- 12
-- -- 19
-- -- 8
-- 0
-- -- 10
-- -- 19
<

we can traverse it breadth-wise to produce this result:
>
15
3
12
0
6
9
19
8
10
19
<
*/

class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  addChild(child) {
    if (child instanceof TreeNode) {
      this.children.push(child);
    } else {
      this.children.push(new TreeNode(child));
    }
  }
  
  removeChild(childToRemove) {
    const length = this.children.length;
    this.children = this.children.filter(child => {
      return childToRemove instanceof TreeNode
      ? child !== childToRemove
      : child.data !== childToRemove;
    });

    if (length === this.children.length) {
      this.children.forEach(child => child.removeChild(childToRemove));
    }
  }

  print(level = 0) {
    let result = '';
    for (let i = 0; i < level; i++) {
      result += '-- ';
    }
    console.log(`${result}${this.data}`);
    this.children.forEach(child => child.print(level + 1));
  }
  
  depthFirstTraversal() {
    console.log(this.data);
    this.children.forEach(child => child.depthFirstTraversal());
  }

  breadthFirstTraversal() { // Create a method .breadthFirstTraversal() which takes no parameters.

    let queue = [this] //  declare a variable called queue and assign it to an array that contains the current node as its only element.

    while(queue.length !== 0) { // Create a while loop evaluating if queue is not empty.

      const current = queue.shift(); // extract the first element inside queue and assign it to a const variable, current

      console.log(current.data) // Log the data that belongs to current.

      queue = queue.concat(current.children); // merge the current tree node’s children to the queue and reassign the merger to queue
    }
  }
  
};



// relocateNode
/*

*/ 
class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  addChild(child) {
    if (child instanceof TreeNode) {
      this.children.push(child);
    } else {
      this.children.push(new TreeNode(child));
    }
  }
  
  removeChild(childToRemove) {
    const length = this.children.length;
    this.children = this.children.filter(child => {
      return childToRemove instanceof TreeNode
      ? child !== childToRemove
      : child.data !== childToRemove;
    });

    if (length === this.children.length) {
      this.children.forEach(child => child.removeChild(childToRemove));
    }
  }

  print(level = 0) {
    let result = '';
    for (let i = 0; i < level; i++) {
      result += '-- ';
    }
    console.log(`${result}${this.data}`);
    this.children.forEach(child => child.print(level + 1));
  }
  
  depthFirstTraversal() {
    console.log(this.data);
    this.children.forEach(child => child.depthFirstTraversal());
  }

  breadthFirstTraversal() { // Create a method .breadthFirstTraversal() which takes no parameters.

    let queue = [this] //  declare a variable called queue and assign it to an array that contains the current node as its only element.

    while(queue.length !== 0) { // Create a while loop evaluating if queue is not empty.

      const current = queue.shift(); // extract the first element inside queue and assign it to a const variable, current

      console.log(current.data) // Log the data that belongs to current.

      queue = queue.concat(current.children); // merge the current tree node’s children to the queue and reassign the merger to queue
    }
  }

  relocateNode(tree, nodeElement, level) {
    
    let nodeToRelocate = null; // Variable to store the node we want to relocate
  
    // Helper function to find the node in the tree
    const findNode = (node) => {
      
      if (node.data === nodeElement) { // Check if the current node is the one we're looking for

        nodeToRelocate = node;
        return true; // Node found, stop searching
      }
      
      // If not, search through this node's children
      for (let child of node.children) {
        if (findNode(child)) return true; // Node found in a child, stop searching
      }
      return false; // Node not found in this branch
    };
  
    // Search for the node in the top-level children of the tree
    for (let i = 0; i < tree.children.length; i++) {
      if (findNode(tree.children[i])) break; // Stop if node is found
    }
  
    // If the node was found, relocate it
    if (nodeToRelocate) {
      // Remove the node from its current location
      tree.removeChild(nodeElement);
      // Add the node to its new location at the specified level
      tree.children[level].addChild(nodeToRelocate);
    }
  }
  
};


