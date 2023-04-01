<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/inertia-vue3';
defineProps(['incubators']);
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <h1>Current production</h1>
                        <el-timeline>
                            <el-timeline-item timestamp="2018-4-12T10:00:00" placement="top" type="success">
                                <el-card>
                                    <h4>Soaking</h4>
                                    <p>Budi C. [2018/4/12 20:46]</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018-4-3" placement="top" type="primary">
                                <el-card>
                                    <h4>Cleaning</h4>
                                    <p>Roland K. [2018/4/3 20:46]</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/f2 " placement="top">
                                <el-card>
                                    <h4>Cooking I</h4>
                                    <p>Roland K. [2018/4/2 20:46]</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>

                        <ol>
                            <li v-for="(incubator, index) in incubators">
                                <a :href="route('incubator', incubator.id)">
                                    {{incubator.name}}
                                </a>
                            </li>
                        </ol>


                        <el-divider/>
                        <h3>Last production</h3>
                        <el-timeline>
                            <el-timeline-item timestamp="2018-4-12T10:00:00" placement="top" type="success">
                                <el-card>
                                    <h4>Soaking</h4>
                                    <p>Budi C. [2018/4/12 20:46]</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018-4-3" placement="top" type="primary">
                                <el-card>
                                    <h4>Cleaning</h4>
                                    <p>Roland K. [2018/4/3 20:46]</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2018/4/f2 " placement="top">
                                <el-card>
                                    <h4>Cooking I</h4>
                                    <p>Roland K. [2018/4/2 20:46]</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>

                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
