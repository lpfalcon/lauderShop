<template>
  <nav id="nav" class="nav justify-content-center nav-underline">
    <router-link class="nav-link" to="/"> Home</router-link>
    <router-link class="nav-link" to="/cart"> About</router-link>
  </nav>
</template>
<style scoped>
#nav {
  padding: 10px;
  width: 100%;
  background-color:var(--color-lauder);
  line-height: 30px;
}
#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin: 0 5px 0 5px;
  font-size: 1.25rem;
}
</style>
