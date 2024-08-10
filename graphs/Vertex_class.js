// 1.Introduction to Graphs
class Vertex1 {
  // When a vertex is first created, it should hold any given data, and it should have an empty list of edges because it does not have any connections. 

  constructor(data) { // In the constructor, expect a data parameter

    this.data = data; // set the data property
    
    this.edges = []; // set the edges class property to an empty array.
  }
  
  print() {
    const edgeList = this.edges.map(edge =>
        edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data) || [];

    const output = `${this.data} --> ${edgeList.join(', ')}`;
    console.log(output);
  }
}


// 4.Connecting Vertices with Edges
import Edge from './Edge_class.js'

 class Vertex2 {
  constructor(data) {
    this.data = data;
    this.edges = [];
  }

  addEdge(vertex) { // eate the .addEdge() method that expects a vertex parameter, which will represent the other end of the edge

    if (!(vertex instanceof Vertex2)) { // If not an instanceof of Vertex

      throw new Error('is not a Vertex instance') // throw an error

    } else {
      //  create an Edge instance to represent the connection from this vertex to the ending vertex, and Add the Edge instance to the vertex’s list of edges to open up our first connection from one vertex to another.

      this.edges.push(new Edge(this, vertex));
    }
  }

  print() {
    const edgeList = this.edges.map(edge =>
      edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data);

    const output = `${this.data} --> ${edgeList.join(', ')}`;
    console.log(output);
  }
}

// 5.Removing Vertex Connections
class Vertex12 {
  constructor(data) {
    this.data = data;
    this.edges = [];
  }

  addEdge(vertex) {
    if (vertex instanceof Vertex12) {
      this.edges.push(new Edge(this, vertex));
    } else {
      throw new Error('Edge start and end must both be Vertex');
    }
  }

  removeEdge(vertex) { // create the .removeEdge() method that expects an ending vertex parameter

    this.edges = this.edges.filter(edge => edge.end !== vertex); // iterate through its list of edges and filter out the Edge whose end property is strictly equal to the ending vertex
  }

  print() {
    const edgeList = this.edges.map(edge =>
        edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data);

    const output = `${this.data} --> ${edgeList.join(', ')}`;
    console.log(output);
  }
}


// 6.Weighted Graphs
export default class Vertex {
  constructor(data) {
    this.data = data;
    this.edges = [];
  }

  addEdge(vertex, weight) { // add a second parameter for weight
  
    if (vertex instanceof Vertex) {
      this.edges.push(new Edge(this, vertex, weight)); // Pass the argument to the new Edge instance

    } else {
      throw new Error('Edge start and end must both be Vertex');
    }
  }

  removeEdge(vertex) {
    this.edges = this.edges.filter(edge => edge.end !== vertex);
  }

  print() {
    const edgeList = this.edges.map(edge =>
        edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data);

    const output = `${this.data} --> ${edgeList.join(', ')}`;
    console.log(output);
  }
}