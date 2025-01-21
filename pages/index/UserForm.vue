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
      <Input
        v-model="userField.periodDuration"
        placeholder="120"
        type="number"
      />
    </div>
    <div>
      <label>Officier de la garde</label>
      <Input v-model="userField.officer" placeholder="of Nathan" type="text" />
    </div>
    <div>
      <label>Commandant de la garde</label>
      <Input
        v-model="userField.commander"
        placeholder="sgt Cyril"
        type="text"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label>Paire de soldat</label>
      <template v-for="(pair, index) in userField.pair" :key="index">
        <div class="flex items-center gap-1">
          <Input
            v-model="userField.pair[index]"
            placeholder="Jean"
            type="text"
          />
          <Button
            v-if="index !== 0"
            size="icon"
            variant="destructive"
            @click="userField.pair.pop()"
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
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { reactive } from "vue";

import type { userForm } from "~/interfaces";

const userField = reactive<userForm>({
  commander: "sgt Cyril",
  officer: "of Nathan",
  pair: ["Jean & Pierre", "Michel & Nils"],
  periodDuration: 120,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: userForm): void;
}>();

watchEffect(() => {
  emit("update:modelValue", userField);
});
</script>
