<template>
  <div>
    <div class="flex items-center gap-1.5">
      <Button class="hidden sm:flex" :disabled="exportingState" @click="tryExport">
        Exporter
        <Icon v-show="!exportingState" name="lucide:download" size="20" />
        <Icon v-show="exportingState" name="lucide:loader-circle" size="20" class="animate-spin" />
      </Button>
      <p class="block sm:hidden">
        Vous semblez être sur un mobile, pour une meilleures expérience, veuillez exporter depuis un desktop ou un
        laptop
      </p>
    </div>

    <Teleport to="body">
      <div class="absolute translate-x-[100vw] top-0">
        <div
          v-for="(item, x) in props.day"
          :id="'table' + x"
          :key="x"
          class="w-[1920px] text-neutral-950 h-[1357px] p-8 text-2xl flex flex-col justify-between gap-8 bg-white"
        >
          <div class="flex flex-col gap-8">
            <img class="w-96" src="@/assets/pictures/logo_swiss_army.png" />
            <div class="flex flex-col gap-8 p-5">
              <h1>Plan de garde</h1>
              <p>Officier de garde : {{ officer }}</p>
              <p>Commandant de garde : {{ commander }}</p>
              <p>
                {{ item.date }}
              </p>
              <table class="w-full text-neutral-950">
                <thead>
                  <tr>
                    <td class="px-2">Paire de soldat</td>
                    <td v-for="(n, index) in props.periodCount" :key="index">
                      <div class="flex flex-col justify-center items-center">
                        <div>
                          {{ decimalToTime((index * props.periodDuration) / 60) }}
                        </div>
                        <div class="-my-2.5">-</div>
                        <div>
                          {{ decimalToTime(Math.min(24, ((index + 1) * props.periodDuration) / 60)) }}
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pair in item.pair" :key="randomID">
                    <td class="px-2 whitespace-nowrap">{{ pair.name }}</td>
                    <td v-for="period in pair.period" :key="randomID" class="min-w-20" :class="period.class">
                      <div class="flex justify-center px-2">
                        {{ period.name }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex text-neutral-950 justify-between items-center">
            <p>{{ new Date().toDateString() }}</p>
            <p class="text-neutral-500">Tool provided by ArtyomInc (arduc.ch)</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/ui/button'
import exportPDF from '@/utils/export-pdf'
import { toPng } from 'html-to-image'
import { toast } from 'vue-sonner'

import type { GuardPerDay } from '~/interfaces'

import { decimalToTime, randomID } from '~/lib/utils'

const props = defineProps<{
  day: GuardPerDay[]
  periodDuration: number
  periodCount: number
  officer: string
  commander: string
}>()

const exportingState = ref<boolean>(false)

function tryExport() {
  exportingState.value = true
  setTimeout(() => {
    exportToPDF()
  }, 200)
}

async function exportToPDF() {
  try {
    const dataUrls: string[] = []

    const promises = props.day.map(async (_, index) => {
      const element = document.getElementById('table' + index)
      if (element) {
        try {
          const dataUrl = await toPng(element)
          dataUrls.push(dataUrl)
        } catch (err: any) {
          throw new Error(err)
        }
      }
    })

    await Promise.all(promises)

    await exportPDF(dataUrls)
  } catch (err: any) {
    toast('Error during exportation', {
      description: err.message
    })
  } finally {
    setTimeout(() => {
      exportingState.value = false
    }, 500)
  }
}
</script>

<style scoped>
td {
  @apply border border-neutral-500;
}
</style>
