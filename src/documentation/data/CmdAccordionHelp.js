export default [`<CmdAccordion :accordionData="2">
    <template v-slot:accordionHeadline0>
        <h4>
            <span class="icon-user-group"></span>
            <span>User groups1</span>
        </h4>
    </template>
    <template v-slot:accordionContent0>
        <p>
            Content1
        </p>
    </template>
    <template v-slot:accordionHeadline1>
        <h4>
          <span class="icon-user-group"></span>
          <span>User groups2</span>
        </h4>
    </template>
    <template v-slot:accordionContent1>
        <p>
            Content2
        </p>
    </template>
</CmdAccordion>`,
`<CmdAccordion :accordionData="2">
    <template v-slot:accordionHeadline0>
<h4>
<span class="icon-user-group"></span>
<span>User groups3</span>
</h4>
</template>
<template v-slot:accordionContent0>
    <p>
        Content3
    </p>
</template>
<template v-slot:accordionHeadline1>
    <h4>
        <span class="icon-user-group"></span>
        <span>User groups4</span>
    </h4>
</template>
<template v-slot:accordionContent1>
    <p>
        Content4
    </p>
</template>
</CmdAccordion>`]