document.addEventListener("DOMContentLoaded", getParks())

// Query and assign to variables usefull nodes
const parkList = document.querySelector("#parks");
const parkImage = document.querySelector("#image");
const parkImage2 = document.querySelector("#image2");
const parkName = document.querySelector("#name");
const parkLocation = document.querySelector("#location");
const parkdescription = document.querySelector("#park-info");
const parkFee = document.querySelector("#entry-fee");
const parkFeatures = document.querySelector("#features");
const parkAmenities= document.querySelector("#amenities");
const bookPark = document.getElementById('buy-ticket')
const visitedPark = document.querySelector("#visited");

//variable for currently selected park, that will be available in the global scope
let currentPark;


// fetch parks and displays the first park on site visit
function getParks () {
  fetch('https://test-backend-production-30ff.up.railway.app/parks')
    .then(r => r.json())
    .then(renderParks);
  starter();
}
  
// Function to fetch the first park
function starter () {  
  fetch('https://test-backend-production-30ff.up.railway.app/parks/1')
    .then(r => r.json())
    .then(showPark);
}
  
// Iterate over the array of parks(payload) to access individual parks
function renderParks (parks) {
  parks.forEach(renderPark);
}
  
// Takes in a park object and accesses individual values
function renderPark (park) {
  const parkN = document.createElement('li');
  parkN.setAttribute('class', 'park item');
  parkN.style.cursor = 'pointer';
  parkN.innerHTML = park.name;
  parkList.appendChild(parkN);
  parkN.addEventListener('click', () => {    
    showPark(park);
  });
}
  
// responsible for displaying details about a given park to the user
function showPark (park) {  
  currentPark = park;
  parkName.innerText = park.name;
  parkLocation.innerText = park.location;
  parkdescription.innerText = park.description;
  parkFee.innerHTML = `Entry fee: ${park.entryFee}`;
  parkFeatures.innerHTML = `<span style="color: black; font-size:medium; font-weight: 700;">Main Features</span> <br> ${park.features}`;
  parkAmenities.innerHTML = `<span style="color: black; font-size:medium; font-weight: 700;">Nearby Amenities</span><br> ${park.amenities}`
  image.src = park.image;
  parkImage2.src = park.image2;
  bookPark.innerText = 'Book Visit';
}

// Event listener if one has visited park, to delete it from their view.
// Note that this is not persisted on the backend as it would alter stored destionations.
// For contuinity, this will hide the park and display the next park on the list
visitedPark.addEventListener("click", (e)=>{
  e.preventDefault();
  parkReplace();
})

function parkReplace(){
  const nextParkId = currentPark.id + 1;
  if (nextParkId < 12){
    fetch(`https://test-backend-production-30ff.up.railway.app/parks/${nextParkId}`)
    .then(r => r.json())
    .then(showPark)
  } else{
    alert('You have Already visited All the top destinations!')
    starter();
  }
}

// Book visit will generate a pop-up alert and alter the status to booked.
bookPark.addEventListener('click', (e)=>{
  e.preventDefault();
  booker();
})

function booker() {
  bookPark.innerHTML = "Booked!"
  alert(`You have booked a visit to ${currentPark.name}`)
}
