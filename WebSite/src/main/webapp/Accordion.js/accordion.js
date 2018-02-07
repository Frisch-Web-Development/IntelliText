var prop = {type : "", parentDiv : "", listP : "", theme : ""};
var defaults = {
		type : "accordion",
		theme: "dark",
		parentDiv : "#accordion",
		listP : ""
	};

function generateAccordion(properties) {
		
    var list = properties.listP;
    var listOfStrings = [];
    var maximumDepth = 0;
    var html = [];

    checkParams(properties.parentDiv, properties.listP, properties.type, properties.theme);

    for (let i = 0, len = list.length; i < len; i++) {
        console.log(list[i].path);
        listOfStrings.push(list[i].path);

        var counter = 0;
        for (let x = 0; x < list[i].path.length; x++) {
            if (list[i].path.charAt(x) == '/') {
                counter++;
            }
        }
        if (counter >= maximumDepth) {
            maximumDepth = counter;
        }
    }

    if (prop.type == "accordion") {
        var root = $("<ul id = 'tree'>").appendTo(prop.parentDiv);
        var elements = {};
        $.each(list, function() {
            var parent = elements[this.path.substr(0, this.path.lastIndexOf("/"))];
            var list = parent ? parent.next("ul") : root;

            if (!list.length) {
                list = $("<ul>").insertAfter(parent);
            }

            var color = this.color;

            var blackText = true;
            if (((hex2rgb(this.color, 1.0).r + hex2rgb(this.color, 1.0).g + hex2rgb(this.color, 1.0).b) / 3.0) < 186) {
                blackText = false;
            }



            var item = $("<li>").hover(function() {
                    $(this).css("background-color", ('#' + color));
                },
                function() {
                    if (prop.theme == "dark") {
                        $(this).css("background-color", "black");
                    }
                    if (prop.theme == "light") {
                        $(this).css("background-color", "white");
                    }
                }).css("border-color", ("#" + color)).css("background-color", function() {
				if (prop.theme == "dark") {
                    return "black";
                } else if (prop.theme == "light") {
                    return "white";
                }
            }).appendTo(list);
            var mySpan = $("<span>").text(this.name).attr("id", this.path).hover(function() {
                    if (prop.theme == "dark") {
                        if (blackText) {
                            $(this).css("color", "black");
                        } else {
                            $(this).css("color", "white");
                        }
                    }
                    if (prop.theme == "light") {
                        if (blackText) {
                            $(this).css("color", "white");
                        } else {
                            $(this).css("color", "black");
                        }
                    }
                },
                function() {
                    if (prop.theme == "dark") {
                        $(this).css("color", "white");
                    }
                    if (prop.theme == "light") {
                        $(this).css("color", "black");
                    }
                }).css("color", function() {
                if (prop.theme == "dark") {
                    return "white";
                } else if (prop.theme == "light") {
                    return "black";
                }
            }).appendTo(item);

            var icon;
            if (this.type == "folder") {
                icon = $("<i class='fa fa-folder'></i>").appendTo(mySpan);
            } else if (this.type == "file") {
                icon = $("<i class='fa fa-file'></i>").appendTo(mySpan);
            }
            elements[this.path] = item;
        });
        $("ul ul").hide();
    }
    runAccordion();
	
    return "<ul>" + html.join("") + "</ul>";
}

function checkParams(parentDiv, listP, type, theme) {
    if (type != "accordion") {
		if(type == null){
			prop.type = defaults.type;
		}
		else{
			$("<h3 style = 'text-align:center; color : red;'>Error in Accordion.js init</h3><p style = 'text-align:center'>Message: Type " + type + " is invalid.</p>").appendTo(parentDiv);
		}
    }
	else {
		prop.type = type;
	}
    if (theme != "dark" && theme != "light") {		
		if(theme == null){
			prop.theme = defaults.theme;
		}
		else{
			$("<h3 style = 'text-align:center; color : red;'>Error in Accordion.js init</h3><p style = 'text-align:center; color : red;'>Message: Theme '" + theme + "' is invalid.</p>").appendTo(parentDiv);
		}
    }
	else{
		prop.theme = theme;
	}
	if(parentDiv == null || parentDiv == "undefined"){
		prop.parentDiv = defaults.parentDiv;
	}
	else{
		prop.parentDiv = parentDiv;
	}
	if (listP == null || listP.length <= 0) {
        $("<h3 style = 'text-align:center; color : red;'>Error in Accordion.js init</h3><p style = 'text-align:center'>Message: Object list is empty.</p>").appendTo(prop.parentDiv);
    }
}


function hex2rgb(hex, opacity) {
    var h = hex.replace('#', '');
    h = h.match(new RegExp('(.{' + h.length / 3 + '})', 'g'));
    for (var i = 0; i < h.length; i++) {
        h[i] = parseInt(h[i].length == 1 ? h[i] + h[i] : h[i], 16);
    }
    return { // return as json for seperate vals
        r: h[0],
        g: h[1],
        b: h[2]
    };
};

function runAccordion(){
	$('li').click(function(e) { 
		$(this).next("ul").slideToggle();
    });	
}