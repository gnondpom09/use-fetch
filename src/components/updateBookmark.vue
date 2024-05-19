<script setup lang="ts">
import { computed, toRefs, type Ref } from 'vue'
import type Video from '../models/video.interface'

const props = defineProps<{
  video: Video
  index: number
  update: (video: Video, index: number) => Promise<void>
}>()

const { video, index } = toRefs(props)

const modelValue = computed<Video>({
  get() {
    return video.value
  },
  set(value) {
    emit('update:video', value)
  }
})

function submit(isActive: Ref<boolean>) {
  props.update(modelValue.value, index.value)
  isActive.value = false
}

function updateTitle(event) {
  console.log(event)
  const data = modelValue.value
  data.title = event
  modelValue(data)
}
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="surface-variant" text="Modifier" variant="flat"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Modification">
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :counter="50"
                    label="titre"
                    :model-value="modelValue.title"
                    @update:model-value="updateTitle($event)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" variant="flat" @click="submit(isActive)">Valider</v-btn>

          <v-btn text="Annuler" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
