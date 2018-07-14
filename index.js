/* global responsiveVoice */

var currentWord = "";
var index = 0;
var wordList = [
	"hello",
	"world",
	"you",
	"pretty"
];
var needReviewWordList = [];

var reading_currentWord = "";
var reading_index = 0;
var reading_wordList = [
	"hello",
	"world",
	"you",
	"pretty"
];
var reading_needReviewWordList = [];

var todayWordList = [];

function getNextWord () {
	return wordList[index++];
}

function goToNextWord () {
	currentWord = getNextWord();
	$("#word").text(currentWord).hide();
}

function reorderWordList (wordList) {
	var i;
	var index1;
	var index2;
	var temp;

	for (i = 0; i < wordList.length; i += 1) {
		index1 = Math.floor(Math.random() * wordList.length);
		index2 = Math.floor(Math.random() * wordList.length);

		if (index1 !== index2) {
			temp = wordList[index1];
			wordList[index1] = wordList[index2];
			wordList[index2] = temp;
		}
	}
}

function setUpWordList () {
	$("#wordList").html(wordList.join("<br/>")).hide();
	$("#reading_word_list").html(reading_wordList.join("<br/>")).hide();

	$("#reviewWordList").hide();
	$("#reading_review_word_list").hide();
}

function goToNextReadingWord () {
	reading_currentWord = reading_wordList[reading_index++];
	$("#reading_word").text(reading_currentWord);
}

function init () {
	index = 0
	reading_index = 0
	reorderWordList(wordList);
	reorderWordList(reading_wordList);
	goToNextWord();
	goToNextReadingWord();
	setUpWordList();
}

function getWordDefinition (word) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "http://localhost:8080/word?word=" + word, true);

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
			var res = JSON.parse(xmlHttp.responseText);
			console.log("Success: ", res);
			$("#word_result").html(res);
		}
	};
	xmlHttp.send(null);
}

$(document).ready(function () {
	init();

	$("#gspeech").on("click", function () {
		var text = $("input[name=\"text\"]").val();
		responsiveVoice.speak("" + text + "");
		// http://responsivevoice.org/
	});

	$("#search_word").on("click", function () {
		var inputWord = $("input[name=\"text\"]").val();
		if (inputWord) {
			getWordDefinition(inputWord);
			if (todayWordList.indexOf(inputWord) < 0) {
				todayWordList.push(inputWord);
			}
		}
	});

	$("#output_today_word_list").on("click", function () {
		$("#today_word_list").text(todayWordList.join(";"));
	});

	$("#speak").on("click", function () {
		if (currentWord) {
			responsiveVoice.speak("" + currentWord + "");
		}
	});

	$("#check").on("click", function () {
		var inputWord = $("input[name=\"wordinput\"]").val();
		$("#check_result").text(inputWord === currentWord);

	});

	$("#show").on("click", function () {
		$("#word").toggle();
		if (needReviewWordList.indexOf(currentWord) < 0) {
			needReviewWordList.push(currentWord);
		}
	});

	$("#next").on("click", function () {
		goToNextWord();
		$("#check_result").text();
	});

	$("#learn_today_words").on("click", function () {
		wordList = todayWordList;
		init();
	});

	$("#showWordList").on("click", function () {
		$("#wordList").toggle();
	});

	$("#showReviewWordList").on("click", function () {
		$("#reviewWordList").html(needReviewWordList.join("<br/>")).toggle();
	});

	$("#reading_speak").on("click", function () {
		if (reading_currentWord) {
			responsiveVoice.speak("" + reading_currentWord + "");
		}
	});

	$("#reading_not_know").on("click", function () {
		if (reading_needReviewWordList.indexOf(reading_currentWord) < 0) {
			reading_needReviewWordList.push(reading_currentWord);
		}
	});

	$("#reading_next").on("click", function () {
		goToNextReadingWord();
	});

	$("#reading_learn_today_words").on("click", function () {
		reading_wordList = todayWordList;
		init();
	});

	$("#show_reading_word_list").on("click", function () {
		$("#reading_word_list").toggle();
	});

	$("#show_reading_review_word_list").on("click", function () {
		$("#reading_review_word_list").html(reading_needReviewWordList.join("<br/>")).toggle();
	});

});
