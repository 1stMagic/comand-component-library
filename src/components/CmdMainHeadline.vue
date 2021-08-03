<template>
  <header class="cmd-main-headline">
    <span v-if="iconClass" :class="iconClass"></span>
    <div v-if="preHeadline">
      <p>{{ preHeadline }}</p>
      <h1>{{ mainHeadline }}</h1>
    </div>
    <h1 v-else>{{ mainHeadline }}</h1>
  </header>
</template>

<script>
export default {
  name: "CmdMainHeadline",
  props: {
    mainHeadline: {
      type: String,
      required: true
    },
    preHeadline: {
      type: String,
      required: false
    },
    iconClass: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

/* begin cmd-main-headline ------------------------------------------------------------------------------------------ */
.cmd-main-headline {
  display: flex;
  align-items: center;
  margin-bottom: var(--default-margin);
  gap: calc(var(--default-gap) / 2);

  p {
    margin-bottom: 0;
  }

  h1 {
    margin: 0;
    display: flex;
    align-items: center;
  }

  [class*="icon"] {
    font-size: 5rem;
  }

  @media only screen and ($small-max-width) {
    flex-direction: column;

    h1 {
      margin-bottom: calc(var(--default-margin) * 2);
    }
  }
}

/* end cmd-main-headline ------------------------------------------------------------------------------------------ */
</style>
