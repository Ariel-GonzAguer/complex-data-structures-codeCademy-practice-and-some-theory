// Graphs
/*
1.Introduction to Graphs
In this lesson, we’ll take an object-oriented approach to build an implementation of the graph data structure in JavaScript. With three classes, Edge, Vertex, and Graph, we can implement a variety of graphs that satisfy the requirements of many algorithms. Remember that a Graph consists of vertices and their corresponding edges.

For this lesson, we want our Graph class to be flexible enough to support directed, undirected, weighted, and unweighted graphs. We will provide you with an Edge class that connects two vertices, along with the weight of the connection (to support weighted graphs).

With this in mind, we will create our Graph with the following requirements:
1.A Vertex can store any data.
2.A Vertex maintains a list of connections to other vertices, represented by a list of Edge instances.
3.A Vertex can add and remove edges going to another Vertex.
4.A Graph stores all of its vertices, represented by a list of Vertex instances.
5.A Graph knows if it is directed or undirected.
6.A Graph knows if it is weighted or unweighted.
7.A Graph can add and remove its own vertices.
8.A Graph can add and remove edges between stored vertices.

Let’s start with familiarizing ourselves with the classes that we will build in Vertex.js and Graph.js. We already set up .print() methods for you that will print out the state of the graph structure. Don’t worry about the class in Edge.js yet. We will use it to connect the vertices in a later exercise.

To keep the concepts grounded in a real-world application, we’ll build a transportation network of railroads and train stations as we go.

*** *** *** *** 

2.Adding Vertices
Now that we have set up our data structures, we can provide an easier way to manage the graph’s list of vertices. This gives us an opportunity to abstract out the places that use the Vertex class.

Currently, we would have to manually create a new Vertex instance and add it into the Graph’s list of vertices to populate the graph. If we create an .addVertex() method in the Graph class, it simplifies the process of adding a vertex to the graph. This alleviates the burden of knowing how the Vertex class should interact with the Graph class for whoever is using our Graph. They only need to interact with the Graph class.

*** *** *** *** 

3.Removing Vertices
We also want our Graph to manage its own vertex removal, just like how it handles its own vertex creation.
We will use the .removeVertex() method to look for the requested vertex and remove it from the list of vertices.

*** *** *** *** 

4.Connecting Vertices with Edges


*/