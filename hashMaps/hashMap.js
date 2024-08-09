// Hash Maps
/*
Hash maps are data structures that serve as efficient key-value stores. They are capable of assigning and retrieving data in the fastest way possible. This is because the underlying data structure that hash maps use is an array.

A value is stored at an array index determined by plugging the key into a hash function. Because we always know exactly where to find values in a hash map, we have constant access to any of the values it contains.

This quick access to values makes a hash map a good choice of data structure whenever we need to store a lot of values but need fast look-up time.

In JavaScript, objects are often used to map keys to values as in a hash map, but in this lesson, you’ll create your own implementation of a hash map by building out a HashMap class. You’ll build methods to hash and compress a given key, assign an index at which to store a value, and retrieve that value.

To implement a hash map, the HashMap constructor method will create an empty array that will hold values. A hashing function will return an index in the array where the value will be stored. While going through the following exercises, remember that the purpose of this lesson is to gain a deeper understanding of the data structure rather than creating a production-quality data structure.
*/

// Hashing (function)
/*
The hashing function is the secret to efficiently storing and retrieving values in a hash map. A hashing function takes a key as input and returns an index within the hash map’s underlying array.

This function is said to be deterministic. That means the hashing function must always return the same index when given the same key. This is important because we will need to hash the key again later to retrieve the stored value. We won’t be able to do this unless our hashing function behaves in a predictable and consistent way.

Getting an integer representing an index can be done by summing up each character code of the key (as a numeric value) with the running total of the previously summed character codes.

The hashing function should follow this logic:

>
declare hashCode variable with value of 0

for each character in the key
  add the sum of the current character code value and hashCode to hashCode

return hashCode
<

Adding the sum of hashCode and the character code to the hashCode again creates a deterministic and also non-reversible implementation of a hashing function. This avoids generating a duplicate index if keys have the same characters in different orders, such as bat and tab.
*/
// import { LinkedList, Node } from './Node-and-LikedList-and-HashMap_classes';
const LinkedList = require('./Node-and-LikedList-and-HashMap_classes').LinkedList;
const Node = require('./Node-and-LikedList-and-HashMap_classes').Node;

 class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size).fill(null);
  }

  hash(key) { // Create .hash() method, with key as a parameter. This method will take a string and use it to generate an index in the hash map’s internal array.

    let hashCode = 0; // This variable will keep a running total of character codes. Assign it an initial value of 0.

    for (let i = 0; i < key.length; i++) { // create a for loop that loops through each index of key

      hashCode += hashCode + key.charCodeAt(i); // convert each character in key to an integer using the JavaScript string method .charCodeAt(). Add the result of calling .charCodeAt() on the current character of key and hashCode to the hashCode variable.
    }
    return hashCode; // return the finished hashCode
  }
}



// Compression
/*
The current hashing function will return a wide range of integers — some of which are not indices of the hash map array. To fix this, we need to use compression.

Compression means taking some input and returning an output only within a specific range (it’s not guaranteed that this index will be within the bounds of the hash map’s array).

In our hash map implementation, we’re going to have our hashing function handle compression in addition to hashing. This means we’ll add an additional line of code to compress the hashCode before we return it.

The updated .hash() should follow these steps:
>
initialize hashCode variable to 0

for each character in the key
   add the character code and hashCode to hashCode

return compressed hashCode
<
*/

class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size)
      .fill(null);
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    return hashCode % this.hashmap.length; // use modular arithmetic (%) to return the remainder of dividing hashCode by the length of the hash map.
  }
}



// Assign
/*
We now have everything we need to find a place in the hash map array to store a value. The only thing left to do is assign the value to the index we generated. A method, .assign() will handle the logic needed to take in a key-value pair and store the value at a particular index.

A general outline of how .assign() will work is this:
>
store the hashed key in a variable arrayIndex
assign the value to the element at arrayIndex in the hash map
<
*/

class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size)
      .fill(null);
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    return hashCode % this.hashmap.length;
  }
  assign(key, value) { // Declare a method .assign() with the parameters key and value

    const arrayIndex = this.hash(key); // Declare a constant arrayIndex with the value of the hashed and compressed key

    this.hashmap[arrayIndex] = value; // Assign the value to the element at the index you derived from hashing, arrayIndex
  }
}



// Retrieve
/*
To be a fully functional hash map, we have to be able to retrieve the values we are storing. To implement retrieval for our hash map we’ll create a new HashMap method, .retrieve().

This method will make use of .hash()‘s deterministic nature to find the value we’re looking for in the hash map.
*/

class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size)
      .fill(null);
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    return hashCode % this.hashmap.length;
  }

  assign(key, value) {
    const arrayIndex = this.hash(key);
    this.hashmap[arrayIndex] = value;
  }

  retrieve(key) { // Define a .retrieve() method. It should have one parameter, key, the value we want to retrieve.

    const arrayIndex = this.hash(key); // declare a constant arrayIndex with the value of the hashed key

    return this.hashmap[arrayIndex]; // Return the value stored at this.hashmap[arrayIndex]
  }
}



// Collisions
/*
We have a hash map implementation, but what happens when two different keys generate the same index? Run the code in collision.js to see a collision in action.

Instead of returning 'marsh plant' and 'forest animal' we retrieve 'forest animal' twice. This is because both key-value pairs are assigned to the same index 0 and the first value, 'marsh plants' was overwritten.

When two different keys resolve to the same array index this is called a collision. In our current implementation, all keys that resolve to the same index are treated as if they are the same key. This is a problem because they will overwrite one another’s values.
*/
class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size);
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    return hashCode % this.hashmap.length;
  }

  assign(key, value) {
    const arrayIndex = this.hash(key);
    this.hashmap[arrayIndex] = value;
  }
  
  retrieve(key) {
    const arrayIndex = this.hash(key);
    return this.hashmap[arrayIndex];
  }
}

const parkInventory = new HashMap(2);
parkInventory.assign('reed', 'marsh plant');
parkInventory.assign('deer', 'forest animal');

console.log(parkInventory.retrieve('reed')); // forest animal
console.log(parkInventory.retrieve('deer')); // forest animal



// Collisions: Assigning
/*
Our first step in implementing a collision strategy is updating our constructor and .assign() method to use linked lists and nodes inside the hashmap array. This will allow us to store multiple values at the same index by adding new nodes to a linked list instead of overwriting a single value. This strategy of handling collisions is called separate chaining.

A collision-proof .assign() should look like this to start:
>
store the hashed key in a variable arrayIndex
store linked list at arrayIndex in a variable linkedList

if linked list is empty
  add the key-value pair to the linked list as a node
<
We’ll be using the LinkedList and Node classes found in the LinkedList.js and Node.js files to implement our collision-proof HashMap class.
 */
class HashMap {
  constructor(size = 0) {
    // Instead of an empty array, new hash maps will have an internal array filled with empty linked lists. Tab to HashMap.js, and replace the code in the constructor method with the following:
    this.hashmap = new Array(size)
      .fill(null)
      .map(() => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    return hashCode % this.hashmap.length;
  }

  assign(key, value) {
    const arrayIndex = this.hash(key);

    const linkedList = this.hashmap[arrayIndex]; // Declare constant in linkedList with the value at arrayIndex in the hash map array. This new constant will reference the linked list we want to add a value to.

/*
If the linked list at arrayIndex is empty, we should add the key-value pair to the list. The key-value pair should be stored in a node and become the head of the linked list before exiting the code.

A key-value pair can be stored in a node’s data property as an object with key and value properties: {key: 'deer', value: 'forest animal'}

Data can be stored when the node is created by passing data to the Node constructor or it can be assigned to the data property later with dot notation and chaining:
// Using the Node constructor
const first = new Node({'someKey', 'someValue'});

// Using dot notation and chaining 
const second = new Node();
second.data.key = 'someKey';
second.data.value = 'someValue';

 */ 
    if (!linkedList.head) { // Add an if statement that checks if the linked list head exists
      linkedList.addToHead({ key, value }) // If it doesn’t exist, add the key-value pair as the head of the list
      return;
    }
  }
}



// Collisions: Looping
/*
We’ve added code to .assign() that takes care of an empty list, but what happens when there is a collision and there are already values stored at a particular index?

If there are already values stored in nodes at an index, we need to loop over each node in the list in order to determine how to proceed.
The two possibilities we’ll encounter while looping are:
1. The key we are looking for and the key of the current node is the same, so we should overwrite the value
2. No node in the linked list matches the key, so we should add the key-value pair to the list as the tail node

After both cases, if we haven’t already exited the loop, we should reset the loop’s condition.

With this in mind, the .assign() code for looping should look like this:
>
store the head node of the linked list in a variable current

while there is a current node
  if the current node's key is the same as the key
    store the key and value in current
  if the current node is the tail node
    store the key-value pair in the node after current
    exit the loop      
  set current to the next node
<
*/

class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size)
      .fill(null)
      .map(() => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    return hashCode % this.hashmap.length;
  }

  assign(key, value) {
    const arrayIndex = this.hash(key);
    const linkedList = this.hashmap[arrayIndex];
    if (linkedList.head === null) {
      linkedList.addToHead({ key, value });
      return;
    }
    let current = linkedList.head; // declare a variable let current. Store the head node of the linked list in current. We’ll use current to begin iterating over the linked list until we find the tail node.

    while (current === null) { //  iterate over the linked list to find the tail using a while loop.

      if (current.data.key === key) { // Add an if statement in the while loop that does a strict equality check of the current node’s .key and key. If the two keys are the same, 

        current.data = { key, value }; // overwrite the current node’s key and value properties with the key-value pair we want to store.
      }

      if (!current.getNextNode()) { // checks if the current node is the tail node. If the current node is the end of the linked list, there are no more nodes to loop over and check for a matching key.

        const newNode = new Node({ key, value }); // set the next node after current to a new node with the key-value pair stored in it.

        current.setNextNode(newNode);

        break; // Then break out of the while loop.

      }

      // If we don’t reach the end of the linked list on this iteration, we need to check the next node...
      
      current = current.getNextNode(); // set current to the next node in the linked list to continue the loop. 
    }
  }
}



// Collisions: Retrieving
/*
When we retrieve hash map values, we also need to be aware that different keys could point to the same array index leading us to retrieve the wrong value.

To avoid this, we’ll search through the linked list at an index until we find a node with a matching key. If we find the node with the correct key, we’ll return the value; otherwise, we’ll return null.

The .retrieve() method will follow this logic:
>
store the hashed key in the constant arrayIndex
store the head node of a list in the variable current

while there is a valid node
  if the current node's key matches the key
    return the current node's value
  set current to the next node in the list

return null
<
*/

class HashMapFinal {
  constructor(size = 0) {
    this.hashmap = new Array(size)
      .fill(null)
      .map(() => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    return hashCode % this.hashmap.length;
  }

  assign(key, value) {
    const arrayIndex = this.hash(key);
    const linkedList = this.hashmap[arrayIndex];
    if (linkedList.head === null) {
      linkedList.addToHead({ key, value });
      return;
    }

    let current = linkedList.head;
    while (current) {
      if (current.data.key === key) {
        current.data = { key, value };
      }
      if (!current.next) {
        current.next = new Node({ key, value });
        break;
      }
      current = current.next;
    }
  }

  retrieve(key) {
    const arrayIndex = this.hash(key);
    let current = this.hashmap[arrayIndex].head; // declare a let variable current, Assign it the head node of the linked list at arrayIndex to current

    while (current) { // Create a while loop that we’ll use to iterate over each node in the linked list until we either find the value we’re looking for or reach the end of the list. Set the while condition to be the current node of the linked list.

      if (current.data.key === key) { // check if the key received as an argument and the key of the current node are the same.

        return current.data.value; // If both keys are the same, this means we’ve found the node with the correct value. Return the value stored in the current node.
      }
      current = current.next; // If the keys don’t match, we need to check the next node in the linked list. Outside of the if statement, set current to the next node in the linked list.

    }
    return null; // If we’ve looped through the entire linked list without finding the value we want to retrieve, it means the value is not stored in the hash map. Return null
  }
}



// IMPROVED HASH MAP
/*
Explicación de los cambios:

1.En el constructor, inicializamos cada elemento del array con un nuevo Map() en lugar de null o una LinkedList.
2.El método hash permanece igual.
3.En el método assign, simplemente usamos el método set del Map para agregar o actualizar el par clave-valor.
4.En el método retrieve, usamos el método get del Map para obtener el valor. Si la clave no existe, get devuelve undefined, por lo que usamos el operador || para devolver null en ese caso.
5.He añadido un método delete que elimina un par clave-valor del HashMap.
6.También he añadido un método has que verifica si una clave existe en el HashMap.

Esta implementación es más simple y potencialmente más eficiente, especialmente para HashMaps grandes o con muchas colisiones. Algunas ventajas de usar Map:

1.Las operaciones de inserción, búsqueda y eliminación son O(1) en promedio.
2.Map maneja automáticamente las colisiones de manera eficiente.
3.No necesitamos implementar una estructura de datos separada para manejar colisiones.

--> Con esta implementación, ya no necesitas las clases Node y LinkedList que tenías antes. <--
*/
class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size).fill(null).map(() => new Map());
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    return hashCode % this.hashmap.length;
  }

  assign(key, value) {
    const arrayIndex = this.hash(key);
    this.hashmap[arrayIndex].set(key, value);
  }

  retrieve(key) {
    const arrayIndex = this.hash(key);
    return this.hashmap[arrayIndex].get(key) || null;
  }

  delete(key) {
    const arrayIndex = this.hash(key);
    return this.hashmap[arrayIndex].delete(key);
  }

  has(key) {
    const arrayIndex = this.hash(key);
    return this.hashmap[arrayIndex].has(key);
  }
}
