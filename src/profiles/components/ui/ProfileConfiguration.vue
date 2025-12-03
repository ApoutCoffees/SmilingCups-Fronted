<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Estado local para la configuración
const config = ref({
  language: 'en',
  emailNotifications: true,
  marketingEmails: false,
  publicProfile: true
});

const handleSave = () => {
  // Lógica para guardar configuración en el backend
  alert('Configuration saved successfully!');
};

const handleDeleteAccount = () => {
  if(confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    alert('Account deletion process started.');
  }
};
</script>

<template>
  <div class="config-card card">
    <div class="header">
      <h2><i class="pi pi-cog"></i> {{ t('configuration.title') || 'Settings' }}</h2>
      <p>Manage your app preferences and privacy.</p>
    </div>

    <div class="settings-list">

      <div class="setting-item">
        <div class="info">
          <h4>Language / Idioma</h4>
          <p>Select your preferred language.</p>
        </div>
        <select v-model="config.language" class="sc-select">
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>

      <div class="setting-item">
        <div class="info">
          <h4>Order Notifications</h4>
          <p>Receive email updates about your orders.</p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="config.emailNotifications">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="setting-item">
        <div class="info">
          <h4>Public Profile</h4>
          <p>Allow others to see your coffee badges.</p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="config.publicProfile">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="action-row">
        <button @click="handleSave" class="btn-save">Save Changes</button>
      </div>

      <div class="danger-zone">
        <h4>Danger Zone</h4>
        <div class="danger-action">
          <p>Permanently delete your account and all data.</p>
          <button @click="handleDeleteAccount" class="btn-danger">Delete Account</button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.card {
  background: #FDFCF8;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #EFE1C3;
  font-family: 'Amaranth', sans-serif;
  max-width: 800px;
}

.header h2 { color: #2C1810; margin-top: 0; display: flex; align-items: center; gap: 10px; }
.header p { color: #5c4b44; margin-bottom: 1.5rem; }

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
}

.info h4 { margin: 0 0 0.5rem; color: #2C1810; font-size: 1.1rem; }
.info p { margin: 0; color: #999; font-size: 0.9rem; }

/* Select Personalizado */
.sc-select {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #EFE1C3;
  font-family: 'Amaranth', sans-serif;
  color: #2C1810;
  background-color: white;
  cursor: pointer;
}

/* Switch Toggle (CSS Puro) */
.switch { position: relative; display: inline-block; width: 50px; height: 26px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
.slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background-color: white; transition: .4s; }
input:checked + .slider { background-color: #CDAC77; }
input:focus + .slider { box-shadow: 0 0 1px #CDAC77; }
input:checked + .slider:before { transform: translateX(24px); }
.slider.round { border-radius: 34px; }
.slider.round:before { border-radius: 50%; }

/* Botones */
.action-row { margin: 2rem 0; text-align: right; }
.btn-save {
  background-color: #2C1810;
  color: #CDAC77;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-family: inherit;
}

/* Danger Zone */
.danger-zone { margin-top: 3rem; border: 1px solid #f5c6cb; border-radius: 8px; padding: 1.5rem; background-color: #fff5f5; }
.danger-zone h4 { color: #c62828; margin-top: 0; }
.danger-action { display: flex; justify-content: space-between; align-items: center; }
.btn-danger {
  background-color: #c62828;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
.btn-danger:hover { background-color: #b71c1c; }
</style>