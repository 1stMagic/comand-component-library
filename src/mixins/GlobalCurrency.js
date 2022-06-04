export default {
    props: {
        /**
         * globalCurrency used in multiple components
         */
        globalCurrency: {
            type: Object,
            default() {
                return {
                    symbol: "€",
                    name: "Euro"
                }
            }
        }
    }
}