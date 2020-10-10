<template>
    <div class="box user">
        <header>
            <img v-if="user.image" src="" alt="" />
            <div v-else class="icon-user_profile"></div>
            <h3 v-if="user.name">{{ user.name }}</h3>
        </header>
        <div class="box-body">
            <p v-if="user.profession">{{ user.profession }}</p>
            <p v-if="user.position">{{ user.position }}</p>
            <p v-if="user.description" class="description">{{ user.description }}</p>
        </div>
        <footer v-if="user.links">
            <ul>
                <li v-for="(link, linkIndex) in user.links" :key="linkIndex">
                    <a :href="link.href" :target="link.target" :title="link.title" :class="link.iconClass"></a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
export default {
    name: "BoxUser",
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

    header {
        padding: var(--default-padding);
        background: var(--pure-white);

        > img, > div {
            display: table;
            margin: 0 auto;
            border-radius: var(--full-circle);
            padding: calc(var(--default-padding) * 3);
            background: var(--primary-color);
            font-size: 6rem;
            color: var(--pure-white);
        }

        h3 {
            text-align: center;
            margin-top: var(--default-margin);
            margin-bottom: 0;
        }
    }

    .box-body {
        padding: var(--default-padding);

        p {
            text-align: center;
            font-weight: bold;

            &.description {
                font-weight: normal;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    footer {
        margin-top: auto;
        border-top: var(--default-border);

        ul {
            display: flex;
            flex-direction: row;
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
                    border-left: var(--primary-border);
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