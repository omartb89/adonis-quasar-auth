<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    persistent
    transition-show="slide-up"
    transition-hide="scale"
    @hide="onDialogHide"
    :maximized="extraSmallScreen">
    <q-card class="q-mx-md" :style="extraSmallScreen ? '' : 'width:50%'">
      <q-card-section>
        <q-icon
          dense
          class="q-mb-sm" :size="extraSmallScreen ? 'xs': 'sm'"
          :name="icon ? icon : transform === 'execute' ? 'warning' : 'info'"
          :color="color ? color : transform === 'execute' ? 'warning' : 'info'"
        />
        <span :class="[extraSmallScreen ? '' : 'text-h6', 'text-bold text-grey-9', 'q-ml-xs']">
                {{title ? title : transform === 'execute' ? 'Warning' : 'Information'}}
            </span>
        <q-btn
          @mouseenter="closeFocus = true"
          @mouseleave="closeFocus = false"
          class="float-right"
          icon="close"
          :color="closeFocus ? 'negative' : ''"
          :size="extraSmallScreen ? 'sm' : ''"
          flat
          dense
          v-close-popup
        ></q-btn>
        <q-separator inset=""/>
      </q-card-section>
        <div v-if="transform === 'execute' || transform === 'info'" class="row q-mx-md">
          <div v-if="typeof(body) === 'object'"
          >
            <div v-for="(limb, index) in Object.keys(body)" :key="index" class="row col-12 text-weight-light text-body2 text-grey-9 q-mx-md">
              <div class="row col-12" v-if="index === 0">{</div>
              <br v-if="index === 0">
              <code class="q-ml-sm" >
                {{limb + ':'}}
                <span
                  :class="
                        [
                            {'text-positive': typeof(body[limb]) === 'string'},
                            {'text-purple-9': typeof(body[limb]) === 'number'},
                            {'text-amber-9': typeof(body[limb]) === 'boolean'},
                            {'text-negative': typeof(body[limb]) === 'object' && body[limb] === null},
                            {'text-info': typeof(body[limb]) === 'object' && body[limb] !== null},
                            {'text-grey-8': typeof(body[limb]) === 'undefined'},
                        ]"
                >
                        {{body[limb] !== null ? body[limb] : 'null'}}
                    </span>
              </code>
              <br v-if="index === Object.keys(body).length -1">
              <div class="row col-12" v-if="index === Object.keys(body).length -1">}</div>
            </div>
          </div>
          <span v-else class="text-weight-light text-body2 q-mx-md" v-html="body"/>
        </div>
        <div v-if="transform === 'timeline'" class="q-mx-md">
          <q-timeline color="secondary">
            <q-timeline-entry
              v-for="(entry, index) in tva" :key="index"
              :subtitle="entry.subtitle"
              :icon="entry.icon"
              :color="entry.color"
              v-show="theBanisher(entry.field)"
              class="q-ml-md"
            >
              <div v-if="typeof (entry.field) === 'string' && typeof (body[entry.field]) !== 'object'">
                {{ body[entry.field] }}
              </div>
              <q-chip
                v-show="typeof (body[entry.field]) === 'object'"
                v-for="(item, counter) in body[entry.field]" :key="counter"
                dense
                size="sm"
                :color="entry.chipColor || 'secondary'"
                dark
                class="q-mx-xs q-mt-xs glossy "
              >
                {{ item[entry.core]}}
              </q-chip>
              <div v-if="typeof (entry.field) !== 'string'">
                        <span v-for="(item, counter) in entry.field" :key="counter">
                            {{ body[item] + (counter !== entry.field.length - 1 ? ' ' + entry.nexus : '') }}
                        </span>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>
      <!-- buttons example -->
      <q-form @submit="transform === 'execute' ? onOKClick() : hide()" dense greedy>
        <div
          v-if="extra"
          class="q-my-sm q-mx-md">
          <q-input
            class="q-mx-md"
            dense
            v-model="emitter"
            :label="extraLabel"
            :lazy-rules="!!extra"
            :rules="extra ? [val => !!val  || 'Campo requerido'] : ''"
          ></q-input>
        </div>
        <q-card-actions class="q-my-sm" align="center" dark>
          <q-btn
            type="submit"
            size="12px"
            dense
            no-caps
            :class="transform === 'execute' ? 'q-mr-xs' : ''"
            color="primary"
            icon="check"
          ><span class="text-bold">Aceptar</span></q-btn>
          <q-btn
            v-if="transform === 'execute'"
            size="12px"
            no-caps
            icon="close"
            dense
            flat
            v-close-popup
          ><span class="text-bold">Cancelar</span></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useSpaceGem } from 'src/resources/useSpaceGem'

export default defineComponent({
  name: 'DittoDialog',
  props: {
    // ...your custom props
    title: {
      type: String
    },
    transform: {
      type: String,
      default: 'execute'
    },
    icon: {
      type: String
    },
    color: {
      type: String
    },
    body: {
      type: [String, Object]
    },
    tva: {
      type: Array
    },
    extra: {
      type: Boolean,
      default: false
    },
    extraLabel: {
      type: String,
      default: ''
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],
  setup () {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const { smallScreen, extraSmallScreen } = useSpaceGem()
    const closeFocus = ref(false)
    const emitter = ref('')
    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,
      smallScreen,
      extraSmallScreen,
      closeFocus,
      emitter,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick () {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK()
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
      theBanisher (field) {
        if (typeof (field) === 'string') {
          return (this.body[field] && this.body[field] !== '')
        } else {
          for (let i = 0; i < field.length; i++) {
            if (!this.body[field[i]] || this.body[field[i]] === '') {
              return false
            }
          }
        }
        return true
      }
    }
  }
})
</script>
