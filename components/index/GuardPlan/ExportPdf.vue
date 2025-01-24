<template>
  <div>
    <Button :disabled="exportingState" @click="exportToPDF">
      Exporter
      <Icon v-if="!exportingState" name="lucide:download" size="20" />
      <Icon
        v-if="exportingState"
        name="lucide:loader-circle"
        size="20"
        class="animate-spin"
      />
    </Button>

    <Teleport to="body">
      <div class="absolute translate-x-[100vw] top-0">
        <div
          v-for="(item, x) in props.day"
          :id="'table' + x"
          :key="x"
          class="w-[1920px] h-[1357px] p-8 text-2xl flex flex-col justify-between gap-8 bg-white"
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
              <table class="w-full">
                <thead>
                  <tr>
                    <td class="px-2">Paire de soldat</td>
                    <td v-for="(n, index) in props.periodCount" :key="index">
                      <div class="flex flex-col justify-center items-center">
                        <div>
                          {{
                            decimalToTime((index * props.periodDuration) / 60)
                          }}
                        </div>
                        <div class="-my-2.5">-</div>
                        <div>
                          {{
                            decimalToTime(
                              ((index + 1) * props.periodDuration) / 60,
                            )
                          }}
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pair in item.pair" :key="randomID">
                    <td class="px-2 whitespace-nowrap">{{ pair.name }}</td>
                    <td
                      v-for="period in pair.period"
                      :key="randomID"
                      class="min-w-20"
                      :class="period.class"
                    >
                      <div class="flex justify-center px-2">
                        {{ period.name }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <p>{{ new Date().toDateString() }}</p>
            <p class="text-neutral-500">
              Tool provided by ArtyomInc (arduc.ch)
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/ui/button";
import exportPDF from "@/utils/export-pdf";
import { toPng } from "html-to-image";

import type { GuardPerDay } from "~/interfaces";

import { decimalToTime, randomID } from "~/lib/utils";

const props = defineProps<{
  day: GuardPerDay[];
  periodDuration: number;
  periodCount: number;
  officer: string;
  commander: string;
}>();

const exportingState = ref(false);

function exportToPDF() {
  exportingState.value = true;
  const dataUrls: string[] = [];
  const promises: Promise<void>[] = [];

  for (let index = 0; index < props.day.length; index++) {
    const element = document.getElementById("table" + index);
    if (element) {
      const promise = toPng(element)
        .then(function (dataUrl) {
          dataUrls.push(dataUrl);
        })
        .catch((err) => {
          console.error("Error generating PNG:", err);
        });
      promises.push(promise);
    }
  }
  Promise.all(promises)
    .then(() => {
      exportPDF(dataUrls);
    })
    .catch((err) => {
      console.error("Error generating all images:", err);
    })
    .finally(() => {
      setTimeout(() => {
        exportingState.value = false;
      }, 500);
    });
  if (promises.length === 0) {
    exportingState.value = false;
    return;
  }
}
</script>

<style scoped>
td {
  @apply border;
}
</style>
