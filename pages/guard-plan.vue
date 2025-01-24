<template>
  <Card class="mt-[5vh] mx-1 md:mx-5">
    <CardHeader>
      <CardTitle>Créer les plans</CardTitle>
      <CardDescription>Renseignez les champs pour ensuite générer les plan par jours</CardDescription>
    </CardHeader>
    <CardContent>
      <UserForm v-model="userField" />
      <GuardPlan v-if="userField" v-model="userField" />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'

import type { userForm } from '~/interfaces'

import GuardPlan from './components/index/GuardPlan.vue'
import UserForm from './components/index/UserForm.vue'

const userField = ref<userForm>()
</script>
