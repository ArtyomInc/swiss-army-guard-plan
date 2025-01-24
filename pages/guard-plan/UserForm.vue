<template>
  <div class="flex flex-col gap-2.5">
    <div class="flex flex-col gap-1">
      <label for="begin">Date et heure de commencement</label>
      <Input
        id="begin"
        v-model="userField.begin"
        type="datetime-local"
        @blur="touchedField[0] = true"
      />
      <label v-if="touchedField[0] && !userField.begin" class="text-red-500"
        >Veuillez renseignez une date de début</label
      >
    </div>
    <div class="flex flex-col gap-1">
      <label for="end">Date et heure de fin</label>
      <Input
        id="end"
        v-model="userField.end"
        type="datetime-local"
        @blur="touchedField[1] = true"
      />
      <label v-if="touchedField[1] && !userField.end" class="text-red-500"
        >Veuillez renseignez une date de fin</label
      >
    </div>
    <div class="flex flex-col gap-1">
      <label for="duration">Durée de la période de garde [minutes]</label>
      <Input
        id="duration"
        v-model="userField.periodDuration"
        placeholder="120"
        type="number"
        @blur="touchedField[2] = true"
      />
      <label
        v-if="
          touchedField[2] &&
          (userField.periodDuration < 10 || userField.periodDuration > 1440)
        "
        class="text-red-500"
        >Veuillez renseignez un durée entre 10 et 1440 minutes</label
      >
    </div>
    <div class="flex flex-col gap-1">
      <label for="officer">Officier de la garde</label>
      <Input
        id="officer"
        v-model="userField.officer"
        placeholder="Lt Nathan"
        type="text"
        @blur="touchedField[3] = true"
      />
      <label
        v-if="touchedField[3] && userField.officer.length < 2"
        class="text-red-500"
        >Veuillez renseignez un nom d'officier d'au minimum 2 caractères</label
      >
    </div>
    <div class="flex flex-col gap-1">
      <label for="commander">Commandant de la garde</label>
      <Input
        id="commander"
        v-model="userField.commander"
        placeholder="Sgt Cyril"
        type="text"
        @blur="touchedField[4] = true"
      />
      <label
        v-if="touchedField[4] && userField.commander.length < 2"
        class="text-red-500"
        >Veuillez renseignez un nom de commandant de garde d'au minimum 2
        caractères</label
      >
    </div>
    <div class="flex flex-col gap-1">
      <label for="period-title">Affectations des périodes</label>
      <MultiField
        id="period-title"
        v-model="userField.periodTitle"
        placeholder="Externo, Zuko, Réserve, etc."
        @blur="touchedField[4] = true"
      />
      <label
        v-if="
          touchedField[4] &&
          (userField.periodTitle.length < 1 ||
            userField.periodTitle.length > userField.pair.length)
        "
        class="text-red-500"
        >Veuillez saisir des affectations, en respectant le nombre maximum de
        soldats disponibles.</label
      >
    </div>
    <div class="flex flex-col gap-1">
      <label for="pair">Paire de soldat</label>
      <MultiField
        id="pair"
        v-model="userField.pair"
        placeholder="Sdt Michel & Sdt Nathan, App Anthony & Sdt Adrien, etc."
        @blur="touchedField[5] = true"
      />

      <label
        v-if="
          touchedField[5] &&
          (userField.pair.length < 1 ||
            userField.pair.length < userField.periodTitle.length)
        "
        class="text-red-500"
        >Veuillez saisir des soldats, en respectant le nombre minimum
        d'affectation qui doivent être tenues.</label
      >
    </div>
    <Button class="mt-4 w-full" @click="checkForm"
      >Générer
      <Icon name="lucide:iteration-ccw" size="20" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import MultiField from "@/components/MultiField.vue";
import { Input } from "@/ui/input";
import { reactive } from "vue";

import type { userForm } from "~/interfaces";

const userField = reactive<userForm>({
  commander: "",
  officer: "",
  pair: [],
  periodDuration: 120,
  periodTitle: ["Garde"],
});

const touchedField = reactive<boolean[]>(new Array(7).fill(false));

const emit = defineEmits<{
  (e: "update:modelValue", value: userForm): void;
}>();

function checkForm() {
  touchedField.forEach((_, index) => (touchedField[index] = true));
  if (!userField.begin || !userField.end) {
    return;
  }
  if (userField.periodDuration < 10 || userField.periodDuration > 1440) {
    return;
  }
  if (userField.officer.length < 2) {
    return;
  }
  if (userField.commander.length < 2) {
    return;
  }
  if (
    userField.periodTitle.length < 1 ||
    userField.periodTitle.length > userField.pair.length
  ) {
    return;
  }
  if (
    userField.pair.length < 1 ||
    userField.pair.length < userField.periodTitle.length
  ) {
    return;
  }
  emit("update:modelValue", userField);
}
</script>
