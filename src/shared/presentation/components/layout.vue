<script setup xmlns="http://www.w3.org/1999/html">
import LanguageSwitcher from "./language-switcher.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import FooterContent from "./footer-content.vue";
const { t } = useI18n();

const drawer = ref(false);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
const items = [
  { label: "option.about", to: "/home" },
  { label: "option.catalog", to: "/about" },
  { label: "option.goals", to: "/publishing/categories" },
  { label: "option.contact", to: "/publishing/tutorials" },
];
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />
  <div class="header">
    <pv-toolbar class="bg-primary">

      <!-- Lado izquierdo -->
      <template #start>
        <img
            src="../../../assets/Icon.png"
            alt="El logo de mi increíble compañía"
            width="60"
            height="60"
        />

        <p style="text-indent: 10px;">SMILING CUPS</p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <div class="flex justify-content-end mr-3">
          <pv-button
              v-for="item in items"
              :key="item.label"
              as-child
              v-slot="slotProps"
          >
            <router-link
                :to="item.to"
                :class="slotProps['class']"
            >
              {{ t(item.label) }}
            </router-link>
          </pv-button>
        </div>
      </template>
      <template #center>

      </template>
      <!-- Lado derecho -->
      <template #end>
        <language-switcher />
      </template>

    </pv-toolbar>
  </div>

  <div class="main-content">
    <router-view />
  </div>

  <div class="footer">
    <footer-content />
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
  background-color: #cdac77 !important;
  color: #ffffff !important;

}

.header :deep(h3) {
  color: #1e1e1e;
  margin-left: 10px;
  display: inline-flex;
  align-items: center;

}

.header :deep(.p-button) {
  color: #1e1e1e !important;
  background-color: transparent !important;
  border: none !important;
  font-size: 1.5rem;
}

.header :deep(.p-button:hover) {
  background-color: #2c1810 !important;
  color: #ffffff !important;
}

.header :deep(.p-button.p-button-text .pi) {
  color: #ffffff !important;

}

/* Added: toolbar layout control (left + right) */
.toolbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* Added: left side for logo + text + buttons */
.left-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Added: right side for language switcher */
.right-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* Added: brand text styling */
.brand-text {
  color: #1e1e1e !important;
  font-weight: bold;

  text-indent: 10px;
}

.main-content {
  margin-top: 60px;
  width: 100%; /* <-- La clave es darle el 100% de ancho */
  display: flex;
  justify-content: center;
}


.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #cdac77;
  color: #ffffff;
}


</style>
