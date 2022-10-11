<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
      <router-link to="/schedulingSubmit">schedulingSubmit</router-link>
      <router-link to="/scheduling"></router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>
