var graphs = {};

graphs.WeightedGraph = function(){
	this.graph = {};
};

graphs.Edge = function(edgeName,from,to,weight){
	this.edgeName = edgeName;
	this.from = from;
	this.to = to;
	this.weight = weight;
};

graphs.WeightedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = this.graph[vertex] || [];
	},
	addEdge : function(edge){
		this.graph[edge.from] && this.graph[edge.from].push(edge);
	},
	shortestPath : function(from,to){
		var vertices = Object.keys(this.graph);
		var distances = {};
		var parents = {};
		initialiseValues(vertices, distances, parents);
		distances[from] = 0;
		parents[from] = from;
		while(vertices.length){
			var vertex = getVertex(distances, vertices);
			this.graph[vertex].forEach(function(edge){
				var newDistance =  distances[vertex] + edge.weight;
				if(distances[edge.to] > newDistance){
					distances[edge.to] = newDistance;
					parents[edge.to] = edge;
				};
			});
		deleteVertex(vertex,vertices);
		};
		return pathThroughParent(parents,from,to);
	}
};

var initialiseValues = function(vertices, distances, parents){
	vertices.forEach(function(vertex){
		distances[vertex] = Infinity;
		parents[vertex] = null;
	});
};

var deleteVertex = function(vertexToDelete,vertices){
	vertices.splice(vertices.indexOf(vertexToDelete),1);
};

var getVertex = function(distances, vertices){
	var shortVertex;
	var distance = Infinity;
	for (var vertex in distances) {
		if(distance > distances[vertex] && vertices.indexOf(vertex) != -1)
			shortVertex = vertex;
	};
	return shortVertex;
};
var	pathThroughParent = function(parents,from,to,path){
	var path = path || [];
	if(parents[to]==to)
		return path.reverse();
	path.push(parents[to]);
	return pathThroughParent(parents, from, parents[to].from, path);
};

module.exports = graphs;