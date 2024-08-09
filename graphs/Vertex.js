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
import Edge from './Edge.js'

export default class Vertex {
  constructor(data) {
    this.data = data;
    this.edges = [];
  }

  addEdge(vertex) { // eate the .addEdge() method that expects a vertex parameter, which will represent the other end of the edge

    if (!(vertex instanceof Vertex)) { // If not an instanceof of Vertex

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
