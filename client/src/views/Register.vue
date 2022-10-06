<template>
    <div id="center">
    <h1 style="color:#FFCA3A;">New Account Registration</h1>
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
          <div class="form-password">
            <h3 style="color:#98D2EB" id="name  ">Name</h3><br />
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Enter Password"
              required
            /><br />
          </div>
          <div class="form-password">
            <h3 style="color:#98D2EB" id="email">Email</h3><br />
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Enter Password"
              required
            /><br />
          </div>
          <div id="buttonbox">
          <button onclick="location.href='/'" class="registerbtn">Create Account</button>
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
    input[type='text']:focus,
    input[type='name']:focus {
      background-color: #ddd;
      outline: none;
    }
    input[type='text']:focus,
    input[type='email']:focus {
      background-color: #ddd;
      outline: none;
    }
    </style>
