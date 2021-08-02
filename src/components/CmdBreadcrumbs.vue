<template>
  <ul class="cmd-breadcrumbs">
    <li v-if="breadcrumbLabel">{{ breadcrumbLabel }}</li>
    <li v-for="(link, index) in breadcrumbLinks" :key="index">
      <a :href="link.path" v-if="link.type === 'href'">
        <span v-if="link.iconClass" :class="link.iconClass"></span>
        <span v-if="link.text">{{ link.text }}</span>
      </a>
      <router-link v-else-if="link.type === 'router'" :to="link.to">
        <span v-if="link.iconClass" :class="link.iconClass"></span>
        <span v-if="link.text">{{ link.text }}</span>
      </router-link>
      <span v-else>
        <span v-if="link.iconClass" :class="link.iconClass"></span>
        <span v-if="link.text">{{ link.text }}</span>
      </span>
      <span v-if="index < breadcrumbLinks.length - 1">{{ breadcrumbSeparator }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CmdBreadcrumbs",
  props: {
    breadcrumbLinks: {
      type: Array,
      required: false
    },
    breadcrumbLabel: {
      type: String,
      required: false
    },
    breadcrumbSeparator: {
      type: String,
      default: ">"
    }
  }
}
</script>

<style lang="scss">
/* begin cmd-breadcrumbs ---------------------------------------------------------------------------------------- */
.cmd-breadcrumbs {
  display: flex;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0;

    > span {
      padding: 0 calc(var(--default-padding) / 2);
    }

    &:first-child {
      margin-right: calc(var(--default-margin) / 2);
    }

    &:last-child {
      > span {
        display: none;
      }
    }

    a {
      text-decoration: none;

      &:hover, &:active, &:focus {
        text-decoration: underline;
      }
    }
  }
}
/* end cmd-breadcrumbs ------------------------------------------------------------------------------------------ */
</style>