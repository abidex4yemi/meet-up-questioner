const showOverlay = () => {
  document.querySelector('.overlay').style.display = 'block';
};

const hideOverlay = () => {
  document.querySelector('.overlay').style.display = 'none';
};

// Clear all errors from field
const resetFields = () => {
  const fields = document.querySelectorAll('.error');
  const fieldsArr = Array.prototype.slice.call(fields);
  fieldsArr.forEach((element) => {
    const currentField = element;
    currentField.innerHTML = '';
    currentField.previousElementSibling.style.border = '1px solid #f4f4f4';
  });
};

/**
 * Display user feedback
 *
 * @param {object} responseData
 *
 * @returns {string} listItem
 */
const displayFeedback = (responseData) => {
  let listItem = '';

  if (responseData.status === 400 && typeof responseData.error !== 'string') {
    listItem += '<li class=\'feedback-list-item\'>Please fill the required field below.</li>';
  } else if (responseData.status === 201) {
    listItem += `<li class='feedback-list-item'>${responseData.message}</li>`;
  } else {
    listItem += `<li class='feedback-list-item'>${responseData.error}</li>`;
  }

  return listItem;
};

// Create new user account
const createMeetup = (e) => {
  e.preventDefault();
  resetFields();
  showOverlay();
  // get all user input values
  const meetupLocation = document.getElementById('meetup-location').value;
  const meetupTags = document.getElementById('meetup-tags').value;
  const meetupImages = ['http://lorempixel.com/640/480/nature'];
  const meetupTopic = document.getElementById('meetup-topic').value;
  const meetupDate = document.getElementById('meetup-date').value;

  // convert user input (string) to Array
  const meetupTagsArray = meetupTags.split(',');

  const feedbackContainer = document.querySelector('.feedback-message');

  // sign up API-endpoint url
  const url = 'https://meet-up-questioner.herokuapp.com/api/v1/meetups';

  // User input data object
  const formData = {
    location: meetupLocation,
    tags: meetupTagsArray,
    images: meetupImages,
    topic: meetupTopic,
    happeningOn: meetupDate,
  };

  // get user object from
  let userToken = '';
  if (localStorage.getItem('user')) {
    const userData = JSON.parse(localStorage.getItem('user'));
    const {
      token,
    } = userData;

    userToken = token;
  }

  // Make a post request to sign up endpoint
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: userToken,
    },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then((body) => {
      hideOverlay();

      // check for success status
      if (body.status === 201) {
        feedbackContainer.innerHTML = displayFeedback(body);
        feedbackContainer.classList.remove('feedback-message-error');
        feedbackContainer.classList.add('feedback-message-success');
        window.scrollTo(0, 0);

        setTimeout(() => {
          window.location.href = 'upcoming.html';
        }, 2000);
      } else {
        feedbackContainer.innerHTML = displayFeedback(body);
        feedbackContainer.classList.add('feedback-message-error');
        window.scrollTo(0, 0);

        // cycle over each element in the error array
        // cycle over each form field next sibling
        // check and display error if any
        body.error.forEach((element) => {
          Object.keys(formData).forEach((key) => {
            if (element.key === key) {
              document.querySelector(`.${element.key}`).style.border = '0.7px solid #dc3545';
              if (element.key === 'tags') {
                document.querySelector(`.${element.key}`).nextElementSibling.innerHTML = 'Tags is required (e.g) tag1, tag2, tag3';
              } else {
                document.querySelector(`.${element.key}`).nextElementSibling.innerHTML = element.Rule;
              }
            }
          });
        });
      }
    })
    .catch(err => err);
};

// Get sign up button
const createMeetupBtn = document.getElementById('create-meetup-btn');

// bind click event to sign up button
createMeetupBtn.addEventListener('click', createMeetup);
