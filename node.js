var http = require('http');
var request = require('request');
var url = require('url');
var fs = require('fs');

function getWordDefinition (word, callback) {
    var options = {
        url: "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/" + word,
        headers: {
            "Accept" : "application/json",
            "app_id" : "1dc10a7e",
            "app_key" : "fa6c67f08dd0f9aab2a63beb1b30694f"
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
                    })
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

    if (pathname === '/word') {
        console.log("word is ", word);
        getWordDefinition(word, function (data) {
            if (data) {
                res.writeHead(200, {'Content-Type': 'text/json'});
                res.write(JSON.stringify(data));
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/json'});
                res.write("{}");
                res.end();
            }
        });
    } else if (pathname === '/index.js') {
        fs.readFile(pathname.slice(1), function (error, data) {
            if (error) throw error;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    } else if (pathname === '/'){
        fs.readFile('index.html', function (error, data) {
            if (error) throw error;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }

}).listen(8080);