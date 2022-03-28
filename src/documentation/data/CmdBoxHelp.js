export default [`<CmdBox
:cmdCustomHeadline="{
    headlineText: 'Headline given by property',
    headlineLevel: 5
}"
textBody="Content given by property"
/>`,
`<CmdBox
:cmdCustomHeadline="{
  headlineText: 'Headline given by property',
  headlineLevel: 5
}"
textBody="Content given by property"
:collapsible="true"
/>`,
`<CmdBox :useSlot="true">
    <template v-slot:header>
        <h5>
          Headline given by slot
        </h5>
    </template>
    <template v-slot:body>
        <p class="padding">
            Content given by slot
        </p>
    </template>
    <template v-slot:footer>
        <p>
            Footer given by slot
        </p>
    </template>
</CmdBox>`,
`<CmdBox 
  boxType="product" 
  :product="boxesProduct[0]" 
  :cmdCustomHeadline="{ headlineLevel: 4}" 
  @click.prevent="clickedOnProduct"
/>`,
`<CmdBox 
boxType="user" 
:user="boxesUser[2]" 
:cmdCustomHeadline="{ 
  headlineLevel: 4
}"/>`
]