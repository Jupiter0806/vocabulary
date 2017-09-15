var http = require("http");
var request = require("request");
var url = require("url");
var fs = require("fs");

function getWordDefinition(word, callback) {
	var options = {
		url: "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/" + word,
		headers: {
			"Accept": "application/json",
			"app_id": "1dc10a7e",
			"app_key": "fa6c67f08dd0f9aab2a63beb1b30694f"
		}
	};

	request(options, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var info = getDefinitionFromResponse(JSON.parse(body));
			console.log(info);
			callback(info);
		} else {
			console.log("Error: ", error, response);
			callback(null);
		}
	});
}

function getDefinitionFromResponse(response) {
	var res = [];
	for (var i = 0; i < response.results.length; i++) {
		for (var j = 0; j < response.results[i].lexicalEntries.length; j++) {
			for (var z = 0; z < response.results[i].lexicalEntries[j].entries.length; z++) {
				for (var w = 0; w < response.results[i].lexicalEntries[j].entries[z].senses.length; w++) {
					res.push({
						definitions: response.results[i].lexicalEntries[j].entries[z].senses[w].definitions,
						examples: response.results[i].lexicalEntries[j].entries[z].senses[w].examples
					});
				}
			}
		}
	}
	return res;
}


http.createServer(function (req, res) {
	var q = url.parse(req.url, true);
	var word = q.query.word;
	var pathname = q.pathname;

	console.log(pathname);

	if (pathname === "/word") {
		console.log("word is ", word);
		getWordDefinition(word, function (data) {
			if (data) {
				res.writeHead(200, {
					"Content-Type": "text/json"
				});
				res.write(JSON.stringify(data));
				res.end();
			} else {
				res.writeHead(200, {
					"Content-Type": "text/json"
				});
				res.write("{}");
				res.end();
			}
		});
	} else if (pathname === "/index.js") {
		fs.readFile(pathname.slice(1), function (error, data) {
			if (error) throw error;
			res.writeHead(200, {
				"Content-Type": "text/html"
			});
			res.write(data);
			res.end();
		});
	} else if (pathname === "/") {
		fs.readFile("index.html", function (error, data) {
			if (error) throw error;
			res.writeHead(200, {
				"Content-Type": "text/html"
			});
			res.write(data);
			res.end();
		});
	}

}).listen(8080);

// The undergraduate students need some specific sources to analyse a specific program.
// Eight groups need to submit the outlines of their projects to their tutors.
// You can find a lot of information or references on university website.
// Observers waited nervously and held the breath for the concert.
// Presidential elections are held every four years.
// Elections of President take place once every four years.
// The first assignment is due on fourteenth of September.
// Catch the camera to see the fish.
// Politics is not usually a safe topic for conversation.
// You can contact all your tutors by email.
// Undergraduate students may participate in specific stages within the program.
// The scientists use the web to explore all the problems.
// A number of students have volunteer jobs.
// It's hard to ancipate all their actions when they react.
// The application process is longer than expected.
// The new theory seemed to contradict with our initial hypothesis.
// Writing an essay is easy once the research has finished.
// The university officer will help you allocate housing and transportation.
// They were struggling last year to make their payments.
// They have struggled since last year to make their services pay.
// The results of the experiment are reported on the table below.
// Laws protect human rights and avoid multi-problems.
// Laws protect customer rights and avoid market problems.
// Law is benefitial to investors by protecting their rights and avoiding any improper actions in the market.
// The evaluation form will be reviewd by university personnel.
// Nurses specialise in clinical work and management.
// Sales figures for last year were better than expected.
// Artists, other than politicians, played their own roles as critics of culture.
// The new product failed due to lack of demand.
// The following economic lectures will be cancelled.
// The morning's lecture on economic policy has been cancelled.
// The economic books are up the back on the left.
// The essay will be published once the research is finished.
// Writing an essay is easy once the research has finished.
// The toughest part of public tranport is funding.
// If you are not sure, phone student service for help.
// The coffee house menu featured coffee, sandwiches, and toast.
// The cafeteria featured sandwiches, salad, soup, chicken, and fish.
// we cannot consider an increase in price at this stage.
// We cannot consider increasing the price at this stage.
// The theme of the instrumental work exhibits more of a demure, compositional style.
// Behind the garage is the secret storage room.
// Behind the garage, there a flat car drawn by mules.
// Climate change is being acknowledged by many scientists.
// It is vital to acknowledge all your sources.
// A person's education level is closely related to their economic background.
// Everyone must evacuate the premises during the fire drill.
// All staff must leave the fire hydrant exit.
// Our professor is hosting the economic development conference next week.
// Animals raised in captivity behave differently with their wild counterparts.
// If it helps you to take notes in order to concentrate, please do so.
// To gain full marks, an appropriate bibliography is required.
// Materials and resources are on hold at the library front desk.