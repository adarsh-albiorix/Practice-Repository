'use strict';
const form = document.querySelector('form');
const status = document.getElementById('status');
const usersList = document.getElementById('users');

form.addEventListener('submit', event => {
    event.preventDefault();
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    login(username, password)
        .then(response => {
            status.textContent = response.message;
            // Redirect to the dashboard or any other authorized page
            getUsersList();
        })
        .catch(error => {
            status.textContent = error.message;
        })
        .finally(() => {
            form.reset();
        });
});

async function getUsersList() {
  try {
    const response = await fetch('https://reqres.in/api/users?page=2');
    if (!response.ok) {
      throw new Error('Failed to retrieve user list');
    }
    const data = await response.json();

    renderUsersList(data.data);
  } catch (error) {
    window.alert(error.message);
  }
}

function renderUsersList(users) {
  const usersList = document.getElementById('users');
  usersList.innerHTML = '';
  console.log(users)
  users.forEach(data => {
    const li = document.createElement('li');
    li.textContent = `${data.first_name} ${data.last_name} (${data.email})`;
    usersList.appendChild(li);
  });
}

function login(username, password) {
  return fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username,
              password
          })
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Invalid username or password');
          }
      });
}