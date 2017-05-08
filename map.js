function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'states.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

 function init() {
  loadJSON(function(response) {
   // Parse JSON string into object
     var states = JSON.parse(response);
     for(var i = 0; i < states.length; i++) {
       var mapElement = document.getElementById("usa");
       var area = document.createElement("area");
       var coords = states[i].coords;
       var id = states[i].code;
       var name = states[i].name;
       var state = mapElement.appendChild(area);
       state.setAttribute("coords", coords);
       state.setAttribute("id", id);
       state.setAttribute("shape", "poly");
       state.setAttribute("data-name", name);
       state.addEventListener("mouseover", function(e){
         handleMouseOver(e.target.id);
       }, false);
       state.addEventListener("mouseout", function(e){
         handleMouseOut(e.target.id)
       }, false);
       state.addEventListener("click", function(e){
         var state_id = e.target.id;
         var state_name = e.target.dataset.name;
         handleClick(state_id, state_name);
       }, false);
       imageAdder(id);
     }
  });
 }

 function handleMouseOver(id){
   var str = id+"-image";
   if(document.getElementById(str).style.opacity !== "1"){
     document.getElementById(str).style.opacity = .5;
   }
 }

 function handleMouseOut(id){
   var str = id+"-image";
   if(document.getElementById(str).style.opacity !== "1"){
     document.getElementById(str).style.opacity = 0;
   }
  }

 function handleClick(id, name){
   var str = id+"-image";
   var elements = document.getElementsByClassName("state-image");
   for(var i = 0; i < elements.length; i++){
     elements[i].style.opacity = 0;
   }
   document.getElementById(str).style.opacity = 1;
   var info = document.getElementById("info");
   info.innerHTML=name;
   info.style.visibility="visible";
 }

function imageAdder(id){
  var imageContainer = document.getElementById("images-container");
  var image = document.createElement("img");
  var imgTag = imageContainer.appendChild(image);
  imgTag.setAttribute("id", id+"-image");
  imgTag.setAttribute("class", "state-image");
  imgTag.setAttribute("src", "images/"+id+"_hover.png");
}
