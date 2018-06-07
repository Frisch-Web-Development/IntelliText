//$(document).ready(function(){addCard("grammer","fuck",'https://www.geddesandgrosset.com/products/13-large.jpg','kh',"cards");addCard("grammer","duck",'https://www.geddesandgrosset.com/products/13-large.jpg','kh',"cards");});
function checkCards(contents, text,id){
	let maths = findMath(contents); 
	let grammer = "";
	 for(let i = 0; i<maths.length; i++)
	{
		console.log(maths[i]); 
		let str = "Zeroes = " + maths[i].zero[0]; 
		addCard("math",maths[i].equasion,null,str,id)
	} 
	
	let grammerNumber = getWordFrequency(text); 
//	console.log(grammerNumber); 
	//updateGrammer(grammer,id); 
	let counter = 0; 
	$( document ).ajaxComplete(function( event, xhr, settings ) {
		//console.log(settings.url.indexOf('http://thesaurus.altervista.org') != -1);
		//console.log(settings.url); 
		if(settings.url.indexOf('http://thesaurus.altervista.org') != -1)
		{
			counter++; 
			
		}
		if(counter == grammerNumber)
		{
			grammer = getGram(); 
			console.log(grammer);
			updateGrammer(grammer,id);
			
		}
		
}); 


	
	
}


function addCard(type,title,image,text,id){
	console.log("run");
	var html = '<div class ="' + type + '" ><h4 class = "title small clickable">' + type.substring(0,1).toUpperCase() + type.substring(1) + '</h4> <h2 class = "title small clickable">' + title + '</h2>';
	
	if(type == "grammer")
	{
		html += ' <img class = "small clickable" src = "' + image + '"> ';
	}
	else if (type == "math" && image == null)
	{
		html+= '<div class = "image small" id = "empty"> </div> ' ;
	}
	
	html += ' <h2 class = "text small clickable">' + text + '</h2></div>';
	
	if(type == "math")
	{
		let len = $(".grammer").length + $(".math").length + $("research").length + 1;
		html = html.substring(0,html.length - 6) +'<button class="btn small" data-toggle="modal" data-target="#mathModal' + (len) + '"">expand</button>' + html.substring(html.length - 6); 
	}
	
	
	$("#" + id).append(html); 
	if(type == "math") 
	{	
		let len = $(".grammer").length + $(".math").length + $("research").length ;
		let elt = document.getElementById("empty");
		let calculator = Desmos.GraphingCalculator(elt,{exspression: true, settingsMenu: false, expressionsTopbar: false,expressionsCollapsed: true } );
		calculator.setExpression({id:'graph1', latex:title});
		$("#empty").removeAttr("id"); 
		$("#modals").append('<div class="fade modal"role=dialog aria-hidden=true aria-labelledby=exampleModalCenterTitle id="mathModal' +len + '"tabindex=-1><div class="modal-dialog modal-dialog-centered"role=document><div class=modal-content><div class=modal-header><h3 class=modal-title id=exampleModalLongTitle style = "text-align: center;">' + title + '</h3><div id = "graph' + len+'" style="width:500px; height:600px;"> </div><button class=close type=button data-dismiss=modal aria-label=Close><span aria-hidden=true>×</span></button></div><div class=modal-body>...</div><div class=modal-footer><button class="btn btn-secondary"type=button data-dismiss=modal>Close</button> </div></div></div></div>'); 
		let elt2 = document.getElementById("graph" + len);
		let calculator2 = Desmos.GraphingCalculator(elt2,{exspression: true, settingsMenu: false, expressionsTopbar: false,expressionsCollapsed: true } );
		calculator2.setExpression({id:'graph1', latex:title});
		$(".dcg-show-expressions-tab").remove();
	}
	$(".clickable").off("click"); 
	$(".clickable").click(handler); 
		
	
};

function handler(){
		$(this).parent().children().toggleClass("full"); 
		$(this).parent().children().toggleClass("small"); 
}


function updateGrammer(grammer,id)
{
	//start with OverflowWords
	grammerCards = []; 
	$(".grammer").each(function(index){
		console.log("testing")
		console.log($(this).find("h2.title").text()); 
		grammerCards.push($(this)); 
		
	});
	
	let overFlow = grammer.overflowWords; 
	
	for(let i = 0; i<overFlow.length; i++)
	{
		for(let j = 0; j<grammerCards.length; j++)
		{
			if(overFlow[i] != 0 && grammerCards[j].find("h2.title").text() == overFlow[i].word + " synonyms")
			{
				console.log("stuff and thignss");
				grammerCards[j].find("h2.text").html(synonymTextBuilder(overFlow[i]));
				overFlow[i] = 0; 
				grammerCards[j] == 0; 
			}				
		}
		if(overFlow[i] != 0)
		{
			addCard("grammer",overFlow[i].word + " synonyms",'https://www.geddesandgrosset.com/products/13-large.jpg',synonymTextBuilder(overFlow[i]),id);
		}
	}	
	//commas and periods
	for(let i = 0; i<grammerCards.length; i++)
	{
		if(grammerCards[i].find("h2.title").text() == "Commas" || grammerCards[i].find("h2.title").text() == "Periods"){
			grammerCards[i].remove(); 
		}
	}
	
	for(let i = 0; i<grammer.underflowPeriod.length; i++)
	{
		addCard("grammer","Periods",'https://media.tenor.com/images/6f95fb9ab0cffb399bd63797cc3d9af4/tenor.gif',distanceTextBuilder(grammer.underflowPeriod[i],"period"),id);
	}
	/* for(let i = 0; i<grammer.underflowComma.length; i++)
	{
		addCard("grammer","Commas",'https://brevity.files.wordpress.com/2010/04/comma-splice.jpg',distanceTextBuilder(grammer.underflowComma[i],"comma"),id);
	} */
	
	
	
};

var synonymTextBuilder = function(grammer){
	let synonums = grammer.synonyms[0].split("|"); 
	let string = "You've used ths world " + grammer.amount + " times try using " + synonums[0] + ", " + synonums[1] + ", and " + synonums[2]; 
	return string; 
};

var distanceTextBuilder = function(grammer,type)
{
	let distance = grammer.distance; 
	let string = "You haven't used a " + type + "in " + distance + "chracters, between the words " + grammer.first[0] + " " + grammer.first[1] + " " + grammer.first[2] + " and " + grammer.last[0] + " " + grammer.last[1] + " " + grammer.last[2]
	return string; 
};

	
	