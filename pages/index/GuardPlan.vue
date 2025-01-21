<template>
  <div class="w-full">
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
          <div
            v-for="(day, tIndex) in guardPlan.day"
            :key="day.date"
            class="w-full overflow-x-auto"
          >
            <p>
              {{ day.date }}
            </p>
            <table :id="'table' + tIndex" class="w-full">
              <thead>
                <tr>
                  <td class="px-2">Paire de soldat</td>
                  <td
                    v-for="(n, index) in periodCount"
                    :key="index"
                    class="w-20"
                  >
                    <div class="flex flex-col justify-center items-center">
                      <div>
                        {{ decimalToTime((index * props.periodDuration) / 60) }}
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
                <tr v-for="pair in day.pair" :key="randomID">
                  <td class="px-2 whitespace-nowrap">{{ pair.name }}</td>
                  <td
                    v-for="period in pair.period"
                    :key="randomID"
                    class="min-w-20"
                    :class="{ 'bg-red-100': period === 'Garde' }"
                  >
                    <div class="flex justify-center px-2">
                      {{ period }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <DialogFooter v-if="guardPlan">
          <ExportPdf :day="guardPlan.day" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";

import type { GuardPerDay, userForm } from "~/interfaces";

import {
  calculateDaysBetweenDates,
  decimalToTime,
  randomID,
} from "~/lib/utils";

import ExportPdf from "./GuardPlan/ExportPdf.vue";

const props = defineProps<userForm>();

const periodCount = ref<number>(0);

const isOpen = ref(false);

const guardPlan = ref<
  | {
      day: GuardPerDay[];
    }
  | undefined
>(undefined);

function generatePlan() {
  if (props.begin === undefined || props.end === undefined) {
    throw new Error();
  }

  const beginDateTime = new Date(props.begin!);
  const endDateTime = new Date(props.end!);

  const numberOfDay = calculateDaysBetweenDates(beginDateTime, endDateTime);

  periodCount.value = 24 / (props.periodDuration / 60);

  guardPlan.value = {
    day: [],
  };

  for (let x = 0; x < numberOfDay; x++) {
    const day: GuardPerDay = {
      date: "Jour +" + x,
      pair: [],
    };
    let lastPeriodIndex = 0;

    for (let y = 0; y < props.pair.length; y++) {
      const periods: string[] = [];

      for (let z = 0; z < periodCount.value; z++) {
        if (
          x == 0 &&
          (z * 24) / periodCount.value + 2 < beginDateTime.getHours()
        ) {
          periods.push("");
        } else if (
          1 + x == numberOfDay &&
          (z * 24) / periodCount.value > endDateTime.getHours()
        ) {
          periods.push("");
        } else if ((y + z) % props.pair.length === 0) {
          periods.push("Garde");
        } else {
          periods.push("");
        }
        lastPeriodIndex = z;
      }

      day.pair.push({
        name: props.pair[y],
        period: periods,
      });
    }

    guardPlan.value.day.push(day);
  }
  isOpen.value = true;
}
</script>

<style scoped>
td {
  @apply border;
}
</style>
