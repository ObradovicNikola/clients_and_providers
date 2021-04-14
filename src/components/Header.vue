<template>
  <header
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    @click="hamburgerActive = false"
  >
    <div class="navbar-brand">
      <div class="navbar-item">
        <span class="is-size-4">Obradović Nikola</span>
      </div>

      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': hamburgerActive === true }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click.stop="hamburgerActive = !hamburgerActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <nav
      class="navbar-menu p-0"
      :class="{ 'is-active': hamburgerActive === true }"
    >
      <div class="navbar-end">
        <a
          href="https://github.com/obradovicnikola"
          target="_blank"
          class="navbar-item"
          rel="noopener noreferrer"
          >Github</a
        >
        <a
          href="https://www.linkedin.com/in/nikola-obradovic-1b4702180/"
          target="_blank"
          class="navbar-item"
          rel="noopener noreferrer"
          >Linkedin</a
        >
      </div>

      <div class="hamburger-cover is-hidden-desktop"></div>
    </nav>
  </header>
</template>

<script>
const name = "Header";

function data() {
  return {
    hamburgerActive: false,
  };
}
export default { name, data };
</script>

<style scoped lang="sass">
.navbar-brand .navbar-item:hover,
.navbar-brand .navbar-item:active
  color: #4a4a4a

.hamburger-cover
  background-color: rgba(240, 240, 240, 0.5)
  width: 100%
  height: 100vh
  position: absolute
  overflow: hidden
</style>
