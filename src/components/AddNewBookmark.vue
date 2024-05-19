<script setup lang="ts">
import { ref, type Ref } from 'vue'

const props = defineProps<{
  addVideo: (url: string) => Promise<void>
}>()

const url = ref<string>('')

function submit(isActive: Ref<boolean>) {
  props.addVideo(url.value)
  url.value = ''
  isActive.value = false
}
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="primary" text="Ajouter" variant="flat"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Nouveau bookmark">
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="url" label="url"></v-text-field>
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
