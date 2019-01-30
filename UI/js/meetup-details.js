/**
 * get meetup id from url parameter
 *
 * @param {void}
 *
 * @returns {number} meetupId
 */
function getId() {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const meetupId = url.searchParams.get('id');

  return meetupId;
}

// get meetup details container
const feedbackContainer = document.querySelector('.feedback-message');

function showOverlay() {
  document.querySelector('.overlay').style.display = 'block';
}

function hideOverlay() {
  document.querySelector('.overlay').style.display = 'none';
}

/**
 *
 * @param {object} responseData
 *
 * @returns void
 */
function displayFeedback(responseData) {
  feedbackContainer.innerHTML = `<li class='feedback-list-item'>${responseData.error}</li>`;
  feedbackContainer.classList.add('feedback-message-error');
  window.scrollTo(0, 0);
}

/**
 * Fetch all meetup record
 */
function getMeetupDetails() {
  // get user object from
  let userToken = '';
  if (localStorage.getItem('user')) {
    const userData = JSON.parse(localStorage.getItem('user'));
    const {
      token,
    } = userData;

    userToken = token;
  }

  // store meetup id
  const meetupId = getId();

  showOverlay();
  // meetup endpoint url
  const url = `https://meet-up-questioner.herokuapp.com/api/v1/meetups/${meetupId}`;

  // make a GET request to meetups
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: userToken,
    },
  })
    .then(res => res.json())
    .then((body) => {
      hideOverlay();

      // check success response
      if (body.status === 200) {
        feedbackContainer.classList.remove('feedback-message-error');

        // format date to a readable format
        const formatedDate = moment(body.data[0].happeningon).format('dddd, MMMM Do YYYY, h:mm:ss a');

        // meetup details markup
        const output = `<div class="meetup-single-img">
            <img src="./img/meetup_img/meetup_question_2.jpeg" alt="" class="meetup-img-1">
          </div>

          <div class="meetup-single-details">
            <h4 class="meetup-d-heading">Topic: <span>${body.data[0].topic}</span></h4>
            <h4 class="meetup-d-heading meetup-venue">Venue: <span>${body.data[0].location}</span></h4>
            <h4 class="meetup-d-heading meetup-time">Date: ${formatedDate}</h4>
            <h4 class="meetup-d-heading meetup-speaker-title">Speaker:</h4>
            <ul class="meetup-speaker">
              <li class="speaker-list">Ibrahim Olowo</li>
              <li class="speaker-list">James Grin</li>
              <li class="speaker-list">Cameron Lisa</li>
            </ul>

            <h4 class="meetup-d-heading meetup-feedback">Are you going?</h4>
            <ul class="meetup-action">
              <li class="meetup-action-list">
                <button class="meetup-action-button yes" data-meetup-id="${body.data[0].id}">YES</button>
              </li>
              <li class="meetup-action-list">
                <button class="meetup-action-button no" data-meetup-id="${body.data[0].id}">NO</button>
              </li>
              <li class="meetup-action-list">
                <button class="meetup-action-button maybe" data-meetup-id="${body.data[0].id}">MAYBE</button>
              </li>

              <li class="meetup-action-list">
                
              </li>
            </ul>
          </div>`;

        // get meetup container (select option)
        const meetupContainer = document.getElementById('meetup-details-container');

        // Display all meetup record
        meetupContainer.innerHTML = output;
      } else {
        displayFeedback(body);
      }
    })
    .catch(err => err);
}

// fetch all meetup record
getMeetupDetails();
