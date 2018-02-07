var one = {
    name: "one",
    path: "/one",
	color: "f4dc41",
	type: "folder"
}
var two = {
    name: "two",
    path: "/two",
	color: "d3d3d3",
	type: "folder"
}
var three = {
    name: "three",
    path: "/three",
	color: "41dcf4",
	type: "folder"
}
var oneOne = {
    name: "oneOne",
    path: "/one/oneOne",
	color: "417ff4",
	type: "folder"
}
var oneTwo = {
    name: "oneTwo",
    path: "/one/oneTwo",
	color: "41f4ac",
	type: "file"
}
var twoOne = {
    name: "twoOne",
    path: "/two/twoOne",
	color: "41f4ac",
	type: "folder"
}
var twoOneOne = {
    name: "twoOneOne",
    path: "/two/twoOne/twoOneOne",
	color: "76f441",
	type: "file"
}

var objects = [one, two, three, oneOne, oneTwo, twoOne, twoOneOne];


$(document).ready(function() {	
    generateAccordion({listP : objects});
});