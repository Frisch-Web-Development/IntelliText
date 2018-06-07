var G = 0; 
function checkAnnotation(str,full){
	let rawMatch = str.match(/@\w*{.*}/g);
	if(rawMatch != null){
	for(let i = 0; i<rawMatch.length; i++)
	{
		addAnnotation(rawMatch[i].replace(/@(\w+){.*}/,"$1"),rawMatch[i].replace(/@\w+{(.*)}/,"$1"),str.indexOf(rawMatch[i]),true,full); 
	}}

};
function addAnnotation(_name, _content,_index,bool,full)
{ 
	let holder = {
		name: _name,
		content: _content,
		index: _index
	};
	console.log(_content); 
	if(_content != null && _content != ""){	
	configureText(holder,full,bool); }
};


function configureText(holder,full,bool)
{
	//console.log(typeof stuff.ops[0].insert); 
	let stuff = full ;
	console.log(stuff);
	console.log(bool); 
	let length = stuff.ops[0].insert.length; 
	if(bool){
	for(let i = 0; i<stuff.ops.length; i++)
	{
		if(typeof stuff.ops[i].insert == 'string' )
		{
			if(stuff.ops[i].insert.indexOf('@' + holder.name + '{' + holder.content + '}') != -1){
			console.log(stuff.ops[i].insert); 
			let initalString = stuff.ops[i].insert; 	
			let one = initalString.match(/(.*)@\w+{.*}/s);
			//console.log(one[1]); 
			let two = initalString.match(/@\w+{(.*)}/s)
			//console.log("two " + two[1]); 
			let three = " " + initalString.substring(initalString.indexOf("{" + two[1] + "}") + two[1].length+2, initalString.length); 
			//console.log(three); 
			stuff.ops[i].insert = one[1]; 
			stuff.ops.splice(i+1,0, {attributes: {annotation: true,name:holder.name}, insert:two[1]});  //TODO make it work with other attributes//
			stuff.ops.splice(i+2,0, {insert:three}); 
			//console.log(stuff); 
			setContent(stuff); 	
			} 
		}
	}}
	else{
		let I = findIndex(stuff,holder); 
		let i = I.index; 
		holder = I.holder; 
		console.log("run3"); 
		let initalString = stuff.ops[i].insert; 
		let string = initalString.substring(0,holder.index)+ "@" + holder.name + "{" + holder.content + "}" + initalString.substring(holder.index+holder.content.length,initalString.length); 
		stuff.ops[i].insert = string; 
		console.log(string); 
		console.log(stuff); 
		configureText(holder, stuff,true); 	
	}
	
	
};


var findIndex = function(stuff,holder)
{
	var index = 0; 
	var length = 0; 
	for(let i = 0; i<stuff.ops.length; i++)
	{
		if(typeof stuff.ops[i].insert == 'string' && length+stuff.ops[i].insert.length<holder.index)
		{
			console.log("run if 1", i); 
			console.log(stuff.ops[i].insert.length); 
			length += stuff.ops[i].insert.length
			index = i; 
		}
		else if(typeof stuff.ops[i].insert != 'string'){
			console.log("run if 2",i); 
			length++; 
			index = i; 
		}
		else {
			console.log("run if 3",i); 
			index = i; 
			i= stuff.ops.length+1; 
		}
	}
	holder.index = holder.index-length; 
	console.log(index); 
	console.log(holder.index); 
	return {index: index, holder: holder}; 
}; 


function renderTooltip()
{
	let myDiv = $(".tool-true")
			myDiv.each(function(index){
				let classes = $(this).attr('class').split(' '); 
				let name = classes[1].substring(classes[1].indexOf("name-")+5,classes[1].length); 
				console.log(name); 
				$(this).attr('title',name); 
			}); 	
			$(".tool-true").tooltipster({theme: 'tooltipster-noir'});
			$(".tool-true").off('DOMSubtreeModified');
			$(".tool-true").off('DOMNodeRemoved');
			$(".tool-true").on('DOMNodeRemoved',function(){
				console.log(typeof $(this).attr("class")); 
				let t = []; 
				t = $(this).attr("class").split(" ");
				console.log(t[1].substring(t[1].indexOf("-")+1));
				
				updateAnnotationList({name: t[1].substring(t[1].indexOf("-")+1),content:$(this).html() });  
			});
		
		//	console.log("ehh What");
			$(".tool-true").on('DOMSubtreeModified',function(){
				updateAnnotationList(null); 
			}); 
	updateAnnotationList(null); 		
	
}; 
var getTooltips = function()
{
	var array = []; 
	$(".tool-true").each(function(index){
		array.push({JQuery: $(this), name: $(this).attr('class').split(' ')[1].substring($(this).attr('class').split(' ')[1].indexOf("name-")+5), content:$(this).html()}); 
	});
	return array; 	
	
}


var listOfNames = function (obj) 
{
	var tooltips = getTooltips(); 
	var names = []; 
	var actualNames = []
	for(let i = 0; i<tooltips.length; i++)
	{
		console.log(names); 
		console.log(names.includes(tooltips[i].name)); 
		
		if(!actualNames.includes(tooltips[i].name)){
		names.push({name: tooltips[i].name, contents: [tooltips[i].content]});
		actualNames.push(tooltips[i].name); 
		console.log("run?"); 
		}
		else{
			for(let j = 0; j<names.length; j++)
			{
				if(names[j].name == tooltips[i].name)
				{
					names[j].contents.push(tooltips[i].content); 
				}
			}
		}
	}
	if(obj != null){
	console.log(obj);
	for(let i = 0; i<names.length; i++)
	{
		if(names[i].name == obj.name)
		{
			for(let j = 0; j<names[i].contents.length; j++)
			{
				if(names[i].contents[j] == obj.content)
				{
					console.log(names[i]);
					console.log(names[i].contents[j]); 
					names[i].contents.splice(j,1);
					console.log(names[i]);
					j = names[i].contents.length+1; 
				}
			}
			console.log(names[i].contents.length == 0)
			if(names[i].contents.length == 0)
			{
				console.log("RUN NOW");
				names.splice(i,1);
			}
			i = names.length+1; 
		}
	}
	console.log(names);
	}
	return names; 
}

function updateAnnotationList(obj)
{
	var names = listOfNames(obj); 
	var myDiv = $("ul#annotation"); 
	myDiv.html(""); 
	console.log(names);  
	for(let i = 0; i<names.length; i++)
	{
		myDiv.append("<h4>" + names[i].name + "</h4> <ul>");
		for(let j = 0; j<names[i].contents.length; j++)
		{
			myDiv.append("<li>" +names[i].contents[j] + "</li>");  
		}
		myDiv.append("</ul"); 
	}
}

