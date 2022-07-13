<template>
  <nav>
    <h1 class="head_logo"><router-link to="/"><img alt="부팅로고" src="./assets/img/logo_s.png"></router-link></h1> |
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view></router-view>
</template>

<style>
.head_logo{}
.head_logo img{width: 140px;}
.btn-common-views{display:inline-block;vertical-align:middle;height:59px;line-height:57px;text-align:center;border:1px solid #333;font-size:17px;color:#333;padding:0 19px 0 23px;transition:all .3s ease}
.humans .photo img{padding: 10px}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
