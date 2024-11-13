<template>
    <section class="text-white mt-20" id="contact">
        <h2 class="text-4xl font-bold text-white text-left mb-4 px-4 xl:pl-16">Let's Connect</h2>
        <div class="grid md:grid-cols-2 gap-4 relative px-4 xl:px-16 mt-8" data-aos="zoom-in-up">
            <div>
                <p class="text-[#adb7be]">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                <div class="col-lg-4 col-md-4 mb-lg-0 mt-5">
                    <!-- Contact Information -->

                    <!-- Email -->
                    <div class="flex mb-5 items-center">
                        <div class="p-2"
                            style="background: #111a3e; width: 50px;height: 46px; display: flex;justify-content: center; border-radius: 50%;
                            overflow: hidden;border: 1px solid#111a3e;backdrop-filter: blur(9px);-webkit-backdrop-filter: blur(9px);">
                            <a href="mailto:denztegal8@gmail.com">
                                <img src="https://img.icons8.com/metro/50/ffffff/new-post.png" alt="new-post"
                                    class="w-6">
                            </a>
                        </div>
                        <div class="ml-5 text-white">
                            <p>denztegal8@gmail.com</p>
                        </div>
                    </div>
                    <!-- whatsapp -->
                    <div class="flex mb-5 items-center">
                        <div class="p-2"
                            style="background: #111a3e; width: 50px; height: 46px; display: flex; justify-content: center; border-radius: 50%; overflow: hidden; border: 1px solid #111a3e; backdrop-filter: blur(9px); -webkit-backdrop-filter: blur(9px);">
                            <a href="https://wa.me/6285742572129" target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png" alt="whatsapp"
                                    class="w-6">
                            </a>
                        </div>
                        <div class="ml-5 text-white">
                            <h4>WhatsApp</h4>
                        </div>
                    </div>
                    <!-- Instagram -->
                    <div class="flex mb-5 items-center">
                        <div class="p-2"
                            style="background: #111a3e; width: 50px; height: 46px; display: flex; justify-content: center; border-radius: 50%; overflow: hidden; border: 1px solid #111a3e; backdrop-filter: blur(9px); -webkit-backdrop-filter: blur(9px);">
                            <a href="https://www.instagram.com/danishfa_01" target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="instagram"
                                    class="w-6">
                            </a>
                        </div>
                        <div class="ml-5 text-white">
                            <h4>Instagram</h4>
                        </div>
                    </div>

                </div>
            </div>
            <!-- Form Section -->
            <div
                style="background: #111a3e; width: 100%; height: 100%; border-radius: 20px; overflow: hidden; border: 1px solid #111a3e; backdrop-filter: blur(9px); -webkit-backdrop-filter: blur(9px);">
                <form class="flex flex-col p-2" @submit.prevent="handleSubmit" data-aos="zoom-in-up">
                    <div class="mb-6">
                        <label for="email" class="text-white block mb-2 text-sm font-medium">Email</label>
                        <input type="email" v-model="contact.email"
                            class="bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="email@gmail.com" name="email">
                    </div>
                    <div class="mb-6">
                        <label for="nama" class="text-white block mb-2 text-sm font-medium">Nama</label>
                        <input type="text" v-model="contact.nama"
                            class="bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Nama" name="nama">
                    </div>
                    <div class="mb-6">
                        <label for="message" class="text-white block mb-2 text-sm font-medium">Message</label>
                        <textarea v-model="contact.message"
                            class="bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Let's talk about ... " name="message"></textarea>
                    </div>
                    <button
                        class="w-full px-6 md:px-7 py-3 rounded-full text-white bg-primary border-2 border-transparent">Send
                        Message</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { addContact } from './indexedDb';

export default {
    setup() {
        const contact = ref({
            email: '',
            nama: '',
            message: '',
        });

        // Fungsi untuk meminta izin notifikasi
        const requestNotificationPermission = async () => {
            if (Notification.permission === 'default') {
                await Notification.requestPermission();
            }
        };

        // Fungsi untuk menampilkan notifikasi
        const showNotification = (title, body) => {
            if (Notification.permission === 'granted') {
                new Notification(title, {
                    body,
                    icon: './public/pwa-192x192.png'
                });
            } else {
                console.warn('Notifikasi tidak diizinkan oleh pengguna.');
            }
        };

        // Fungsi submit form
        const handleSubmit = async () => {
            const cleanContact = { ...contact.value };

            if (cleanContact.email && cleanContact.nama && cleanContact.message) {
                await addContact(cleanContact);
                alert('Pesan telah disimpan!');

                // Tampilkan notifikasi setelah data berhasil disimpan
                showNotification('Pesan Tersimpan', 'Data kontak berhasil disimpan di database.');

                // Reset form setelah berhasil disimpan
                contact.value = { email: '', nama: '', message: '' };
            } else {
                alert('Harap lengkapi semua bidang.');
            }
        };

        // Minta izin notifikasi saat komponen dimuat
        onMounted(() => {
            requestNotificationPermission();
        });

        return { contact, handleSubmit };
    },
};
</script>
