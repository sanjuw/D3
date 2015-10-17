function forceLayout(parentId, configuration) {
	this.parentId = parentId;
	// Configuration function
	this.configure = function(configuration)
	{
		this.config = configuration;
		this.config.w = configuration.w || 480;
		this.config.h = configuration.h || 480;
	}
	
	// Function to add a node
	this.addNode = function (id) {
		nodes.push({"id": id});
		update();
	};
	// Function to delete a node given its id
	this.removeNode = function (id) {
		var i = 0;
		var n = findNode(id);
		// Delete all links to or from this node
		while (i < links.length) {
			if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
				links.splice(i, 1);
			}
			else i++;
		}
		// Then remove the node itself
		nodes.splice(findNodeIndex(id), 1);
		update();
	};
	// Function to remove a link given its source and target ids
	this.removeLink = function (source, target) {
		for (var i = 0; i < links.length; i++) {
			if (links[i].source.id == source && links[i].target.id == target) {
				links.splice(i, 1);
				break;
			}
		}
		update();
	};
	// Function to remove all links
	this.removeallLinks = function () {
		links.splice(0, links.length);
		update();
	};
	// Function to remove all nodes
	this.removeAllNodes = function () {
		links.splice(0, links.length);
		nodes.splice(0, nodes.length);
		update();
	};
	// Function to add a link
	this.addLink = function (source, target, value) {
		links.push({"source": findNode(source), "target": findNode(target), "value": value});
		update();
	};
	// Private function to find a node in the node array given its id
	var findNode = function (id) {
		for (var i in nodes) {
			if (nodes[i]["id"] === id) return nodes[i];
		}
		;
	};
	// Private function to find a node's index given its id
	var findNodeIndex = function (id) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].id == id) {
				return i;
			}
		}
		;
	};
	// Private function to update the force layout
	var update = function () {
		var drag = force.drag().on("dragstart", dragstart);
		// Bind the links array to all the lines
		var link = parentContainer.selectAll("line")
			.data(links, function (d) {return d.source.id + "-" + d.target.id;});
		// New lines (links) are inserted rather than appended so they appear behind the nodes
		link.enter().insert("line", ".node")
			.attr("stroke-width", function (d) {return d.value / 10;})
			.attr("class", "link");
		// Removed lines (links)
		link.exit().remove();
		// Bind the nodes array to the groups
		var node = parentContainer.selectAll("g.node")
			.data(nodes, function (d) {return d.id;});
		// Append a group for new nodes
		var nodeEnter = node.enter().append("g")
			.attr("class", "node")
			.call(force.drag)
			.on("dblclick", dblclick);
		// Each group has a circle
		nodeEnter.append("svg:circle")
			.attr("r", 12)
			.attr("class", "nodecircleclass")
			.attr("fill", function(d) { return color(d.id); });
		// Each group has text
		nodeEnter.append("svg:text")
			.attr("class", "nodetextclass")
			.attr("x", 13)
			.attr("y", ".31em")
			.text(function (d) {
				return d.id;
			});
		// Delete nodes
		node.exit().remove();
		// Attach the tick function to the force layout
		force.on("tick", tick);

		// Restart the force layout.
		force
			.charge(-400)
			.linkDistance(40)
			.size([w, h])
			.start();
		// This function is called during every simulation tick
		function tick () {
			// Update the x and y coordinates of the node groups
			node.attr("transform", function (d) {return "translate(" + d.x + "," + d.y + ")";});
			// Update the endpoint coordinates of each link
			link.attr("x1", function (d) {return d.source.x;})
				.attr("y1", function (d) {return d.source.y;})
				.attr("x2", function (d) {return d.target.x;})
				.attr("y2", function (d) {return d.target.y;});
		};
		// When a node is double-clicked let it float in the simulation
		function dblclick(d) {
			d3.select(this).classed("fixednode", function(d){d.fixed = false; return false;});
		}
		// When a node is dragged make it "sticky"
		function dragstart(d) {
			d3.select(this).classed("fixednode", function(d){d.fixed = true; return true;});
		}
	};
	
	// --------- End of functions ---------
	
	// Configure this object
	this.configure(configuration);
	var w = this.config.w;
	var h = this.config.h;

	var color = d3.scale.category10();

	var parentContainer = d3.select('#'+parentId)
		.append("svg:svg")
		.attr("width", w)
		.attr("height", h)
		.attr("style", "position:relative; left:0px; top:0px;")
		.attr("id", parentId+'Svg')
		.attr("pointer-events", "all")
		.attr("viewBox", "0 0 " + w + " " + h)
		.attr("perserveAspectRatio", "xMinYMid")
		.append('svg:g');

	var force = d3.layout.force()
		.charge(-400)
		.size([w, h])
		.linkDistance(40)
		;
	
	var nodes = force.nodes();
	var links = force.links();

	update();
}

