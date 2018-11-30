var doneList = []; 

var findMath = function(quill)
{
	let equasion = ""; 
	let mathInfo = []; 
	for(let i = 0; i<quill.ops.length; i++)
	{
		if(quill.ops[i].insert.hasOwnProperty("formula"))
		{
			 
			equasion = quill.ops[i].insert.formula; 
			let bool = true; 
			for(let j = 0; j<doneList.length; j++)
			{
				if(doneList[j] == equasion)
				{
					bool = false; 
				}
			}
			if(bool)
			{
			
				doneList.push(equasion); 
				mathInfo.push(getMath(equasion)); 
			}
			
		}
	}
	return mathInfo; 

	
};



var getMath = function (eq)
{
	var zeros = getStuff("http://api.wolframalpha.com/v2/query?appid=YRVH38-J3JRL4T888&input=what+are+zeroes+of+function+",eq);
	var Y = getStuff("http://api.wolframalpha.com/v2/query?appid=YRVH38-J3JRL4T888&input=what+are+y+intercepts+of+function+",eq);
	var max = getStuff("http://api.wolframalpha.com/v2/query?appid=YRVH38-J3JRL4T888&input=what+is+the+maximum+of+",eq);
	var min = getStuff("http://api.wolframalpha.com/v2/query?appid=YRVH38-J3JRL4T888&input=what+is+the+minimum+of+",eq);
	console.log({zero: zeros,yIntercept: Y,maximum: max,minimum:min }); 
	return {equasion: eq, zero: zeros,yIntercept: Y,maximum: max,minimum:min };
};

var getStuff = function (stuff,equasion)
{
	var zero = []; 
	$.ajax({headers: {
				'Content-Type': "application/json",
				'Access-Control-Allow-Origin' : "*"
			},
			method: "GET",
			dataType: "jsonp",
            url: ""+stuff + encodeURIComponent(equasion) + "&output=json"}).done(function(result) {
				//console.log(result.queryresult); 
				for(let i = 0; i<result.queryresult.pods[1].subpods.length; i++)
				{
					zero[i] = result.queryresult.pods[1].subpods[i].plaintext;
					
					
				}
				
    });
	return zero;
}