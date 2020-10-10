<template>
    <div class="box content">
        <header>
            <slot name="header"></slot>
        </header>
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
    name: "BoxContent"
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

    header {
        background: var(--primary-color);
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        padding: calc(var(--default-padding) / 2) var(--default-padding);

        > * {
            color: var(--pure-white);
        }
    }

    .box-body {
        .padding {
            padding: var(--default-padding);
        }

       .navigation {
           margin: 0;

           li {
               list-style-type: none;
               margin: 0;

               a {
                   display: block;
                   padding: calc(var(--default-padding) / 2);
                   text-decoration: none;
                   background: var(--pure-white);
                   border-bottom: var(--default-border);

                   &:hover, &:active &:focus {
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
       border-top: var(--default-border);
       border-bottom-left-radius: var(--border-radius);
       border-bottom-right-radius: var(--border-radius);
    }
}
/* end .box.content --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>