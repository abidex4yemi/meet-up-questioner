
// check if user data exist
if (localStorage.getItem('user')) {
  const rawUserData = localStorage.getItem('user');
  const userData = JSON.parse(rawUserData);
  const userName = document.querySelector('.dashboard-username');

  // set username
  userName.innerHTML = userData.username;
}
