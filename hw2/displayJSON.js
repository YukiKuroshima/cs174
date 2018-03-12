function displayJSON() {
  var uri = document.getElementById("uri").value;
  if (uri === "") {
    window.alert("Please enter the path to the JSON file");
    return;
  }
  loadJSON(uri);
}

function loadJSON (url) {
  var xmlhttp = new XMLHttpRequest(); 
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      makeTableFromJSON(data);
    } else if (this.readyState == 4 && this.status != 200) {
      alert("Could not open JSON file");
    }
  };
  xmlhttp.open("GET", url, true);
  try{
    xmlhttp.send();
  }catch(e){
    alert("Could not open JSON file");
  }
}

function makeTableFromJSON(data) {
  var headerArray = data.Mainline.Table.Header.Data;

  var html = "";
  html += "<table border='1'>";
  html += "<thead>";
  html += "<tr>";
  
  headerArray.forEach(function(element) {
    html+="<td>" + element + "</td>";
  });

  html += "</tr>";
  html += "</thead>";
  html += "<tbody>";

  var rows = data.Mainline.Table.Row;
  if (!rows) {
    alert("Invalid JSON format");
    return;
  }

  rows.forEach(function(row) {
    html += "<tr>";

    for(var key in row) {
      var rowValue = row[key];
      var temp = "";
      // for hubs
      for(var hubKey in rowValue) {
        var hubValue = rowValue[hubKey];
        if ( Array.isArray(hubValue) ) {
          temp += "<ul>";
          for(var oneHubKey in hubValue) {
            temp+="<li>" + hubValue[oneHubKey] + "</li>";
          }
          temp += "</ul>";
        }
      }

      // logo
      if (key === "Logo") {
        temp+="<img src='" + rowValue + "' width='200'>";
      }

      if (temp === "") {
        temp = rowValue;
      }

      html+= "<td>" + temp + "</td>";
    };
    html += "</tr>";
  });

  html += "</tbody>";
  html += "</table>";

  popUpWindow(html);
}

function popUpWindow(html_text) {
  var win = window.open("", "Assignment3", "height=800,width=600");
  win.document.write(html_text);
  win.document.close();
}
