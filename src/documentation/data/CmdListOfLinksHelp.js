export default [
`<CmdListOfLinks 
    :links="listOfLinks" 
    :cmdCustomHeadline="{
      text: 'Links', 
      level: 5
    }" 
/>`,
`<CmdListOfLinks 
    :links="listOfLinks" 
    orientation="horizontal" 
    :cmdCustomHeadline="{
        headlineText: 'Links', 
        headlineLevel: 5
    }" 
/>`,
`<CmdListOfLinks 
    :links="listOfLinks" 
    :styleAsBox="true" 
    :cmdCustomHeadline="{
      headlineText: 'Links', 
      headlineLevel: 5
    }" />`
]