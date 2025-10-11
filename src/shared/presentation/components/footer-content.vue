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

        {{ t('authoring-phrase.intro') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.grid {
  background-color: #cdac77 !important;
  color: #ffffff !important;
  border-top: 2px solid #cdac77;
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
