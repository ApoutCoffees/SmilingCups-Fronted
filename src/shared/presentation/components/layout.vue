<script setup>
import LanguageSwitcher from "./language-switcher.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import FooterContent from "./footer-content.vue";
const { t } = useI18n();

const items = [
  { label: "option.about", to: "/home" },
  { label: "option.catalog", to: "/catalog" },
  { label: "option.goals", to: "/goals" },
  { label: "option.contact", to: "/contact" },
];
</script>

<template>
  <div class="page-container">
    <pv-toast />
    <pv-confirm-dialog />

    <header class="header">
      <pv-toolbar class="bg-primary">
        <template #start>
          <img
              src="../../../assets/Icon.png"
              alt="El logo de mi increíble compañía"
              width="60"
              height="60"
          />
          <p class="brand-text">SMILING CUPS</p>
          <div class="navigation-links">
            <pv-button
                v-for="item in items"
                :key="item.label"
                as-child
                v-slot="slotProps"
            >
              <router-link :to="item.to" :class="slotProps['class']">
                {{ t(item.label) }}
              </router-link>
            </pv-button>
          </div>
        </template>

        <template #end>
          <language-switcher />
        </template>
      </pv-toolbar>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <footer-content />
    </footer>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  width: 100%;
}

.main-content {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
}

.footer {

  width: 100%;
  background-color: #2C1810;
  color: #ffffff;
}

.header :deep(.p-toolbar) {
  background-color: #cdac77 !important;
  color: #ffffff !important;
}

.brand-text {
  font-family: 'Amaranth', sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  color: #2C1810;
  margin: 0 2rem 0 10px;
}

.navigation-links {
  display: flex;
  gap: 1rem;
}

.header :deep(.p-button) {
  color: #1e1e1e !important;
  background-color: transparent !important;
  border: none !important;
  font-size: 1.2rem;
  font-family: 'Amaranth', sans-serif;
}

.header :deep(.p-button:hover) {
  background-color: #2c1810 !important;
  color: #ffffff !important;
  border-radius: 8px;
}
</style>