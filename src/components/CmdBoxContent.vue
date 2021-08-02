<template>
    <div class="cmd-box box content">
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
        background: var(--primary-color);

        > * {
            color: var(--pure-white);
        }
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
           background: var(--pure-white);

           li {
               list-style-type: none;
               margin: 0;

               a {
                   display: block;
                   padding: var(--default-padding);
                   text-decoration: none;
                   background: var(--pure-white);
                   border-bottom: var(--default-border);

                   &:hover, &:active, &:focus {
                       background: var(--primary-color);
                       color: var(--pure-white);
                   }
               }

               &:last-child {
                   a {
                       border: 0;
                   }
               }
           }
       }
    }

    footer {
       border-bottom-left-radius: var(--border-radius);
       border-bottom-right-radius: var(--border-radius);
       padding: var(--default-padding);
        border-top: var(--default-border);
    }
}
/* end .box.content --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>