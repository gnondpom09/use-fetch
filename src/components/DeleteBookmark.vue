<script setup lang="ts">
import { toRefs, type Ref } from 'vue'

const props = defineProps<{
  id: string
  index: number
  delete: (id: string, index: number) => Promise<void>
}>()

const { id, index } = toRefs(props)

function submit(isActive: Ref<boolean>) {
  props.delete(id.value, index.value)
  isActive.value = false
}
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="error" text="Supprimer" variant="text"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Nouveau bookmark">
        <v-card-text>
          <p>Voulez-vous vraiment supprimer cette vidéo ?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="warning" variant="flat" @click="submit(isActive)">Valider</v-btn>

          <v-btn text="Annuler" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
