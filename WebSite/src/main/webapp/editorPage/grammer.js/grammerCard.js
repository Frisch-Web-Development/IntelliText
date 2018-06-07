var globalGrammer; 

var getGrammer = function (text)
{
	globalGrammer = 0; 
	var freq = getWordFrequency(text);  // returns a dictionary of words with the amount of times the word has been said if it is over a threshold. 
	//var period = getDistanceBetween(text,".",200,[]); 
	//var comma = getDistanceBetween(text,",",400,[]); 
	
	//globalGrammer = {overflowWords: freq, underflowPeriod: period, underflowComma: comma}; 
	////console.log(globalGrammer);
	return freq; 
	

};

var getWordFrequency = function(str)
{

	let blacklist = ["in","the","on","if","a","i"]; // add more to this 
	let lStr = str.toLowerCase(); 
	var dict = {};
	let regex = /\b[a-zA-Z]+'?[a-zA-Z]?\b/g;
	let array = lStr.match(regex);
	if(array == null)
	{
		return null; 
	}
	//if(array == null){return null;}
//	console.log(array); // array is good
	var lastWorld = "";
	var currentKey = ""; 
	let cc = 0; 
	for(let i = 0; i<array.length; i++)
	{
		let word = array[i];
		if(dict[word] == null && !(blacklist.includes(word)))
		{
			dict[word] = 1; 
			//cc++; 
		}
		else {
			dict[word] ++; 
		}
		lastWorld = word; 

		
	};
	//console.log(dict);
	let overflow = 15; 
	for(var key in dict)
	{
		if(dict[key] != null && dict[key] >= overflow){
			cc++; 
		}	
	};
	
	let wordArray = []; 
	var counter = 0; 
	//console.log(dict);
	//console.log(cc);
	 for (var key in dict) {
		currentKey = key; 
    // check if the property/key is defined in the object itself, not in parent
    if (dict.hasOwnProperty(key)) {           
	if(dict[key] != null && dict[key] >= overflow)
	{
		
		////console.log(dict); 
		let overFlowWord = {
			word: key, 
			amount: dict[key],
			synonyms: []
		
		}; 
		
		
		 $.ajax({
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': "*"
            },
            method: "GET",
            dataType: "jsonp",
			//url: 'https://en.wikipedia.org/api/rest_v1/page/html/' + title
            url: 'http://thesaurus.altervista.org/thesaurus/v1?word=' + encodeURIComponent(overFlowWord.word) + '&language=en_US&output=json&key=HbqgolDXeWZPbmdMbwKF&callback=process'
        }).done(function(response) {
			////console.log(response); 
			let ob = response; 
			//let ob = JSON.parse(response.responseText.substring(8,response.responseText.length-1)); 
		    ////console.log("word: " + overFlowWord.word);
		    ////console.log(ob.response.length);
			for(let i = 0; i<ob.response.length; i++ )
			{
				////console.log(ob.response[i]); 
				overFlowWord.synonyms.push(ob.response[i].list.synonyms); ; 
				
			}
			////console.log(overFlowWord); 
		wordArray.push(overFlowWord);
		////console.log(wordArray); 
		 	counter++; 
			//console.log(counter);
			setGrammer(wordArray,str); 

		});
		
	 
	}	
    }
	
	
} 

return cc;
	
	
	
};

var getGram = function()
{
	return globalGrammer;
	
}
function setGrammer(val,text)
{
	globalGrammer = {overflowWords: val,underflowPeriod:getDistanceBetween(text,".",250,[])/* ,underflowComma:getDistanceBetween(text,",",200,[]) */}
	
}





var getDistanceBetween = function (str,item,threshold,fullList)
{
	function check(string)
	{
		if(string.length >= threshold){
			let words = string.split(" ");
			{
				var infrequent = {
					first: [words[0],words[1],words[3]],
					last : [words[words.length-1],words[words.length-2],words[words.length-3]],
					distance: string.length
				};
			}
			fullList.push(infrequent); 
		}
		
	};
	
	if(str.indexOf(item) != -1){
		let text = str.substring(0,str.indexOf(item)); 
		console.log(text.length);
		check(text);
		getDistanceBetween(str.substring(str.indexOf(item)+1,str.length),item,threshold,fullList); 
	}
	else
	{
		check(str);
		return fullList; 
	}
	
};


//Get synonyms
//http://thesaurus.altervista.org/thesaurus/v1?word=peace&language=en_US&output=json&key=HbqgolDXeWZPbmdMbwKF&callback=process