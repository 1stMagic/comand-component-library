<template>
    <div>
        Rest in peace
        <CmdHeadline headline-text="headline" headline-level="1" />
        <CmdAddressData :address-data="addressData" />
    </div>
</template>

<script>
import addressData from "./assets/data/address-data.json"
export default {
    data() {
        return {
            addressData
        }
    }
}
</script>