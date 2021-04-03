<template>
    <div class="box content">
        <div>
            <slot name="header"></slot>
        </div>
        <div class="box-body">
            <slot name="body"></slot>
        </div>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
export default {
    name: "CmdBoxContent"
}
</script>

<style lang="scss">
/* begin .box.content --------------------------------------------------------------------------------------------------------------------------------------------------- */
.box.content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;

    > * {
        > *:last-child {
            margin-bottom: 0;
        }

        &:last-child {
            margin-top: auto;
        }
    }

    > div:first-child {
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        padding: calc(var(--default-padding) / 2) var(--default-padding);
    }

    .box-body {
        height: 100%;

        .padding {
            padding: var(--default-padding);
        }

        img {
            display: block;
        }

       .navigation {
           margin: 0;
           height: 100%;

           li {
               list-style-type: none;
               margin: 0;

               a {
                   display: block;
                   padding: var(--default-padding);
                   text-decoration: none;
               }
           }
       }
    }

    footer {
       border-bottom-left-radius: var(--border-radius);
       border-bottom-right-radius: var(--border-radius);
       padding: var(--default-padding);
    }
}
/* end .box.content --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>