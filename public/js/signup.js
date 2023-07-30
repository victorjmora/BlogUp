const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup');
    //const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup');
  
    if (username && password) {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({name: username.value.trim(), username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);