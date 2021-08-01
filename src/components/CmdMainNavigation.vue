<template>
  <div
      :class="['cmd-main-navigation', {'hide-sub-navigation' : !showSubNavigations, 'open': showOffcanvas, 'persist-on-mobile': persistOnMobile, 'show-content-overlay': showContentOverlay}]"
      id="main-navigation">
    <nav>
      <ul :class="{'stretch-items' : stretchMainItems}">
        <li class="close-nav" v-if="showOffcanvas">
          <a href="#" @click.prevent="showOffcanvas = false">
            <span v-if="closeOffcanvas.iconClass" :class="closeOffcanvas.iconClass"></span>
            <span :class="{'hidden': closeOffcanvas.hideText}">{{ closeOffcanvas.text }}</span>
          </a>
        </li>
        <li v-for="(navigationEntry, index) in navigationEntries" :key="index" :class="{'open' : navigationEntry.open}">
          <a :href="navigationEntry.href" :target="navigationEntry.target" @click="clickLink($event, navigationEntry)">
            <span :class="navigationEntry.iconClass" v-if="navigationEntry.iconClass"></span>
            <span>{{ navigationEntry.name }}</span>
            <span v-if="navigationEntry.subentries && navigationEntry.subentries.length > 0"
                  :class="subentriesIconClass"></span>
          </a>
          <ul v-if="navigationEntry.subentries" aria-expanded="true">
            <li v-for="(navigationSubEntry, subindex) in navigationEntry.subentries" :key="subindex"
                :class="{'open' : navigationSubEntry.open}">
              <a :href="navigationSubEntry.href" :target="navigationSubEntry.target"
                 @click="clickLink($event, navigationSubEntry)">
                <span>{{ navigationSubEntry.name }}</span>
                <span :class="subSubentriesIconClass" v-if="navigationSubEntry.subentries"></span>
              </a>
              <ul v-if="navigationSubEntry.subentries">
                <li v-for="(navigationSubSubEntry, subsubindex) in navigationSubEntry.subentries" :key="subsubindex">
                  <a :href="navigationSubSubEntry.href" :target="navigationSubSubEntry.target"
                     @click="clickLink($event, navigationSubSubEntry)">
                    <span>{{ navigationSubSubEntry.name }}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <a href="#" class="button" id="toggle-offcanvas" @click.prevent="showOffcanvas = !showOffcanvas"
       v-if="persistOnMobile === false">
      <span :class="buttonOffcanvas.iconClass"></span>
      <span :class="{'hidden' : buttonOffcanvas.hideText}">{{ buttonOffcanvas.text }}</span>
    </a>
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
    stretchMainItems: {
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
      default: function () {
        return {
          iconClass: "icon-cancel",
          text: "Close navigation",
          hideText: false
        }
      }
    },
    buttonOffcanvas: {
      type: Object,
      default: function () {
        return {
          iconClass: "icon-bars",
          text: "Open navigation",
          hideText: true
        }
      }
    },
    subentriesIconClass: {
      type: String,
      default: "icon-single-arrow-down"
    },
    subSubentriesIconClass: {
      type: String,
      default: "icon-single-arrow-right"
    },
    showContentOverlay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickLink(event, navigationEntry) {
      if (navigationEntry.target || (navigationEntry.href.length > 1)) {
        return true
      }
      if (navigationEntry.href === '#' || navigationEntry.href === '') {
        event.preventDefault()
        this.$emit('click', navigationEntry.href)

      }
      if (!(navigationEntry.subentries && navigationEntry.subentries.length > 0)) {
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

/* begin cmd-main-navigation ---------------------------------------------------------------------------------------- */
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

    + div {
      display: none;
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
        display: flex;
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
        --min-width: 30%;

        position: fixed;
        top: 0;
        left: -100%;
        min-width: var(--min-width);
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
              span {
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
              > a span {
                + span[class*="icon"]::before {
                  display: inline-block;
                  transform: rotate(-180deg);
                }
              }

              > ul {
                height: auto;
                display: block;
                opacity: 1;

                > li {
                  > a {
                    span {
                      + span[class*="icon"]::before {
                        transform: rotate(90deg);
                      }
                    }
                  }

                  &.open {
                    > a {
                      span {
                        + span[class*="icon"]::before {
                          transform: rotate(-90deg);
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
    --nav-transition: all .5s linear;

    background: none;
    border: 0;

    /* begin offcanvas-navigation */
    &:not(.persist-on-mobile) {
      transition: (--nav-transition);

      &.open {
        nav {
          transition: (--nav-transition);
          background: var(--default-background-color);
          border-right: var(--default-border);
        }
      }

      ul {
        border: 0;

        li {
          border-bottom: var(--default-border);
          border-right: 0;

          &.close-nav {
            border-bottom: var(--default-border);

            a {
              align-items: center;

              span {
                font-weight: bold;
              }
            }
          }

          > a {
            text-align: left;
          }

          &.open {
            > ul {
              transition: (--nav-transition);
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: $medium-max-width) {
  #main-navigation {
    display: flex;
    background: none; /* overwrite framework-css */
    border: 0; /* overwrite framework-css */
    padding: 0 var(--default-padding);

    nav {
      ul {
        ul {
          li {
            &:not(:first-child) {
              border-top: 0;
            }

            &:last-child {
              border-bottom: 0;
            }
          }
        }
      }
    }

    &.show-content-overlay {
      nav {
        &::after {
          content: "";
          position: fixed;
          width: calc(100% - var(--min-width));
          top: 0;
          left: var(--min-width);
          height: 100%;
          display: block;
          background: var(--pure-black-reduced-opacity);
        }
      }
    }
  }
}

/* keep outside of .cmd-main-navigation to keep specificity */
#toggle-offcanvas {
  margin-left: 0;
  display: none;
}

/* end cmd-main-navigation ------------------------------------------------------------------------------------------ */
</style>