import { produce } from 'immer'
import { shallowRef } from 'vue'

interface Task {
  title: string
  done: boolean
}

export function useTasks(baseState: Task[]) {
  const state = shallowRef(baseState)

  const update = (index: number) => {
    const updater = (items: Task[]) => {
      items[index].done = !items[index].done
    }

    state.value = produce(state.value, updater)
  }

  return [state, update] as const
}
