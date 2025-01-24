<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col gap-3 justify-center max-w-screen-lg mt-[10vh]">
      <p>Bienvenue sur l'outil de <strong>génération de plans de garde</strong> pour les militaires suisses.</p>
      <Alert class="flex flex-col gap-2">
        <Icon name="lucide:file-lock-2" size="20" />
        <AlertTitle>Informations de sécurité !</AlertTitle>
        <AlertDescription>
          Aucunes informations saisies ne sont collectées ! Elles restent localement sur votre navigateur jusqu'à la fin
          de la session. Seul un compteur de visites est actif et envoie des données anonymes.
        </AlertDescription>
      </Alert>
      <p>
        Cet outil vous permet de planifier des binômes de soldats par tranche horaire, avec plusieurs types
        d'affectation tels que Externo, Zuko, garde, etc. Très flexible, il offre la possibilité d'ajouter des tranches
        horaires et des binômes selon vos besoins.
      </p>
      <a
        class="flex items-center gap-2 hover:bg-primary/90 bg-primary px-2 justify-center text-primary-foreground rounded-lg py-2"
        href="/guard-plan"
        >Utiliser le générateur
        <Icon name="lucide:bar-chart-horizontal-big" size="20" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert'
import { Button } from '@/ui/button'
</script>
