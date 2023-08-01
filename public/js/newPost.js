const newpostsFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#post-name').value.trim();
    const needed_funding = document.querySelector('#post-funding').value.trim();
    const description = document.querySelector('#post-desc').value.trim();
  
    if (name && needed_funding && description) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/posts');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/posts');
      } else {
        alert('Failed to delete posts');
      }
    }
  };
  
  document
    .querySelector('.new-posts-form')
    .addEventListener('submit', newpostsFormHandler);
  
  document
    .querySelector('.posts-list')
    .addEventListener('click', delButtonHandler);
  