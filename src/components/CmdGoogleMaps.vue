<template>
  <div class="cmd-google-maps responsive-wrapper">
    <iframe :src="locateAddress"></iframe>
  </div>
</template>

<script>
export default {
  name: "CmdGoogleMaps",
  props: {
    addressData: {
      type: Object,
      required: true
    }
  },
  computed: {
    locateAddress() {
      return "https://maps.google.de/maps?hl=de&q=" + this.addressData.address.streetNo + ",+" + this.addressData.address.zip + "+" + this.addressData.address.city + "&ie=UTF8&t=&z=17&iwloc=B&output=embed"
    }
  }
}
</script>

<style lang="scss">
/* begin cmd-google-maps ---------------------------------------------------------------------------------------- */
.cmd-google-maps {
  border: var(--default-border);
}
/* end cmd-google-maps ------------------------------------------------------------------------------------------ */
</style>