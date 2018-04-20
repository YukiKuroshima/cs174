/*
 * Triggered when user clicks a button
 */
function show (name) {
  var param = "";
  if (name === "tweets") {
    param = document.getElementById("tweetId").value;
    document.getElementById("tweetId").value = "";
  } else if (name === "users") {
    param = document.getElementById("screenName").value;
    document.getElementById("screenName").value = "";
  }
  loadJSON(name, param);
}


/*
 * Ajax call
 */
function loadJSON (url, param) {
  var xmlhttp = new XMLHttpRequest(); 
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var html = jsonToTable(data);
      displayContent(html);
      
    } else if (this.readyState == 4 && this.status != 200) {
      alert("Could not open JSON file");
    }
  };
  xmlhttp.open("GET", url+'/'+param, true);
  try{
    xmlhttp.send();
  }catch(e){
    alert("Could not open JSON file");
  }
}

/*
 * Generate table by json
 */
function jsonToTable(data) {

  var html = "";
  html += "<table border='1'>";
  html += "<thead>";
  html += "<tr>";
  
  for(var key in data[0]) {
    html+="<td>" + key + "</td>";
  }

  html += "</tr>";
  html += "</thead>";
  html += "<tbody>";

  data.forEach(function(row) {
    html += "<tr>";

    for(var key in row) {
      var temp = row[key];

      if (key === "links") {
        var temp2 = "";
        temp2 += "<ul>";
        for(var linkKey in temp) {
          temp2 += "<li>" + temp[linkKey] +"</li>";
        }
        temp2 += "<ul>";
        temp = temp2;
      }

      html+= "<td>" + temp + "</td>";
    };
    html += "</tr>";
  });

  html += "</tbody>";
  html += "</table>";

  return html;
}

/*
 * Insert the html code to the content
 */
function displayContent(html) {
  document.getElementById("content").innerHTML = html;
}
