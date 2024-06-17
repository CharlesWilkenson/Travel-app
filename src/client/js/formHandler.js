import { isValidHttpUrl, isValidHttpUrlWithRegex } from './handleSubmit.js';

const SERVER_URL = 'http://localhost:8000';
const form = document.getElementById('travelForm');
const successMessage = document.getElementById('success');
const errorMessage = document.getElementById('error');
  
document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', handleSubmit);
  hideErrorMessageMessage();
  hideSuccessMessageMessage();
  
const deleteButtons = document.getElementsByClassName("btnDelete");

for (let element of deleteButtons) {
  let id = element.value;
            document.getElementById(id).onclick =  () =>{
              console.log("id ", id.substring(6))
              deletetSingleTrip(id.substring(6));
            }
    }

    });
    
function handleSubmit(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const departing = document.getElementById('departing').value;

        let data = {
            city: city,
            departing: departing
    }
    const URL = `${SERVER_URL}/`;
    postdata(URL, data)
        .catch(e => console.log(e));   
}

// Function to send data to the server
const postdata = async (url='', data = {}) => { 
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            header: "Access-Control-Allow-Origin: *",
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        try {
          const newdata = await response.json();
          checkStatusCode(newdata)
          document.getElementById("modal").classList.remove("is-visible");
            return newdata;
    } catch (error) {
          console.log("error ",error);
     }
}


const deletetSingleTrip = async (id) => {
    const URL = `${SERVER_URL}/${id}`;
            const response = await fetch(URL, {
            method: 'DELETE',
            credentials: 'same-origin',
            header: "Access-Control-Allow-Origin: *",
            headers: { 'content-Type': 'application/json' }
        });
  try {

      const newdata = await response.json();
      checkStatusCode(newdata);
    } catch (error) {
       console.log("error", error);
  }
}

const displaySuccessMessage = (message) => {
   hideErrorMessageMessage();
   successMessage.style.display = 'block';
   successMessage.innerHTML = message;
}

const displayErrorMessage = (message) => {
   hideSuccessMessageMessage();
   errorMessage.style.display = 'block ';
   errorMessage.innerHTML = message;
}

const hideErrorMessageMessage  =  ()=> { 
   errorMessage.style.display = 'none';
}

const hideSuccessMessageMessage =  ()=> { 
   successMessage.style.display = 'none';
}

const checkStatusCode = (response = {}) => {
  if (response.statusCode === 400 || response.statusCode === 500 || response.statusCode === 401) {
    displayErrorMessage(response.message);
  } else {
    displaySuccessMessage(response.message)
  }
}

// Export the handleSubmit function
export { handleSubmit, postdata, deletetSingleTrip};
