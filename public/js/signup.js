const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#name');
    //const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password');
  
    if (username && password) {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({name: username.value.trim(), password: password.value.trim() }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);