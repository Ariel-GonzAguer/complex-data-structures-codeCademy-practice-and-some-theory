// 1.Introduction to Graphs
import Vertex from './Vertex_class.js';

class Graph1 {
  // a graph is essentially a collection of vertices and edges. Our graph only needs to keep track of a list of vertices.
  constructor() {
    this.vertices = []; // set the vertices property to an empty array 
  }
  
  print() {
    const vertexList = this.vertices || [];
    vertexList.forEach(vertex => vertex.print());
  }
}


// 2.Adding Vertices
class Graph2 {
  constructor() {
    this.vertices = [];
  }

  addVertex(data) { // add an .addVertex() method with one parameter: data

    let newVertex = new Vertex(data); // create a Vertex instance

    this.vertices.push(newVertex); // add newVertex to vertices array

    return newVertex; // return newVertex
  }

  print() {
    this.vertices.forEach(vertex => vertex.print());
  }
}


// 3.Removing Vertices
class Graph0 {
  constructor() {
    this.vertices = [];
  }

  addVertex(data) {
    const newVertex = new Vertex(data);
    this.vertices.push(newVertex);

    return newVertex;
  }

  removeVertex(vertex) { // implement the .removeVertex() method that accepts the vertex to be removed as a parameter

    this.vertices = this.vertices.filter(vrtx => vrtx !== vertex); // terate through the list of vertices and remove the vertex that is strictly equal to the vertex given in the parameter.
  }

  print() {
    this.vertices.forEach(vertex => vertex.print());
  }
}


// 4.Connecting Vertices with Edges
class Graph8 {
  constructor() {
    this.vertices = [];
  }

  addVertex(data) {
    const newVertex = new Vertex(data);
    this.vertices.push(newVertex);

    return newVertex;
  }

  removeVertex(vertex) {
    this.vertices = this.vertices.filter(v => v !== vertex);
  }

  addEdge(vertexOne, vertexTwo) { // create an .addEdge() method, which will create edges between the parameters, vertexOne and vertexTwo.

    if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) { // If the parameters are both an instanceof a Vertex

    // use the vertices’ .addEdge() method to create an edge between the other vertex.
      vertexOne.addEdge(vertexTwo);
      vertexTwo.addEdge(vertexOne);
    } else { // Otherwise
    
      throw new Error('Expected Vertex arguments.') //  throw an error
    }
  }

  print() {
    this.vertices.forEach(vertex => vertex.print());
  }
}


// 5.Removing Vertex Connections
class Graph99 {
  constructor() {
    this.vertices = [];
  }

  addVertex(data) {
    const newVertex = new Vertex(data);
    this.vertices.push(newVertex);

    return newVertex;
  }

  removeVertex(vertex) {
    this.vertices = this.vertices.filter(v => v !== vertex);
  }

  addEdge(vertexOne, vertexTwo) {
    if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
      vertexOne.addEdge(vertexTwo);
      vertexTwo.addEdge(vertexOne);
    } else {
      throw new Error('Expected Vertex arguments.');
    }
  }

  removeEdge(vertexOne, vertexTwo) { // create .removeEdge() method that removes the edge between two given vertices.

    if(!(vertexOne instanceof Vertex) || !(vertexTwo instanceof Vertex)) { // if either of them are not Vertex instances

      throw new Error('Expected Vertex arguments.') //  throw new Error

    } else { // use the vertices’ .removeEdge() method to remove the edge between the other vertex.

      vertexOne.removeEdge(vertexTwo);
      vertexTwo.removeEdge(vertexOne);
    }
  }

  print() {
    this.vertices.forEach(vertex => vertex.print());
  }
}


// 6.Weighted Graphs
class Graph42 {
  constructor(isWeighted = false) { // add an isWeighted boolean parameter in the constructor, false by default

    this.vertices = [];
    this.isWeighted = isWeighted; // Set the argument to the isWeighted class property.
  }

  addVertex(data) {
    const newVertex = new Vertex(data);
    this.vertices.push(newVertex);

    return newVertex;
  }

  removeVertex(vertex) {
    this.vertices = this.vertices.filter(v => v !== vertex);
  }

  addEdge(vertexOne, vertexTwo, weight) { // add third parameter for weight

    const edgeWeight = this.isWeighted ? weight : null; // set it to the weight argument if the graph is weighted, otherwise set it to null

    if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
      // Pass edgeWeight to the calls that create edges between the given vertices.
      vertexOne.addEdge(vertexTwo, edgeWeight);
      vertexTwo.addEdge(vertexOne, edgeWeight);
    } else {
      throw new Error('Expected Vertex arguments.');
    }
  }

  removeEdge(vertexOne, vertexTwo) {
    if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
      vertexOne.removeEdge(vertexTwo);
      vertexTwo.removeEdge(vertexOne);
    } else {
      throw new Error('Expected Vertex arguments.');
    }
  }

  print() {
    this.vertices.forEach(vertex => vertex.print());
  }
}

// 7.Directed Graphs
export default class Graph {
  constructor(isWeighted = false, isDirected = false) { // add isDirected as new parameter, by default false

    this.vertices = [];
    this.isWeighted = isWeighted;
    this.isDirected = isDirected; // set the parameter as the value of the new isDirected property
  }

  addVertex(data) {
    const newVertex = new Vertex(data);
    this.vertices.push(newVertex);

    return newVertex;
  }

  removeVertex(vertex) {
    this.vertices = this.vertices.filter(v => v !== vertex);
  }

  // Modify .addEdge() to manage directed graphs also
  addEdge(vertexOne, vertexTwo, weight) {
    const edgeWeight = this.isWeighted ? weight : null;

    if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
      vertexOne.addEdge(vertexTwo, edgeWeight); // create first edge always

    } else if (!this.isDirected) {
      vertexTwo.addEdge(vertexOne, edgeWeight); // create second edge if its not a directed graph

    } else {
      throw new Error('Expected Vertex arguments.');
    }
  }

  // Modify .removeEdge() to manage directed graphs also
  removeEdge(vertexOne, vertexTwo) {
    if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
      vertexOne.removeEdge(vertexTwo); // delete first edge always 
     
      if (!this.isDirected) {
        vertexTwo.removeEdge(vertexOne); // delete second edge if its not a directed graph
      }
    } else {
      throw new Error('Expected Vertex arguments.');
    }
  }

  print() {
    this.vertices.forEach(vertex => vertex.print());
  }
}

const trainNetwork = new Graph(true, true);
const atlantaStation = trainNetwork.addVertex('Atlanta');
const newYorkStation = trainNetwork.addVertex('New York');
trainNetwork.addEdge(atlantaStation, newYorkStation);
trainNetwork.removeEdge(atlantaStation, newYorkStation);

trainNetwork.print();