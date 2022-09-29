<template>
  <div id="center">
  <h1 style="color:#FFCA3A;">Welcome to DIT-342</h1>
  <br>
  <div class="form-username">
          <h3 style="color:#98D2EB" id="username">Username</h3><br />
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Enter Username"
            required
          /><br />
        </div>
  <br>
  <div class="form-password">
          <h3 style="color:#98D2EB" id="password">Password</h3><br />
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Enter Password"
            required
          /><br />
        </div>
        <div id="buttonbox">
        <button onclick="location.href='/forgotPassword'" class="registerbtn">Forgot Password</button>
        <button onclick="location.href='/register'" class="registerbtn">Register</button>
        <button onclick="location.href='/profile'" class="registerbtn">Log in</button>
        </div>
      </div>
  </template>
  <style>
  input[type='text'],
  input[type='password'] {
    width: 27%;
    margin: 5px 0 10px 0;
    display: inline-block;
    border: none;
  }
  input[type='text']:focus,
  input[type='password']:focus {
    background-color: #ddd;
    outline: none;
  }
  </style>
