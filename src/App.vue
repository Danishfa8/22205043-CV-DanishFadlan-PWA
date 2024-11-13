<template>
  <div class="bg-[#111827] min-h-screen">
    <!-- Wrap components in Suspense to handle loading -->
    <Suspense>
      <template #default>
        <!-- Wrap all Components inside a single root element -->
        <div>
          <NavBar />
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <ExperienceAndSkills />
          <CertifSection />
          <ContactSection />          
          <Footer />
          <BackToTop />
        </div>
      </template>
      <template #fallback>
        <div class="flex justify-center items-center min-h-screen">
          <loadingSpinner />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted } from 'vue';
import { requestForToken, onMessageListener } from './firebase'; // Import Firebase helper functions

// Import Components Asynchronously
const NavBar = defineAsyncComponent(() => import('@/components/NavBar.vue'));
const HeroSection = defineAsyncComponent(() => import('@/components/HeroSection.vue'));
const ServicesSection = defineAsyncComponent(() => import('@/components/ServicesSection.vue'));
const AboutSection = defineAsyncComponent(() => import('@/components/AboutSection.vue'));
const CertifSection = defineAsyncComponent(() => import('@/components/CertifSection.vue'));
const ExperienceAndSkills = defineAsyncComponent(() => import('@/components/ExperienceAndSkills.vue'));
const ContactSection = defineAsyncComponent(() => import('@/components/ContactSection.vue'));
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'));
const BackToTop = defineAsyncComponent(() => import('@/components/BackToTop.vue'));
import loadingSpinner from './components/loadingSpinner.vue';

onMounted(() => {
  // Request notification permission automatically when the app loads
  requestNotificationPermission();

  // Listen for foreground notifications
  onMessageListener().then((payload) => {
    console.log('Received foreground message: ', payload);
    // You could display a notification or update your app state here
  });
});

function requestNotificationPermission() {
  requestForToken()
    .then((token) => {
      console.log('Notification permission granted. Token:', token);
      // You can send the token to the server or save it in local storage
    })
    .catch((err) => {
      console.error('Unable to get permission to notify.', err);
    });
}
</script>

<style>
* {
  scrollbar-width: thin;
  scrollbar-color: #111827 #f1f1f1;
}
</style>
