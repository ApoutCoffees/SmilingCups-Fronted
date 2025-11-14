<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <footer class="compact-footer">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2">

      <div class="footer-layout">
        <!-- START -->
        <div class="footer-start space-y-4">
          <div class="flex items-center gap-2">
            <img
                src="@/assets/Icon.png"
                alt="Smiling Cups Logo"
                width="40"
                height="40"
            />
            <p>SmilingCups</p>
          </div>
          <p>{{ t('footer.brand.description') }}</p>
        </div>

        <!-- CENTER -->
        <div class="footer-center grid grid-cols-2 gap-4">
          <!-- Quick Links -->
          <div>
            <ul class="space-y-0.5">
              <li><a href="#">{{ t('footer.quick-links.about') }}</a></li>
              <li><a href="#">{{ t('footer.quick-links.producers') }}</a></li>
              <li><a href="#">{{ t('footer.quick-links.subscription-plans') }}</a></li>
              <li><a href="#">{{ t('footer.quick-links.blog') }}</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <ul class="space-y-0.5">
              <li><a href="#">{{ t('footer.support.help-center') }}</a></li>
              <li><a href="#">{{ t('footer.support.shipping-info') }}</a></li>
              <li><a href="#">{{ t('footer.support.faq') }}</a></li>

            </ul>
          </div>
        </div>

        <!-- END -->
        <div class="footer-end">
          <h4>{{ t('footer.contact.title') }}</h4>
          <ul class="space-y-1">
            <li class="flex items-center gap-1">
              <Mail :size="14" /><span>{{ t('footer.contact.email') }}</span>
            </li>
            <li class="flex items-center gap-1">
              <Phone :size="14" /><span>{{ t('footer.contact.phone') }}</span>
            </li>
            <li class="flex items-start gap-1">
              <MapPin :size="14" class="mt-0.5 flex-shrink-0" />
              <span>{{ t('footer.contact.address') }}</span>
            </li>
          </ul>

          <div class="flex gap-2 mt-2">
            <a href="#"><Facebook :size="16" /></a>
            <a href="#"><Instagram :size="16" /></a>
            <a href="#"><Twitter :size="16" /></a>
          </div>
        </div>
      </div>

      <div class="mt-3 pt-1 text-center">

        <p>{{ t('authoring-phrase.intro', { brand: 'SmilingCups' }) }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>

footer {
  background-color: #2C1810;
  color: #ffffff;
}
.compact-footer {
  font-size: 1rem;
  line-height: 1.5;
}

.compact-footer h4 {
  font-size: 1.1rem;
  font-weight: 700;

  color: #CDAC77;
}

.compact-footer p,
.compact-footer a,
.compact-footer span,
.compact-footer li {
  font-size: 1.4rem;
  color: #DDAA88;
}

.footer-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}
.footer-start {
  flex: 1 1 250px;
}

.footer-center {
  flex: 2 1 350px;
}
.footer-center ul {
  list-style: none;
}

.footer-end {
  flex: 1 1 250px;
}
a {
  transition: color 0.3s ease;
}

a:hover {
  color: #CDAC77;
}
.footer-start .flex p {
  font-size: 1.4rem;
  font-weight: 700;
  color: #CDAC77;
}
</style>
