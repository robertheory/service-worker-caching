const API_URL = 'https://api.github.com/users/';

const fetchUser = async () => {
  const userInput = document.querySelector('#user-input').value;

  const userContainer = document.querySelector('#user');

  try {
    const response = await fetch(API_URL + userInput);
    const data = await response.json();

    userContainer.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.name}" />
      <h2>${data.name} - @${data.login}</h2>
      <p>${data.bio}</p>
    `;
  } catch (error) {
    userContainer.innerHTML = `
      <h2>ERROR</h2>
      <p>
        There was an error fetching the user. Please try again later.
      </p>
    `;
  }
};

const logMessage = (message) => {
  console.debug(message);
  const logsTextArea = document.querySelector('#logs');

  logsTextArea.value = `${new Date().toISOString()} - ${message}\n${
    logsTextArea.value
  }`;
};

navigator.serviceWorker.addEventListener('message', (event) => {
  const { type, message } = event.data;

  if (type === 'sw-logs') {
    logMessage(message);
  }
});
