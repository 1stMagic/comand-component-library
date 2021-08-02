<template>
    <div class="cmd-box box user">
        <div>
            <img v-if="user.image" src="" alt="" />
            <div v-else class="icon-user-profile"></div>
            <h3 v-if="user.name">{{ user.name }}</h3>
        </div>
        <div class="box-body">
            <p v-if="user.profession">{{ user.profession }}</p>
            <p v-if="user.position">{{ user.position }}</p>
            <p v-if="user.description" class="description">{{ user.description }}</p>
        </div>
        <footer v-if="user.links">
            <ul class="flex-container no-gap">
                <li v-for="(link, linkIndex) in user.links" :key="linkIndex">
                    <a :href="link.href" :target="link.target" :title="link.title" :class="link.iconClass"></a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
export default {
    name: "CmdBoxUser",
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">
/* begin .box.user --------------------------------------------------------------------------------------------------------------------------------------------------- */
.box.user {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;

    > div:first-child {
        padding: var(--default-padding);
        background: var(--pure-white);

        > img, > div {
            display: table;
            margin: 0 auto;
            padding: calc(var(--default-padding) * 3);
            border-radius: var(--full-circle);
            background: var(--primary-color);
            font-size: 6rem;
            color: var(--pure-white);
        }

        h3 {
            margin-top: var(--default-margin);
            margin-bottom: 0;
            text-align: center;
        }
    }

    .box-body {
        padding: var(--default-padding);

        p {
            text-align: center;
            font-weight: bold;

            &:last-child {
                margin-bottom: 0;
            }

            &.description {
                font-weight: normal;
            }
        }
    }

    footer {
        margin-top: auto;
        border-top: var(--default-border);

        ul {
            margin: 0;

            li {
                flex: 1;
                margin: 0;
                list-style-type: none;

                a {
                    display: block;
                    padding: var(--default-padding);
                    text-align: center;
                    background: var(--pure-white);
                    border-left: var(--default-border);


                }

                &:hover, &:active, &:focus {
                    a {
                        background: var(--primary-color);
                        color: var(--pure-white);
                    }
                }

                &:first-child {
                    a {
                        border: 0;
                    }
                }
            }
        }
    }
}
/* end .box.user --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>