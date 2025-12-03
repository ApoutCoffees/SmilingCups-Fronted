<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['submit-tutorial']);

const form = ref({
  title: '',
  description: '',
  videoUrl: '',
  category: 'brewing' // brewing, harvest, tasting
});

const submitForm = () => {
  if (!form.value.title || !form.value.description) {
    alert('Please fill in all required fields.');
    return;
  }

  console.log("Submitting tutorial:", form.value);
  // Aquí emitimos el evento al padre o llamamos a la API
  emit('submit-tutorial', { ...form.value });

  // Reset
  alert('Tutorial submitted successfully!');
  form.value = { title: '', description: '', videoUrl: '', category: 'brewing' };
};
</script>

<template>
  <div class="tutorial-form-container card">
    <h2><i class="pi pi-video"></i> {{ t('tutorial.create_title') || 'Create New Tutorial' }}</h2>
    <p class="subtitle">Share your coffee knowledge with the community.</p>

    <form @submit.prevent="submitForm">

      <div class="form-group">
        <label>Tutorial Title *</label>
        <input
            type="text"
            v-model="form.title"
            placeholder="e.g., How to brew the perfect V60"
            class="sc-input"
        >
      </div>

      <div class="form-group">
        <label>Category</label>
        <div class="select-wrapper">
          <select v-model="form.category" class="sc-input">
            <option value="brewing">Brewing Methods</option>
            <option value="harvest">Harvesting Process</option>
            <option value="tasting">Tasting & Cupping</option>
            <option value="maintenance">Equipment Maintenance</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Video URL (YouTube/Vimeo)</label>
        <div class="input-icon-wrapper">
          <i class="pi pi-link"></i>
          <input
              type="url"
              v-model="form.videoUrl"
              placeholder="https://..."
              class="sc-input has-icon"
          >
        </div>
      </div>

      <div class="form-group">
        <label>Description *</label>
        <textarea
            v-model="form.description"
            rows="4"
            placeholder="Explain what viewers will learn..."
            class="sc-input"
        ></textarea>
      </div>

      <button type="submit" class="btn-submit">
        <i class="pi pi-upload"></i> Publish Tutorial
      </button>

    </form>
  </div>
</template>

<style scoped>
.card {
  background: #FDFCF8;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #EFE1C3;
  font-family: 'Amaranth', sans-serif;
  max-width: 600px;
  margin: 0 auto; /* Centrado si se usa solo */
}

h2 { color: #2C1810; margin-top: 0; display: flex; align-items: center; gap: 10px; }
.subtitle { color: #5c4b44; margin-bottom: 2rem; font-size: 0.95rem; }

.form-group { margin-bottom: 1.5rem; }
.form-group label {
  display: block;
  font-weight: bold;
  color: #2C1810;
  margin-bottom: 0.5rem;
}

/* Inputs Estilizados */
.sc-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #EFE1C3;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  color: #5c4b44;
  background-color: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.sc-input:focus {
  outline: none;
  border-color: #CDAC77;
}

.sc-input::placeholder { color: #ccc; }

/* Input con Icono */
.input-icon-wrapper { position: relative; }
.input-icon-wrapper i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #A08056;
}
.sc-input.has-icon { padding-left: 35px; }

/* Botón Submit */
.btn-submit {
  width: 100%;
  background-color: #CDAC77;
  color: #2C1810;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  font-family: 'Amaranth', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #bfa06f;
}
</style>