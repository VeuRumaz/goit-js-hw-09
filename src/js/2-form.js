'use strict';
import validator from 'validator';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', () => {
  const formData = new FormData(form);
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();
  const data = { email, message };
  saveToLS('userInfo', data);
});

window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS('userInfo');
  if (data) {
    form.elements.email.value = data.email || '';
    form.elements.message.value = data.message || '';
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();
  const data = { email, message };

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  if (!validator.isEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }

  console.log(data);
  localStorage.removeItem('userInfo');
  form.reset();
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}
