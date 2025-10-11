<script setup>
  import {useI18n} from "vue-i18n";

  const { t } = useI18n();
</script>

<template>
  <div class="grid bg-primary mt-4 p-2 align-content-start">
    <div class="col-12 ml-3 align-items-center justify-content-center">
      <p>Copyright &copy; 2025. ACME Studios</p>
    </div>
    <div  class="col-12 ml-3 mt-1 align-items-center justify-content-center">
      <p>
        {{ t('authoring-phrase.intro') }} <i class="pi pi-heart"/>
        {{ t('authoring-phrase.use') }} <a href="https://primevue.org/" target="_blank">PrimeVue</a>
        {{ t('authoring-phrase.author', {brand: 'ACME'}) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.grid {
  background-color: #D32F2F !important;
  color: #ffffff !important;
  border-top: 2px solid #B71C1C;
  text-align: center;
}

a {
  color: #fff176; /* amarillo suave para destacar el enlace */
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.pi-heart {
  color: #fff176;
}
</style>
