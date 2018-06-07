/*
List of Regex stuff: 
get infobox: {{Infobox\s(.+)\s (get group 1) 
finds all images ^\|\simage.*$ (might want to edit to grab the image name to get the image) 

*/



var myTemp = 0; 
var blacklist = []; 
var getResarch = function(str,id) {
		//var info = information("New York City");
		//let a = '<a href="/wiki/Thanos" title="Thanos">Thanos</a>'.replace(/"\/wiki\/(\w*)"/g,'"https://en.wikipedia.org/wiki/$1'); 
		//console.log(info); 
		//myTemp = info; 
		// (?<!^)(?<!\. ) This was below this at the begginign. 
		let regex = /(?<!^)(?<!\. )[A-Z]{1,1}[a-z]+([\s]([A-Z]{1,1}[a-z]+|in|the|of|a|an|nor|but|yet|so))*(?<!(in|the|of|a|an|nor|but|yet|so))/g;
		let arr = str.match(regex);
		 if(arr != null){
			for(let i = 0; i<arr.length; i++)
			{
				if(!blacklist.includes(arr[i])){
					console.log(arr[i]);
					information(arr[i],id);
					blacklist.push(arr[i]);
				}
			}
		} 
		// if(!blacklist.includes("Elon Musk")){
		// information("Elon Musk",id);
		// blacklist.push("Elon Musk");}
		// else if(!blacklist.includes("New York City")){information('New York City',id);}
		

};

var information = function(search,id) {
    //console.log(search);
	var title = "";
    var stuff = "";
	let possibleTitles = []; 
    $.ajax({
        headers: {
            'Content-Type': "application/json",
            'Access-Control-Allow-Origin': "*"
        },
        method: "GET",
        dataType: "jsonp",
		async: false, 
        url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent(search)
    }).done(function(result) {
        console.log(result); 
		possibleTitles = result[1]
        title = determineTitle(search, possibleTitles);
		console.log(title);
		//if(blacklist.includes(title)){return 0;}
        $.ajax({
            headers: {
                'Content-Type': "application/javascript",
                'Access-Control-Allow-Origin': "*"
            },
            method: "GET",
			async: false, 
            dataType: "jsonp",
			//url: 'https://en.wikipedia.org/api/rest_v1/page/html/' + title
            url: 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvlimit=1&format=json&rvprop=content&rvparse=&titles=' + encodeURIComponent(title)
        }).done(function(result) {
			//console.log(result);
            //console.log(Object.keys(result.query.pages)[0]); 
            stuff = result.query.pages[Object.keys(result.query.pages)[0]].revisions["0"]["*"];
			//console.log(stuff);
            console.log(stuff.indexOf('<div class="redirectMsg">')); 

            if (stuff.indexOf('<div class="redirectMsg">')!= -1) {
				let regex = /title="((\w|\s)*)/;
                //console.log(stuff.match(regex)[1]);
                
                information(stuff.match(regex)[1]);

            }
			else{
			stuff = addHttps(stuff); 
			console.log("ran????????????");
			let name = ""; 
			if(title.indexOf(" ") != -1)
			{
				name = title.substring(0,title.indexOf(" "));
			}
			else{
				name = title; 
			}
			$("#"+id).append('<div class = "inactiveLink" id="'+name +'"></div>')
			$("#"+name).append(stuff);
			console.log($("#" +name).find("table.infobox").html());
			if($("#" +name).find("table.infobox").html() != null){
			$("#"+name).html($("#" +name).find("table.infobox").html());
			$("#"+name).find("tr").slice(4).wrap('<div class="hidden"></div>');
			$("#"+name).click(func);
			console.log("hello"); 
			}
			else{
			$("#"+ name).html("No infoBox available"); 
			//information(getNewerTitle(possibleTitles,name,search));
			$("#" + name).remove(); 	
			
			}
			 
            
		}


        });
    });
	console.log("stuff and things"); 
	return ($("table.infobox").html());
	

	//https://en.wikipedia.org/api/rest_v1/page/html/ //this one I can't get working
	//https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&rvparse=&titles= //idk what this is going to do
	//https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles= // original that gets data





}

var addHttps = function(html)	
{
	var string = html.replace(/\/\/upload/g,'https://upload'); 
	string = string.replace(/"\/wiki\/(\w*)"/g,'"https://en.wikipedia.org/wiki/$1"'); 
	return string;
	
}

var levenshteinDistance = function(a, b){
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};


var determineTitle = function(original,array)
{
	let min = 100000000; 
	let term = ""; 
	for(let i = 0; i<array.length; i++)
	{
		let string = array[i];
		//console.log(string);
		let num = levenshteinDistance(original,string); 
		if(num < min)
		{
			min = num
			term = string; 
		}
	}
	//console.log("term: "+term);
	return term; 
		
}

var getNewerTitle = function(array,value,search)
{
	var newArray = []; 
	for(let i = 0; i<array.length; i++)
	{
		if(value != array[i])
		{
			newArray.push(array[i]); 
		}
	}
	//console.log(NewArray
	return determineTitle(search,newArray)
}


function func(){
	console.log("fuck u");
	if($(this).children().find(".hidden").length > 0){
	$(this).children().find(".hidden").removeClass('hidden').addClass('notHidden');}
	else{
	$(this).children().find(".notHidden").removeClass("notHidden").addClass("hidden");}
	$(this).off("click");
	$(this).click(func);		
}