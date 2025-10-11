<script setup>

import LanguageSwitcher from "./language-switcher.vue";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import FooterContent from "./footer-content.vue";
const { t } = useI18n();

const drawer = ref(false);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
}
const items = [
  {label: 'option.home', to: '/home'},
  {label: 'option.about', to: '/about'},
  {label: 'option.categories', to: '/publishing/categories'},
  {label: 'option.tutorials', to: '/publishing/tutorials'}
];
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <div class="header">
    <pv-toolbar class="bg-primary">
      <template #start>
        <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer"/>
        <h3>ACME Learning Center</h3>
      </template>
      <template #center>

      </template>
      <template #end>
        <div class="flex-column mr-3">
          <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
            <router-link :to="item.to" :class="slotProps['class']">{{ t(item.label) }}</router-link>
          </pv-button>
        </div>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </div>
  <div class="main-content">
    <router-view/>
  </div>
  <div class="footer">
    <footer-content/>
  </div>


</template>

<style scoped>
.header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}


.header :deep(.p-toolbar) {
  background-color: #D32F2F !important;
  border-color: #B71C1C !important;
  color: #ffffff !important;
}


.header :deep(h3) {
  color: #ffffff;
  margin-left: 10px;
  display: inline-flex;
  align-items: center;
}


.header :deep(.p-button) {
  color: #ffffff !important;
  background-color: transparent !important;
  border: none !important;
}

.header :deep(.p-button:hover) {
  background-color: #B71C1C !important;
}


.header :deep(.p-button.p-button-text .pi) {
  color: #ffffff !important;
}

/* Contenido principal */
.main-content {
  margin-top: 60px;
}


.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #D32F2F;
  color: #ffffff;
}
</style>
