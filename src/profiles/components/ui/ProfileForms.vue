<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
defineProps({
  profile: Object
});
</script>

<template>
  <form class="profile-form card">
    <h2>{{ t('profile.personal_info.title') }}</h2>

    <div class="form-group">
      <label for="fullName">{{ t('profile.personal_info.fullName') }}</label>
      <input type="text" id="fullName" v-model="profile.fullName">
    </div>

    <div class="form-group">
      <label for="email">{{ t('profile.personal_info.email') }}</label>
      <input type="email" id="email" v-model="profile.email">
    </div>

    <div class="form-group">
      <label for="phone">{{ t('profile.personal_info.phone') }}</label>
      <input type="tel" id="phone" v-model="profile.phone">
    </div>

    <div class="form-group">
      <label for="address">{{ t('profile.personal_info.address') }}</label>
      <input type="text" id="address" v-model="profile.address">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="city">{{ t('profile.personal_info.city') }}</label>
        <input type="text" id="city" v-model="profile.city">
      </div>
      <div class="form-group">
        <label for="country">{{ t('profile.personal_info.country') }}</label>
        <input type="text" id="country" v-model="profile.country">
      </div>
    </div>

    <button type="submit" class="btn-save">{{ t('profile.personal_info.save_button') }}</button>
  </form>
</template>

<style scoped>
.card {
  background-color: #FDFCF8;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border: 1px solid #EFE1C3;
}
.profile-form {
  flex: 2;
}
h2 {
  font-family: 'Amaranth', sans-serif;
  font-size: 1.5rem;
  color: #2C1810;
  margin-top: 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #EFE1C3;
  padding-bottom: 1rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  font-family: 'Amaranth', sans-serif;
  font-size: 0.9rem;
  font-weight: bold;
  color: #5c4b44;
  margin-bottom: 0.5rem;
}
.form-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  font-family: 'Amaranth', sans-serif;
  font-size: 1rem;
  border: 1px solid #EFE1C3;
  border-radius: 8px;
  box-sizing: border-box;
}
.form-row {
  display: flex;
  gap: 1.5rem;
}
.form-row .form-group {
  flex: 1;
}
.btn-save {
  font-family: 'Amaranth', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  border: 2px solid #2C1810;
  background-color: #CDAC77;
  color: #2C1810;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-save:hover {
  background-color: #be9d6e;
}
</style>