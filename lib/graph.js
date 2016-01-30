var graphs = {
	UndirectedGraph : function(){
		this.graph = {}
	},
	DirectedGraph : function(){
		this.graph = {}
	}
};

graphs.DirectedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = [];
	},
	addEdge : function(from,to){
		this.graph[from].push(to);
	},
	hasEdgeBetween : function(from,to){
		return (this.graph[from].indexOf(to) >=0);
	},
	order : function(){
		return Object.keys(this.graph).length;
	},
	size : function(){
		var edges = 0;
		var keys = Object.keys(this.graph);
		var self = this;
		keys.forEach(function(vertex){
			edges += self.graph[vertex].length;
		})
		return edges;
	},
	pathBetween : function(from, to, visitList){
		visitList = visitList || [];
		var graph = this.graph;
		if(from == to)
			return visitList.concat(from);
		for (var vertex in graph[from]){
			var nextVertex = graph[from][vertex];
			if(visitList.indexOf(nextVertex)==-1){
				var path = this.pathBetween(nextVertex, to, visitList.concat(from));
				if(path.length)
					return path;
			}
		};
		return [];
	},
	farthestVertex: function(from) {
        var pathLength = 0,
            longestVertex, path;
        for (var v in this.graph) {
            path = this.pathBetween(from, v);
            if (pathLength < path.length)
                pathLength = path.length, longestVertex = v;
        };
        return longestVertex;
    },
    allPaths : function(from, to, visitList, paths){
		visitList = visitList || [];
		paths = paths || [];
		var graph = this.graph;
		if(from == to)
			return paths.push(visitList.concat(from));
		for (var vertex in graph[from]){
			var nextVertex = graph[from][vertex];
			if(visitList.indexOf(nextVertex)==-1){
				this.allPaths(nextVertex, to, visitList.concat(from), paths);
			}
		};
		return paths;
	}
}

	

graphs.UndirectedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = [];
	},
	addEdge : function(from,to){
		this.graph[from].push(to);
		this.graph[to].push(from);
	},
	hasEdgeBetween : function(from,to){
		return (this.graph[from].indexOf(to) >=0);
	},
	order : function(){
		return Object.keys(this.graph).length;
	},
	size : function(){
		var edges = 0;
		var keys = Object.keys(this.graph);
		var self = this;
		keys.forEach(function(vertex){
			edges += self.graph[vertex].length;
		})
		return edges/2;
	},
	pathBetween : function(from, to, visitList){
		visitList = visitList || [];
		var graph = this.graph;
		if(from == to)
			return visitList.concat(from);
		for (var vertex in graph[from]){
			var nextVertex = graph[from][vertex];
			if(visitList.indexOf(nextVertex)==-1){
				var path = this.pathBetween(nextVertex, to, visitList.concat(from));
				if(path.length)
					return path;
			}
		};
		return [];
	},
	farthestVertex: function(from) {
        var pathLength = 0,
            longestVertex, path;
        for (var vertex in this.graph) {
            path = this.pathBetween(from, vertex);
            if (pathLength < path.length)
                pathLength = path.length, longestVertex = vertex;
        };
        return longestVertex;
    },
    allPaths : function(from, to, visitList, paths){
		visitList = visitList || [];
		paths = paths || [];
		var graph = this.graph;
		if(from == to)
			return paths.push(visitList.concat(from));
		for (vertex in graph[from]){
			var nextVertex = graph[from][vertex];
			if(visitList.indexOf(nextVertex)==-1){
				this.allPaths(nextVertex, to, visitList.concat(from), paths);
			}
		};
		return paths;
	}
}

module.exports = graphs;





















