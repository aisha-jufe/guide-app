document.addEventListener("DOMContentLoaded", getParks())

// Query and assign to variables found nodes
const parkList = document.querySelector(".list-container");
const parkImage = document.querySelector("#image");
const parkImage2 = document.querySelector("#image2");
const parkName = document.querySelector("#name");
const parkLocation = document.querySelector("#location");
const parkdescription = document.querySelector("#park-info");
const parkFee = document.querySelector("#entry-fee");
const parkFeatures = document.querySelector("#features");
const parkAmenities= document.querySelector("#amenities");
const bookPark= document.querySelector("buy-ticket");
const visitedPark = document.querySelector("#visited");

//global variable for currently selected park  
let currentPark;

//clear park 
parkList.innerText = '';


// fetch parks and displays the first park on DOMContentLoaded
function getParks () {
  fetch('https://test-backend-production-30ff.up.railway.app/parks')
    .then(r => r.json())
    .then(renderParks);
  starter();
}
  
// Fetch the first park to display when page loads
function starter () {
  
  fetch('https://test-backend-production-30ff.up.railway.app/parks/1')
    .then(r => r.json())
    .then(showPark);
}
  
  // Iterate over the array of parks to access individual parks
  function renderParks (parks) {
    parks.forEach(renderPark);
  }
  
// takes in a park object and accesses individual values
function renderPark (park) {
  const parkN = document.createElement('div');
  parkN.setAttribute('id', 'park-names');
  parkN.style.cursor = 'pointer';
  parkN.innerHTML = park.name;
  parkList.appendChild(parkN);
  parkN.addEventListener('click', () => {    
    showPark(park);
  });
}
  
// responsible for displaying details about a given park to the user
function showPark (park) {
  
  parkName.innerText = park.name;
  parkLocation.innerText = park.location;
  parkdescription.innerText = park.description;
  parkFee.innerHTML = `Entry fee: ${park.entryFee}`;
  parkFeatures.innerHTML = `<e>Main Features</e> <br> ${park.features}`;
  parkAmenities.innerHTML = `Nearby Amenities: <br> ${park.amenities}`
  image.src = park.image;
  parkImage2.src = park.image2

  
  // Event listener if one has visited park, to delete it from their view
}
  