<template>
  <div>
    <Button>
      Exporter
      <Icon name="lucide:download" size="20" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/ui/button";
import jsPDF from "jspdf";

import type { GuardPerDay } from "~/interfaces";

const props = defineProps<{ day: GuardPerDay[] }>();

function exportToPDF() {
  const doc = new jsPDF({
    orientation: "landscape",
  });
}
</script>
