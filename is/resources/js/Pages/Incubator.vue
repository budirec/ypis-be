<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head} from '@inertiajs/inertia-vue3';

defineProps(['incubator', 'sensors']);
</script>

<template>
    <Head title="Incubator"/>

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Incubator {{ incubator.name }}</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <el-card v-for="sensor in sensors">
                        <template #header>
                            <div class="card-header">
                                <span> {{ sensor.name }}</span>
                                {{ sensor.updated_at }}
                            </div>
                        </template>
                        <div v-for="(value, index) in sensor.current_reading">{{ index }}: {{ value }}</div>
                    </el-card>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
