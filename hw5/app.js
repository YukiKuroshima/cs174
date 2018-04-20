const express = require('express')
const bodyParser = require('body-parser')
const path    = require("path");
const fs = require('fs');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/twitterRest.html'));
});

/*
 * Endpoint for showing the list of tweets
 */
app.get('/tweets/:tid?',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  fs.readFile('favs.json', 'utf8', function(err, contents) {
    const tweets = JSON.parse(contents);

    const tid = req.params.tid;

    var result = [];

    for (var i = 0; i < tweets.length; i++) {
      const tweet = tweets[i];
      const elem = {
        "created_at": tweet.created_at,
        "id": tweet.id,
        "text": tweet.text
      };
      // if tweet id is defined
      if (tid) {
        // check if tweet id is same
        if (elem.id == tid) {
          result[i] = elem;
        }
      } else {
        result[i] = elem;
      }
    }

    res.send(JSON.stringify(result));
  });
});

/*
 * Endpoint for showing the list of users
 */
app.get('/users/:sn?',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  fs.readFile('favs.json', 'utf8', function(err, contents) {
    const tweets = JSON.parse(contents);

    const sn = req.params.sn;
    var result = [];

    for (var i = 0; i < tweets.length; i++) {
      const tweet = tweets[i];
      const elem = {
        "name": tweet.user.name,
        "screen_name": tweet.user.screen_name,
        "location": tweet.user.location,
        "description": tweet.user.description
      };
      // if screen name is defined
      if (sn) {
        // check if screen name is same
        if (elem.screen_name == sn) {
          result[i] = elem;
        }
      } else {
        result[i] = elem;
      }
    }
    res.send(JSON.stringify(result));
  });
});

/*
 * Endpoint for showing the list of users
 */
app.get('/links',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  fs.readFile('favs.json', 'utf8', function(err, contents) {
    const tweets = JSON.parse(contents);

    var result = [];

    for (var i = 0; i < tweets.length; i++) {
      const tweet = tweets[i];
      const links = getAllUrls(tweet);

      const elem = {
        "id": tweet.id,
        "links": links
      };
      result[i] = elem;
    }
    res.send(JSON.stringify(result));
  });
});

/*
 * Iterete through the json
 * return a list of urls
 */
function getAllUrls(tweet) {
  var urls = [];
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  for(var key in tweet){
    const value = tweet[key];
    // null -> skip
    if (value == null) continue;

    // check if current value is object
    if (typeof value === "object") {
      // recursive call
      urls.push(...getAllUrls(value));
    } else {
      // check if current value is url
      const match = value.toString().match(regex);
      if (match) {
        urls.push(match[0]);
      }
    }
  }
  return urls;
} 

app.listen(3000, () => console.log('Example app listening on port 3000!'))
