export default {
  props: {
    /**
     * Message properties for internationalization.
     *
     * You can either specify an object with key-value-pairs or a function which
     * takes at least one input parameter (the key) and returns the according
     * message.
     *
     * If key-value-pairs are provided, the value can be either a string or a
     * function. If it is a function, then it is called with an array of
     * replacements for placeholders in the message.
     *
     * If a function is provided, it is called with two parameters. The first
     * parameter is the message key and the second parameter is an array of
     * replacements for placeholders in the message.
     *
     * Example:
     * <pre>
     * {
     *   "my.message1": "My {0} test message with {1} placeholders",
     *   "my.message2": params => "My {0} message".replace("{0}", params[0])
     * }
     * </pre>
     */
    i18n: {
      type: [Object, Function],
      default: () => ({})
    }
  },
  methods: {
    getMessage(key, ...params) {
      if (!key) {
        return ""
      }
      let messages = this.i18n
      if (typeof this.i18n === "function") {
        messages = this.i18n.call(this, key, params)
        if (typeof messages !== "object") {
          return messages
        }
      }
      let message =
        messages[key] ||
        this.getDefaultMessageProperty(key) ||
        key
      if (typeof message === "function") {
        return message.call(this, params || []);
      }
      if (Array.isArray(params) && params.length) {
        params.forEach((param, index) => (message = message.replace("{" + index + "}", param)))
      }
      return message
    },
    getDefaultMessageProperty(key) {
      if (Object.hasOwn(this, "defaultMessageProperties") && this.defaultMessageProperties && this.defaultMessageProperties[key]) {
        return this.defaultMessageProperties[key]
      }
      //const propertyKey = Object.keys(this).find(p => p.slice(-24) === "DefaultMessageProperties")
      const propertyKey = Object.hasOwn(this, "fieldValidationDefaultMessageProperties") ? "fieldValidationDefaultMessageProperties" : null
      if (propertyKey && this[propertyKey]?.[key]) {
        return this[propertyKey][key]
      }
      return null
    }
  }
}
