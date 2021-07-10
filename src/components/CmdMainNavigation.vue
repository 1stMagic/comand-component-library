<template>
  <div :class="['cmd-main-navigation', {'hide-sub-navigation' : !showSubNavigations, 'open': showOffcanvas, 'persist-on-mobile': persistOnMobile}]" id="main-navigation">
    <nav>
      <ul :class="{'stretch-items' : stretchMainItems}">
        <li class="close-nav" v-if="showOffcanvas">
          <a href="#" @click.prevent="showOffcanvas = false">
            <span :class="closeOffcanvas.iconClass" v-if="closeOffcanvas.iconClass"></span>
            <span v-if="closeOffcanvas.text">{{ closeOffcanvas.text }}</span>
          </a>
        </li>
        <li v-for="(navigationEntry, index) in navigationEntries" :key="index" :class="{'open' : navigationEntry.open}">
          <a :href="navigationEntry.href" :target="navigationEntry.target" @click="clickLink($event, navigationEntry)">
            <span :class="navigationEntry.iconClass" v-if="navigationEntry.iconClass"></span>
            <span>{{ navigationEntry.name }}</span>
            <span v-if="navigationEntry.subentries && navigationEntry.subentries.length > 0" class="icon-single-arrow-down"></span>
          </a>
          <ul v-if="navigationEntry.subentries" aria-expanded="true">
            <li v-for="(navigationSubEntry, subindex) in navigationEntry.subentries" :key="subindex" :class="{'open' : navigationSubEntry.open}">
              <a :href="navigationSubEntry.href" :target="navigationSubEntry.target" @click="clickLink($event, navigationSubEntry)">
                <span>{{ navigationSubEntry.name }}</span>
                <span :class="iconSubentries" v-if="navigationSubEntry.subentries"></span>
              </a>
              <ul v-if="navigationSubEntry.subentries">
                <li v-for="(navigationSubSubEntry, subsubindex) in navigationSubEntry.subentries" :key="subsubindex">
                  <a :href="navigationSubSubEntry.href" :target="navigationSubSubEntry.target" @click="clickLink($event, navigationSubSubEntry)">
                    <span>{{ navigationSubSubEntry.name }}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <a href="#" :class="['button', iconToggleOffcanvas]" id="toggle-offcanvas" @click.prevent="showOffcanvas = !showOffcanvas" v-if="persistOnMobile === false"></a>
  </div>
</template>

<script>
    export default {
        name: "CmdMainNavigation",
        data() {
            return {
                showOffcanvas: false,
                showSubNavigations: true
            }
        },
        props: {
            stretchMainItems:{
                type: Boolean,
                default: false
            },
            persistOnMobile: {
                type: Boolean,
                default: false
            },
            navigationEntries: {
                type: Array,
                required: true
            },
            closeOffcanvas: {
                type: Object,
                required: true
            },
            iconSubentries: {
                type: String,
                default: "icon-single-arrow-right"
            },
            iconToggleOffcanvas: {
                type: String,
                default: "icon-bars"
            }
        },
        methods: {
            clickLink (event, navigationEntry) {
                if(navigationEntry.target || (navigationEntry.href.length > 1)) {
                    return true
                }
                if(navigationEntry.href === '#' || navigationEntry.href === '') {
                    event.preventDefault()
                    this.$emit('click', navigationEntry.href)

                }
                if(!(navigationEntry.subentries && navigationEntry.subentries.length > 0)) {
                    this.showOffcanvas = false
                } else {
                    // add entry "open" to navigationEntry-object (will be watched by vue3 automatically)
                    navigationEntry.open = !navigationEntry.open
                }
            }
        }
    }
</script>

<style lang="scss">
@import '../assets/styles/variables';
/* begin cmd-main-navigation --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-main-navigation {
  &.hide-sub-navigation {
    ul {
      ul {
        display: none;
      }
    }
  }

  nav {
    .stretch-items {
      > li {
        flex: 1
      }
    }

    > ul {
      > li {
        .close-nav {
          display: none;
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    left: 0;
  }

  .fade-enter, .fade-leave-to {
    left: -100%;
  }

  header nav > ul, header nav > ul > li {
    border: 0;
  }

  @media only screen and (max-width: $medium-max-width) {
    /* begin offcanvas-navigation */
    &:not(.persist-on-mobile) {
      #toggle-offcanvas {
        display: table;
        margin-bottom: 0;
        width: auto;
      }

      &.open {
        nav {
          left: 0;
          opacity: 1;
          padding: 0 !important;
        }
      }

      nav {
        position: fixed;
        top: 0;
        left: -100%;
        min-width: 50%;
        height: 100%;
        opacity: 0;
        z-index: 500;

        ul {
          flex-direction: column;
          border-bottom: 0;
          border-left: 0;
          position: relative;
          left: 0;

          li {
            &.close-nav {
              display: block;
              a {
                display: flex;
              }
            }

            &:not(.open) {
              &:hover, &:active, &:focus {
                > ul {
                  display: none;
                }
              }
            }

            > a {
              span  {
                & + span[class*="icon"]::before {
                  display: inline-block;
                }
              }
            }

            /* sub-level 1 */
            ul {
              li {
                a {
                  padding-left: calc(var(--default-margin) * 2);
                }

                /* sub-level 2 */
                ul {
                  li {
                    a {
                      padding-left: calc(var(--default-margin) * 4);
                    }
                  }
                }
              }
            }

            &.open {
              > a span + span[class*="icon"]::before {
                display: inline-block;
                transform: rotate(-180deg);
              }

              > ul {
                height: auto;
                display: block;
                opacity: 1;

                > li {
                  > a {
                    span {
                      + span[class*="icon"]::before {
                        transform: rotate(-90deg);
                      }
                    }
                  }

                  &.open {
                    > a {
                      span {
                        + span[class*="icon"]::before {
                          transform: rotate(90deg);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: $medium-max-width) {
  .cmd-main-navigation {
    padding: 0 var(--default-padding);
  }
}

/* keep outside of #navigation-wrapper to keep specificity */
#toggle-offcanvas {
  margin-left: 0;
  display: none;
}
/* end cmd-main-navigation --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>