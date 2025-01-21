<template>
  <div>
    <div>
      <label>Date et heure de commencement</label>
      <Input v-model="userField.begin" type="datetime-local" />
    </div>
    <div>
      <label>Date et heure de fin</label>
      <Input v-model="userField.end" type="datetime-local" />
    </div>
    <div>
      <label>Durée de la période de garde [minutes]</label>
      <Input v-model="userField.periodDuration" placeholder="120" type="number" />
    </div>
    <div>
      <label>Officier de la garde</label>
      <Input v-model="userField.officer" placeholder="of Nathan" type="text" />
    </div>
    <div>
      <label>Commandant de la garde</label>
      <Input v-model="userField.commander" placeholder="sgt Cyril" type="text" />
    </div>
    <div class="flex flex-col gap-1">
      <label>Paire de soldat</label>
      <template v-for="(pair, index) in userField.pair" :key="index">
        <div class="flex items-center gap-1">
          <Input v-model="userField.pair[index]" placeholder="Jean" type="text" />
          <Button v-if="index !== 0" size="icon" variant="destructive" @click="userField.pair.pop()"
            ><Icon name="lucide:trash" size="20"
          /></Button>
        </div>
      </template>
      <div>
        <Button variant="outline" @click="userField.pair.push('')"
          >Ajouter
          <Icon name="lucide:plus" size="20" />
        </Button>
      </div>
    </div>
    <Button class="mt-4 w-full" @click="generatePlan"
      >Générer
      <Icon name="lucide:iteration-ccw" size="20" />
    </Button>
    <Dialog v-model:open="isOpen">
      <DialogContent class="max-h-[95svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Plan de garde</DialogTitle>
          <DialogDescription> Plan de garde généré </DialogDescription>
        </DialogHeader>
        <template v-if="guardPlan">
          <div v-for="day in guardPlan.day" :key="day.date" class="w-full overflow-x-auto">
            <p>
              {{ day.date }}
            </p>
            <table class="w-full">
              <thead>
                <tr>
                  <td class="px-2">Paire de soldat</td>
                  <td v-for="(n, index) in periodCount" :key="index">
                    <div class="flex flex-col justify-center items-center">
                      <div>
                        {{ decimalToTime((index * userField.periodDuration) / 60) }}
                      </div>
                      <div class="-my-2.5">-</div>
                      <div>
                        {{ decimalToTime(((index + 1) * userField.periodDuration) / 60) }}
                      </div>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pair in day.pair" :key="randomID">
                  <td class="px-2 whitespace-nowrap">{{ pair.name }}</td>
                  <td v-for="period in pair.period" :key="randomID" :class="{ 'bg-red-100': period === 'Garde' }">
                    <div class="flex justify-center px-2">
                      {{ period }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <DialogFooter>
          <Button>
            Exporter
            <Icon name="lucide:download" size="20" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog'
import { Input } from '@/ui/input'
import { onMounted, reactive, ref } from 'vue'

import { calculateDaysBetweenDates, decimalToTime, randomID } from '~/lib/utils'

const userField = reactive<{
  begin?: string
  end?: string
  periodDuration: number
  officer: string
  commander: string
  pair: string[]
}>({
  commander: 'sgt Cyril',
  officer: 'of Nathan',
  pair: ['Jean & Pierre', 'Michel & Nils'],
  periodDuration: 120
})

const periodCount = ref<number>(0)

interface Pair {
  name: string
  period: string[]
}

interface Day {
  date: string
  pair: Pair[]
}

const guardPlan = ref<
  | {
      day: Day[]
    }
  | undefined
>(undefined)

const isOpen = ref(false)

function checkForm() {
  if (userField.begin === undefined || userField.end === undefined) {
    throw new Error()
  }
}

function generatePlan() {
  try {
    checkForm()
  } catch {
    return
  }

  const beginDateTime = new Date(userField.begin!)
  const endDateTime = new Date(userField.end!)

  const numberOfDay = calculateDaysBetweenDates(beginDateTime, endDateTime)

  periodCount.value = 24 / (userField.periodDuration / 60)

  guardPlan.value = {
    day: []
  }

  for (let x = 0; x < numberOfDay; x++) {
    const day: Day = {
      date: 'Date',
      pair: []
    }

    for (let y = 0; y < userField.pair.length; y++) {
      const periods: string[] = []

      for (let z = 0; z < periodCount.value; z++) {
        if (x == 0 && (z * 24) / periodCount.value + 2 < beginDateTime.getHours()) {
          periods.push('')
        } else if (1 + x == numberOfDay && (z * 24) / periodCount.value > endDateTime.getHours()) {
          periods.push('')
        } else if ((y + z) % userField.pair.length === 0) {
          periods.push('Garde')
        } else {
          periods.push('')
        }
      }

      day.pair.push({
        name: userField.pair[y],
        period: periods
      })
    }

    guardPlan.value.day.push(day)
  }
  isOpen.value = true
}

onMounted(() => {
  generatePlan()
})
</script>

<style scoped>
td {
  @apply border;
}
</style>
