const signUpBtn = document.getElementById('signup-btn');

// create new account
function signUp(e) {
  e.preventDefault();

  // get all user values
  const firstName = document.getElementById('sign-up-firstName').value;
  const lastName = document.getElementById('sign-up-lastName').value;
  const userEmail = document.getElementById('sign-up-email').value;
  const userPassword = document.getElementById('sign-up-password').value;
  const userPasswordConf = document.getElementById('sign-up-password-confirmation').value;
  const tel = document.getElementById('sign-up-tel').value;
  const userName = document.getElementById('username').value;

  const url = 'https://meet-up-questioner.herokuapp.com/api/v1/auth/signup';

  const formData = {
    firstname: firstName,
    lastname: lastName,
    password: userPassword,
    passwordConf: userPasswordConf,
    email: userEmail,
    phonenumber: tel,
    username: userName,
  };


  // make a post request
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      //   Redirect to login
      setTimeout(() => {
        // check for success and redirect
        if (res.status === 201) {
          window.location.href = 'user-dashboard.html';
        }
      }, 1000);
      return res.json();
    })
    .then((body) => {
      const {
        token,
      } = body.data[0];
      localStorage.setItem('token', token);
    })
    .catch(err => err);
}
// bind click event to sign up button
signUpBtn.addEventListener('click', signUp);
