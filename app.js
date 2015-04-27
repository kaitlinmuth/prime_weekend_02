//create an array to store the names of group members
var groupMembers = ['Claire', 'Rom', 'Kaitlin', 'Mary', 'Luke', 'Erik', 'Tracey', 'Michelle', 'Steve', 'Cody', 'Kelly', 'Chelsea', 'Casie', 'Brian', 'Alicia', 'Michael', 'Terry', 'Vince', 'Aaron', 'Jeanne'];

//initialize the variable teamSize, which will be used to track whether the page is in team size select mode,
// and if so, the size of team selected by the user
var teamSize = false;
//initialize the variable numGroups, which will be used to track whether the page is in group number select mode,
// and if so, the number of groups selected by the user
var numGroups = true;
// initialize the variable generated, which will be used to track whether the page has content generated
// (which needs to be cleaned out before additional content is generated)
var generated = false;

//Generate a random integer given a minimum and maximum range value
//Author: Scott Bromander
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

// given an array, return the same array with the contents reassigned to random indices
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
//given an index number and array, determine if the index points to content;
// if if does, iterate until an empty index is found
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

function generateTeams(){
	//check for user input of team number or team size
	if (numGroups > 0 || teamSize > 0) {
		generated = true;
		var randomList = randomArray(groupMembers);
		//instantiate a local groupSize so as not to conflict with global teamSize
		if (numGroups) {
			var groupSize = Math.floor(groupMembers.length / numGroups);
		} else if (teamSize) {
			var groupSize = teamSize;
			numGroups = Math.floor(groupMembers.length / groupSize);
		}

		//put the correct number of students into each group
		for (var i = 0; i < numGroups; i++) {
			$("#content").children("#teams").append("<div class='groupCol'><h2>Team " + (i + 1) + "</h2><ul id='group" + (i + 1) + "'></ul></div>");
			$("#content").children("#teams").children(".groupCol").hide();



			for (var k = 0; k < groupSize; k++) {
				var newMember = randomList.shift();
				$("#content").children("#teams").children().children("#group" + (i + 1)).append("<li>" + newMember + "</li>");
				$("#content").find("#group" + (i + 1)).children().hide();
			}
		}

		//if there are remainders, deal with them based on the app mode
		if (randomList.length > 0) {
			// for numGroup mode, divide the remainders among existing groups
			if (!teamSize) {
				for (var l = 0; l < numGroups; l++) {
					var newMember = randomList.shift();
					if (newMember != undefined) {
						$("#content").children("#teams").children().children("#group" + (l + 1)).append("<li>" + newMember + "</li>");
						$("#content").find("#group" + (l + 1)).children().hide();
					}
				}
			}

			//for teamSize mode, create one new group with all the remainders
			if (teamSize) {
				var remainders = randomList.length;
				$("#content").children("#teams").append("<div class='groupCol'><h2>Team " + (numGroups + 1) + "</h2><ul id='group" + (numGroups + 1) + "'></ul></div>");
				$("#content").find(".groupCol").hide();
				for (var l = 0; l < remainders; l++) {
					var newMember = randomList.shift();
					$("#content").children("#teams").children().children("#group" + (numGroups + 1)).append("<li>" + newMember + "</li>");
					$("#content").find("#group" + (numGroups + 1)).children().hide();
				}
			}
		}
		$("#content").children("#teams").children(".groupCol").fadeIn("slow").delay(500);
		$("#content").find("li").fadeIn("slow");
	}


	//finally, if the app is in teamSize mode, set numGroups back to false
	if (teamSize) {
		numGroups = false;
	}
}

$(document).ready(function(){

	//if the typeSelect button is pressed, change the method for selecting teams (by size or by number of teams)
	$("#typeSelect").on('click', function() {
		if (numGroups) {
			teamSize = true;
			numGroups = false;
			// adjust the GUI indicators of app mode and button pushes
			$(this).closest("#content").children().children(".btn").css("background-color", "darkcyan");
			$(this).closest("#content").children().children("h1").text("Select size of teams:");
			$(this).text("Select Number of Teams");
			if (generated) {
				$("#teams").children(".groupCol").fadeOut("slow", function(){
					$(this).remove();});
				generated = false;
			}
		} else if (teamSize) {
			teamSize = false;
			numGroups = true;
			// adjust the GUI indicators of app mode and button pushes
			$(this).closest("#content").children().children(".btn").css("background-color", "darkcyan");
			$("#content").children("h1").children().text("Select number of teams:");
			$(this).text("Select Team Size");
			if (generated) {
				$("#teams").children(".groupCol").fadeOut("slow", function () {
					$(this).hide();
					$(this).children().children().hide();
					$(this).remove();});
				generated = false;
			}
		}
	});

	//while the mouse is over a button, change the button color
	$(".btn").on('mouseenter', function(){
		$(this).css("background-color", "darkorange");
	});
	$(".btn").on('mouseleave', function(){
		if ( numGroups != $(this).text() && teamSize != $(this).text()){
		$(this).css("background-color", "darkcyan");}
	});

	//whilte the mouse is over a team, change the team name and bullet colors
	$("#content").on('mouseover', ".groupCol", function(){
		$(this).css("border", "2px dashed darkcyan");
		$(this).children("h2").css("color", "darkorange");
	});
	$("#content").on('mouseleave', ".groupCol", function(){
		$(this).css("border", "none");
		$(this).children("h2").css("color", "white");

	})

	//when a sizing button is clicked, set either teamSize or numGroups (depending on the current app mode)
	$(".btn").on('click', function(){
		if (numGroups){
			numGroups = $(this).text();
		}
		else if (teamSize){
			teamSize =$(this).text();
		}
		$(this).siblings(".btn").css("background-color", "darkcyan");
		$(this).css("background-color", "darkgrey");
	});

	// when the generate button is clicked, generate content based on the selected number and selected page mode
	$(".sidebar").on('click', "#generator", function() {

		// alert the user if the number of teams or team size has not been selected
		if (teamSize == true){
			alert("Please select a team size!");
			return;
		}
		else if (numGroups == true){
			alert("Please select a number of teams!");
			return;
		}

		// clear any previously generated teams from the display
		if (generated) {
			$("#content").children("#teams").children(".groupCol").fadeOut("fast", function(){
				$(this).remove();
				$(this).delay(500);
				});}

		//generate the teams!
		generateTeams();

	});
});