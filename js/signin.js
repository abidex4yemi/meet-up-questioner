const signInBtn = document.getElementById('sign-in-btn');

function signIn(e) {
  e.preventDefault();

  // get form data
  const userEmail = document.getElementById('sign-in-email').value;
  const userPassword = document.getElementById('sign-in-password').value;

  const userToken = localStorage.getItem('token');

  const url = 'https://meet-up-questioner.herokuapp.com/api/v1/auth/login';

  const formData = {
    email: userEmail,
    password: userPassword,
  };

  // make post request to sign in route
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: userToken,
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      setTimeout(() => {
        // check for success and redirect
        if (res.status === 200) {
          window.location.href = 'user-dashboard.html';
        }
      }, 1000);
    })
    .catch(err => err);
}

// bind click event to sign in button
signInBtn.addEventListener('click', signIn);
