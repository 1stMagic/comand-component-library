export default [
`<CmdFormElement
    labelText="Input (type text):"
    element="input"
    type="text"
    :status="formElementStatus"
    placeholder="Type in text"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
/>`,
`<CmdFormElement
    labelText="Input (type number):"
    element="input"
    type="number"
    :status="formElementStatus"
    placeholder="Type in number"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
/>`,
`<CmdFormElement
    labelText="Input (type color):"
    element="input"
    type="color"
    :status="formElementStatus"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
/>`,
`<CmdFormElement
    labelText="Input (type date):"
    element="input"
    type="date"
    :status="formElementStatus"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
/>`,
`<CmdFormElement
    labelText="Input (type datetime-local):"
    element="input"
    type="datetime-local"
    :status="formElementStatus"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
/>`,
`<CmdFormElement
    labelText="Input (type password):"
    element="input"
    type="password"
    :status="formElementStatus"
    placeholder="Type in password"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
/>`,
`<CmdFormElement
    labelText="Input (type file):"
    element="input"
    type="file"
    :status="formElementStatus"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
/>`,
`<CmdFormElement
    labelText="Input (type range):"
    element="input"
    type="range"
    :status="formElementStatus"
    :useCustomTooltip="false"
    v-model="range"
/>`,
`<CmdFormElement
    :nativeButton="{ 
        text: 'Submit', 
        icon: {
          iconClass: 'icon-edit', 
          show: true
        }
    }"
    element="button"
    type="submit"
    :status="formElementStatus"
    :useCustomTooltip="false"
/>`,
`<CmdFormElement
    :nativeButton="{ 
      icon: {
        iconClass: 'icon-edit', 
        show: true, 
        tooltip: 'I am a tooltip'
      }
    }"
    element="button"
    type="button"
    :status="formElementStatus"
    :useCustomTooltip="false"
/>`,
`<CmdFormElement
    labelText="Input (type checkbox)"
    element="input"
    type="checkbox"
    :status="formElementStatus"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
    v-model="checkbox"
/>`,
`<CmdFormElement
    labelText="Input #1 (type radio)"
    element="input"
    type="radio"
    name="radio-group"
    id="example-radio1"
    :status="formElementStatus"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
    v-model="radio"
    inputValue="Radiobutton1"
/>
<CmdFormElement
    labelText="Input #2 (type radio)"
    element="input"
    type="radio"
    name="radio-group"
    id="example-radio2"
    :status="formElementStatus"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
    v-model="radio"
    inputValue="Radiobutton2"
/>`,
`<CmdFormElement
    labelText="Input (type checkbox)"
    element="input"
    type="checkbox"
    :replace-input-type="true"
    :status="formElementStatus"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
    v-model="checkbox"
/>`,
`<CmdFormElement
    labelText="Input #1 (type radio)"
    element="input"
    type="radio"
    :replace-input-type="true"
    name="radio-group"
    id="example-radio1"
    :status="formElementStatus"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
    v-model="radio"
    inputValue="Radiobutton1"
/>
<CmdFormElement
    labelText="Input #2 (type radio)"
    element="input"
    type="radio"
    name="radio-group"
    :replace-input-type="true"
    id="example-radio2"
    :status="formElementStatus"
    tooltipText="This is a tooltip"
    :useCustomTooltip="false"
    v-model="radio"
    inputValue="Radiobutton2"
/>`,
`<CmdFormElement
    labelText="Selectbox"
    element="select"
    required="required"
    :status="formElementStatus"
    v-model="select"
    :selectOptions="selectOptions"
/>`,
`<CmdFormElement
    labelText="Datalist:"
    element="input"
    type="text"
    :status="formElementStatus"
    placeholder="Type in option"
    :datalist="datalist"
    tooltipText="This is a tooltip"
/>`,
`<CmdFormElement
    labelText="Textarea:"
    element="textarea"
    :status="formElementStatus"
    placeholder="Type in text"
    tooltipText="This is a tooltip"
    v-model="textarea"
/>`
]