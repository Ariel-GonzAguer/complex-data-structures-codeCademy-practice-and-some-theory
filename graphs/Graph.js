// 1.Introduction to Graphs
import Edge from './Edge.js';
import Vertex from './vertex.js';

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

// Underneath the Graph class, create a Graph instance and assign it to the trainNetwork variable. Then use the .addVertex() method to add two train stations with the names, 'Atlanta' and 'New York'. Assign the newly created vertices to the variables atlantaStation and newYorkStation, respectively. We will use these variables later on. Call the .print() method on the trainNetwork. We should see our graph with two vertices inside it. They should be labeled Atlanta and New York, respectively.

const trainNetwork2 = new Graph2();
const atlantaStation2 = trainNetwork2.addVertex('Atlanta');
const newYorkStation2 = trainNetwork2.addVertex('New York');

// trainNetwork.print();


// 3.Removing Vertices
class Graph {
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

const trainNetwork = new Graph();
const atlantaStation = trainNetwork.addVertex('Atlanta');
const newYorkStation = trainNetwork.addVertex('New York');

trainNetwork.print();

// Underneath our Graph class, let’s remove the Atlanta vertex we added in the previous exercise using the trainNetwork‘s .removeVertex() method. Remember to do it before the call to .print() so we can see what the resulting graph looks like. We should see our graph with only the New York vertex remaining, and no edges.
console.log('\n After remove... \n')

trainNetwork.removeVertex(atlantaStation);
trainNetwork.print();