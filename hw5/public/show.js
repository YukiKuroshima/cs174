console.log("show js");

function show (name) {
  console.log("show: " + name);
  loadJSON(name);

}


function loadJSON (url) {
  var xmlhttp = new XMLHttpRequest(); 
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      // console.log(this.responseText);
      console.log(data);
      
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
