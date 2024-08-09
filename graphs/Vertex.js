// 1.Introduction to Graphs
import Edge from './Edge.js';

class Vertex {
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

export default Vertex;