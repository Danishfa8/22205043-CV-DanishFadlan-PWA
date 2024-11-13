<template>
    <section class="text-white mt-20" id="certifications">
        <div class="px-4 xl:pl-16">
            <div class="mb-4 md:flex md:justify-between xl:pr-16">
                <h2 class="text-4xl font-bold">My Certifications</h2>
            </div>
            <ul class="px-4 sm:py-16 xl:pr-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"
                data-aos="fade-right">
                <div v-for="certif in filteredCertifications" :key="certif.id">
                    <div class="h-52 md:h-[24rem] rounded-t-xl relative group"
                        :style="{ backgroundImage: `url(${certif.image})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }">
                        <div
                            class="overlay flex items-center justify-center absolute inset-0 bg-[#181818] bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-500 hidden group-hover:flex">
                            <a class="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
                                href="#" @click.prevent="showCertificate(certif.image)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor"
                                    class="h-10 w-10 text-[#ADB7BE] absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </ul>
        </div>

        <!-- Modal untuk menampilkan gambar sertifikat -->
        <div v-if="showModal"
            class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-auto p-4">
            <div class="relative max-w-full max-h-screen">
                <button @click="closeModal"
                    class="absolute top-0 right-0 m-4 text-orange-500 text-3xl font-bold hover:text-orange-700">&times;</button>

                <img :src="selectedImage"
                    class="rounded-lg object-contain max-w-[90vw] max-h-[90vh] p-4 border border-gray-300" />

            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import certif1 from '@/assets/oracle.jpg';
import certif2 from '@/assets/sql.jpg';
import certif3 from '@/assets/kotlin.jpg';

const Certifications = ref([
    { id: 1, category: 'professional development', image: certif1, title: 'Certification 1', description: 'Certified in advanced web development techniques.', skills: ['Vue.js', 'JavaScript', 'HTML'], viewURL: '' },
    { id: 2, category: 'professional development', image: certif2, title: 'Certification 2', description: 'Completed a course in responsive design and UX/UI fundamentals.', skills: ['CSS', 'UX/UI', 'Responsive Design'], viewURL: '' },
    { id: 3, category: 'professional development', image: certif3, title: 'Certification 3', description: 'Specialization in backend development using Node.js and Express.', skills: ['Node.js', 'Express', 'APIs'], viewURL: '' }
]);

const selectedCategory = ref('all');
const filteredCertifications = computed(() =>
    selectedCategory.value === 'all'
        ? Certifications.value
        : Certifications.value.filter(certif => certif.category.toLowerCase() === selectedCategory.value.toLowerCase())
);

// Modal state and functions
const showModal = ref(false);
const selectedImage = ref(null);

function showCertificate(image) {
    selectedImage.value = image;
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
    selectedImage.value = null;
}
</script>
