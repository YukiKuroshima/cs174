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

app.get('/list',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  fs.readFile('favs.json', 'utf8', function(err, contents) {
    const tweets = JSON.parse(contents);

    var result = [];

    for (var i = 0; i < tweets.length; i++) {
      const tweet = tweets[i];
      // console.log(tweet);
      const elem = {
        "created_at": tweet.created_at,
        "id": tweet.id,
        "text": tweet.text
      };
      result[i] = elem;
    }

    console.log(result);
    res.send(JSON.stringify(result));
  });
});



app.listen(3000, () => console.log('Example app listening on port 3000!'))
