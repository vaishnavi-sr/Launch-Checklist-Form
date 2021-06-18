// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let list;
   list = document.querySelector("#faultyItems");
   list.style.visibility = 'hidden';

let listedPlanets;
  // listed PlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse.then(function(result) {
        listedPlanets = result;
        pickPlanet(listedPlanets);
        let index = pickPlanet(listedPlanets);
        addDestinationInfo(document, index.name, index.diameter, index.star, index.distance, index.moon, index.image);

        //console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
    });


     // Below this comment we call the appropriate  functions to pick a planet fom the list of planets and add that information to your destination.

     form.addEventListener("submit", function(event){
      event.preventDefault();
      let testInput = ""; 
     let pilot = document.querySelector("input[name=pilotName]").value;
     let copilot = document.querySelector("input[name=copilotName]").value;
     let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
     let cargoLevel = document.querySelector("input[name=cargoMass]").value;
     
     let callfn = validateInput(testInput);
     formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
     });
 });
 /* This block of code shows how to format the HTML once you fetch some planetary JSON!*/
function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
   // Here is the HTML formatting for our mission target div.
   let display = document.getElementById("missionTarget");
   display.innerHTML = 
   
               ` <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter:${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth:${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${image}"></img>`;
                return display;
   
}

function validateInput(testInput) {
   //console.log("Inside validate");
if(testInput === ""){
    return 'Empty';
}   else if(isNaN(testInput)){
    return 'Not a Number';
     }
   else if(!isNaN(testInput)){
    return 'Is a Number';
     }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   //console.log("Inside formSubmission");
   if(pilot === "" || copilot ==="" || fuelLevel ==="" ||cargoLevel ===""){
       alert("All fields are required");
   } else if (!isNaN(pilot) || !isNaN(copilot) || isNaN(fuelLevel) ||isNaN(cargoLevel)){
       alert("Enter valid information for each field");
   }else {

       let pilotStatus = document.getElementById("pilotStatus");
       let copilotStatus = document.getElementById("copilotStatus");
       let fuelStatus = document.getElementById("fuelStatus");
       let cargoStatus = document.getElementById("cargoStatus");
       let  launchStatus = document.getElementById("launchStatus");
       list.style.visibility = 'visible';

       if(fuelLevel < 10000){
           pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
           copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
           fuelStatus.innerHTML = "Fuel level too low for launch";
           launchStatus.innerHTML = "Shuttle Not Ready for Launch";
           launchStatus.style.color = "rgb(199, 37, 78)";

       }
       else if (cargoLevel > 10000){
           pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
           copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
           fuelStatus.innerHTML = "Fuel level high enough for launch";
           cargoStatus.innerHTML = "Cargo mass too heavy for launch";
           launchStatus.innerHTML = "Shuttle Not Ready for Launch";
           launchStatus.style.color = "rgb(199, 37, 78)";
           

       }
       else if(fuelLevel < 10000 && cargoLevel > 10000){
           pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
           copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
           fuelStatus.innerHTML = "Fuel level too low for launch";
           cargoStatus.innerHTML = "Cargo mass too heavy for launch";
           launchStatus.innerHTML = "Shuttle Not Ready for Launch";
           launchStatus.style.color = "rgb(199, 37, 78)";

           }
       else {
            
           pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
           copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
           fuelStatus.innerHTML = "Fuel level high enough for launch";
           cargoStatus.innerHTML = "Cargo mass low enough for launch";
           launchStatus.innerHTML = "Shuttle is Ready for Launch";
           launchStatus.style.color = "rgb(65, 159, 106)";

           }

       }
   }

   async function myFetch() {
    
      const planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
       return  response.json().then(function(json){
           return json;
       });
     
     });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
   let index = planets[Math.floor(Math.random() * planets.length)];
   return index;
}

