<template>
  <nav class="flex h-full items-center justify-between">
    <div class="p-2 h-full">
      <NuxtImg
        class="h-full blur-none"
        src="/favicon.svg"
        alt="ArtyomInc logo"
      />
    </div>
    <div class="flex items-center gap-2">
      <SwitchTheme />
      <Link
        variant="outline"
        size="icon"
        href="https://github.com/ArtyomInc"
        target="_blank"
      >
        <Icon name="mdi:github" />
      </Link>
      <Dialog>
        <DialogTrigger as-child>
          <Button size="icon" @click="isOpen = !isOpen">
            <Icon name="lucide:menu" size="20" />
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <div class="flex flex-col gap-3 mt-5">
            <template v-for="item in props.links" :key="item.name">
              <Link variant="outline" :href="item.path">
                {{ item.name }}
              </Link>
            </template>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog";
import { Link } from "@/ui/link";

import SwitchTheme from "./Theme/SwitchTheme.vue";

const props = defineProps<{
  links: {
    name: string;
    path: string;
  }[];
}>();

const isOpen = ref(false);
</script>
