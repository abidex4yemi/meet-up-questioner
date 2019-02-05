// check if user data exist
if (localStorage.getItem('user')) {
  const rawUserData = localStorage.getItem('user');
  const userData = JSON.parse(rawUserData);
  const userName = document.querySelector('.dashboard-username');
  if (!userData.access) {
    // set username
    userName.innerHTML = userData.username;
  } else {
    window.location.href = 'sign-in.html';
  }
} else {
  window.location.href = 'sign-in.html';
}
