jsPlumb.ready(function () {

    var j = window.j = jsPlumb.getInstance({Container:canvas, Connector:"StateMachine", Endpoint:["Dot", {radius:3}], Anchor:"Center"});

    j.bind("connection", function(p) {
        p.connection.bind("click", function() {
            j.detach(this);
        });
    });

    // Create start
    j.makeSource("start", {
      paintStyle:{ fillStyle:"red" },
      endpoint:"Dot",
      anchor:"BottomCenter"
    });

    // Create end
    j.makeTarget("end", {
      paintStyle:{ fillStyle:"red" },
      endpoint:"Dot",
      anchor:"TopCenter"
    });

    // delete group button
    j.on(canvas, "click", ".del", function() {
        var g = this.parentNode.getAttribute("group");
        j.removeGroup(g, this.getAttribute("delete-all") != null);
    });

    // collapse/expand group button
    j.on(canvas, "click", ".node-collapse", function() {
        var g = this.parentNode.getAttribute("group"), collapsed = j.hasClass(this.parentNode, "collapsed");

        j[collapsed ? "removeClass" : "addClass"](this.parentNode, "collapsed");
        j[collapsed ? "expandGroup" : "collapseGroup"](g);
    });

    jsPlumb.fire("jsPlumbDemoLoaded", j);

});

// Indexes must be uniques.
var idxAdded = 1

var addStep = function() {
    // Add div on DOM
    $('#canvas').prepend('<div class="group-container" id="container-'+ idxAdded +'">'+
        '<div class="title"></div>'+
        '<div class="del" delete-all></div>'+
        '<div class="node-collapse"></div>'+
        '<div id="c'+ idxAdded +'_START" style="top:0;position:absolute;left:100px;"></div>'+
        '<div id="c'+ idxAdded +'_PRE" class="w" style="left:30px;top:50px">PRE</div>'+
        '<div id="c'+ idxAdded +'_ACTION" class="w" style="left:30px;top:100px">ACTION</div>'+
        '<div id="c'+ idxAdded +'_POST" class="w" style="left:30px;top:150px">POST</div>'+
        '<div id="c'+ idxAdded +'_CLEAN" class="w" style="left:30px;top:200px">CLEAN</div>'+
        '<div id="c'+ idxAdded +'_SUCCESS" style="bottom:0;position:absolute;left:100px;"></div>'+
      '</div>');

    var group = document.getElementById('container-' + idxAdded);

    j.makeSource(group, {
      paintStyle:{ fillStyle:"red" },
      endpoint:"Dot",
      anchor:"BottomCenter"
    });

    // Create end
    j.makeTarget(group, {
      paintStyle:{ fillStyle:"red" },
      endpoint:"Dot",
      anchor:"TopCenter"
    });

    // Add group
    var groupId = "group-" + idxAdded;
    j.addGroup({
        el: group,
        id: groupId,
        constrain:true,
        anchor: [ "Perimeter", { shape:"Circle" } ],
        endpoint: "Dot",
        droppable:false
    });

    // Create Anchors
    var start = document.getElementById('c'+ idxAdded +'_START'),
        pre = document.getElementById('c'+ idxAdded +'_PRE'),
        action = document.getElementById('c'+ idxAdded +'_ACTION'),
        post = document.getElementById('c'+ idxAdded +'_POST'),
        clean = document.getElementById('c'+ idxAdded +'_CLEAN'),
        success = document.getElementById('c'+ idxAdded +'_SUCCESS');

    // Add to group
    j.addToGroup(groupId, start);
    j.addToGroup(groupId, pre);
    j.addToGroup(groupId, action);
    j.addToGroup(groupId, post);
    j.addToGroup(groupId, clean);
    j.addToGroup(groupId, success);

    // Default connections
    j.connect({source: pre, target: success});
    j.connect({source: action, target: start});
    j.connect({source: action, target: success});
    j.connect({source: post, target: start});

    idxAdded++;
};
