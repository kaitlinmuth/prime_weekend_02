//create an array to store the names of group members
var groupMembers = ['Claire', 'Rom', 'Kaitlin', 'Mary', 'Luke', 'Erik', 'Tracey', 'Michelle', 'Steve', 'Cody', 'Kelly', 'Chelsea', 'Casie', 'Brian', 'Alicia', 'Michael', 'Terry', 'Vince', 'Aaron', 'Jeanne'];


//Generate a random integer given a minimum and maximum range value
//Author: Scott Bromander
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

function findEmpty(index, array){
	if (array[index] == undefined){
		return index;
	} else {
		var newIndex = index+1;
		if (newIndex >= 20){
			newIndex = 0;
		}
		return findEmpty(newIndex, array);
	}
}

function randomArray(array){
	var randArray = [];
	randArray.length = array.length;
	for (var i=0; i<array.length; i++){
		var j = randomNumber(0,array.length-1);
		j = findEmpty(j, randArray);
		randArray[j] = array[i];
	}
	return randArray;
}

$(document).ready(function(){
	$(".btn").on('click', function(){
		var numGroups = $(this).text();
		var randomList = randomArray(groupMembers);
		var groupSize = Math.floor(groupMembers.length/numGroups);
		console.log(groupSize);
		for (var i =0; i<numGroups; i++){
			$("#content").append("<div class='groupCol'><h2>Group "+(i+1)+"</h2><ul id='group"+(i+1)+"'></ul></div>");		
			for (var k=0; k<groupSize; k++){
				var newMember = randomList.shift();
				console.log(randomList);
				$("#content").children().children("#group"+(i+1)).append("<li>"+newMember+"</li>");
			}
		}
	});	
});