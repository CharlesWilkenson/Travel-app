const SERVER_URL = 'http://localhost:8000';
const form = document.getElementById('travelForm');
const successMessage = document.getElementById('success');
const errorMessage = document.getElementById('error');

/**
 * @description add eventListener to element element on page loading
 */
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', handleSubmit);
    hideErrorMessageMessage();
    hideSuccessMessageMessage();

    const deleteButtons = document.getElementsByClassName("btnDelete");

    for (let element of deleteButtons) {
        let id = element.value;
        document.getElementById(id).onclick = () => {
            console.log("id ", id.substring(6))
            deleteSingleTrip(id.substring(6)).then(() => console.log("Event added"));
        }
    }
});

/**
 * @description function to submit the form 
 * @param event
 */
function handleSubmit(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const departing = document.getElementById('departing').value;
    let countDown = checkDateValidity(departing);
    let data = {
        city: city,
        departing: departing
    }

    if (countDown <= 0) {
        checkStatusCode({message: "You cannot add an earlier date", statusCode: 400})
        document.getElementById("modal").classList.remove("is-visible");
    } else {
        postData(`${SERVER_URL}`, data).then(r => console.log("Trip added"));
    }
}

/**
 * @param url
 * @param data
 * @description function to add a new trip
 */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        header: "Access-Control-Allow-Origin: *",
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        checkStatusCode(newData)
        document.getElementById("modal").classList.remove("is-visible");
        return newData;
    } catch (error) {
        console.log("error ", error);
    }
}

/**
 * @param id
 * @description function to delete a trip
 */
const deleteSingleTrip = async (id) => {
    const URL = `${SERVER_URL}/${id}`;
    const response = await fetch(URL, {
        method: 'DELETE',
        credentials: 'same-origin',
        header: "Access-Control-Allow-Origin: *",
        headers: {'content-Type': 'application/json'}
    });
    try {
        const newData = await response.json();
        checkStatusCode(newData);
    } catch (error) {
        console.log("error", error);
    }
}

/**
 * @param message
 * @description function to display a success message when an action is completed successfully
 */
const displaySuccessMessage = (message) => {
    hideErrorMessageMessage();
    successMessage.style.display = 'block';
    successMessage.innerHTML = message;
}


/**
 * @param message
 * @description function to display an error message when an action is failed to complete
 */
const displayErrorMessage = (message) => {
    hideSuccessMessageMessage();
    errorMessage.style.display = 'block ';
    errorMessage.innerHTML = message;
}


/**
 * @description function to hide the error message
 */
const hideErrorMessageMessage = () => {
    errorMessage.style.display = 'none';
}

/**
 * @description function to hide the success message
 */
const hideSuccessMessageMessage = () => {
    successMessage.style.display = 'none';
}

/**
 * @description function to display the message(error/success) based on the response status
 * @param response
 */
const checkStatusCode = (response = {}) => {
    if (response.statusCode === 400 || response.statusCode === 500 || response.statusCode === 401) {
        displayErrorMessage(response.message);
    } else {
        displaySuccessMessage(response.message)
    }
}

/**
 * @description function to check the date validity provided by users
 * @param departing
 * @returns remaining days
 */
export const checkDateValidity = (departing) => {
    const total_days = (new Date(departing) - new Date()) / (1000 * 60 * 60 * 24);
    return Math.trunc(total_days);
}

// Export the handleSubmit, postdata, deleteSingleTrip functions
export {handleSubmit, postData, deleteSingleTrip};
