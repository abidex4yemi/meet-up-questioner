/**
 * Navbar menu icon
 */

const menuBtn = document.querySelector('.menu');
const navContainer = document.querySelector('.nav');

// bind click event to menu-icon button
menuBtn.addEventListener('click', () => {
  navContainer.classList.toggle('js-menu');
});

// hide sign in  and sign up button if user is logged in
if (localStorage.getItem('user')) {
  // get sign in navbar button
  const navBarSignInBtn = document.querySelector('.js-navbar-signin');

  // get sign in navbar button
  const navBarSignUpBtn = document.querySelector('.js-navbar-signup');

  // hide sign in button
  navBarSignInBtn.style.display = 'none';

  // hide sign up button
  navBarSignUpBtn.style.display = 'none';
}
