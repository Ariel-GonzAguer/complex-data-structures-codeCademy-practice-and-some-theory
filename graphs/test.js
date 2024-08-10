import Graph from './Graph_class.js'

// Start by creating the train network as a weighted and directed Graph instance and assigning it to trainNetwork.
const trainNetwork = new Graph(true, true);

// We just got funding to build out 6 train stations. Using the graph’s .addVertex() method, add the following station vertices to our trainNetwork with the names: -Los Angeles -San Francisco -New York -Atlanta -Denver -Calgary
const laStation = trainNetwork.addVertex('Los Angeles');
const sfStation = trainNetwork.addVertex('San Francisco');
const nyStation = trainNetwork.addVertex('New York');
const atlStation = trainNetwork.addVertex('Atlanta');
const denStation = trainNetwork.addVertex('Denver');
const calStation = trainNetwork.addVertex('Calgary');

// We only want to service the routes our customers will travel the most, so let’s use .addEdge() to add the following route edges to the graph: -From San Francisco to Los Angeles, which is 400mi -From Los Angeles to San Francisco, which is 400mi -From New York to Denver, which is 1800mi -From Denver to New York, which is 1800mi -From Calgary to Denver, which is 1000mi -From Denver to Calgary, which is 1000mi -From Los Angeles to Atlanta, which is 2100mi -From Atlanta to Los Angeles, which is 2100mi

trainNetwork.addEdge(sfStation, laStation, 400);
trainNetwork.addEdge(laStation, sfStation, 400);
trainNetwork.addEdge(nyStation, denStation, 1800);
trainNetwork.addEdge(denStation, nyStation, 1800);
trainNetwork.addEdge(calStation, denStation, 1000);
trainNetwork.addEdge(denStation, calStation, 1000);
trainNetwork.addEdge(atlStation, laStation, 2100);
trainNetwork.addEdge(laStation, atlStation, 2100);

trainNetwork.removeEdge(nyStation, denStation);
trainNetwork.removeEdge(calStation, denStation);
trainNetwork.removeEdge(denStation, calStation);
trainNetwork.removeVertex(calStation);

// We’re finally all aboard the same page. Print out our final graph and check that we built the following routes: -San Francisco to and from Los Angeles -Los Angeles to and from Atlanta -Denver to New York. This wraps up our graph implementation! There are still some edge (pardon the pun) cases that we have not yet accounted for. 

trainNetwork.print();