<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Assumptions</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="card text-center py-4">
                        <div class="card-header bg-transparent border-0">
                            <h5 class="mb-0">Open/Close All Logbooks</h5>
                        </div>
                        <div class="card-body d-flex flex-column align-items-center">
                            <div class="d-flex gap-4">
                                <button
                                    class="btn btn-success rounded-circle d-flex justify-content-center align-items-center"
                                    style="width:80px; height:80px; font-size:1.5rem;"
                                    @click="changeLogbookStatus('unlocked')"
                                    title="Open All"
                                >
                                    <i class="fas fa-book-open"></i>
                                </button>
                                <button
                                    class="btn btn-danger rounded-circle d-flex justify-content-center align-items-center"
                                    style="width:80px; height:80px; font-size:1.5rem;"
                                    @click="changeLogbookStatus('locked')"
                                    title="Close All"
                                >
                                    <i class="fas fa-book"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card text-center py-4">
                        <div class="card-header bg-transparent border-0">
                            <h5 class="mb-0">Make All Logbooks Completed/Incomplete</h5>
                        </div>
                        <div class="card-body d-flex flex-column align-items-center">
                            <div class="d-flex gap-4">
                                <button
                                    class="btn btn-info rounded-circle d-flex justify-content-center align-items-center"
                                    style="width:80px; height:80px; font-size:1.5rem;"
                                      @click="changeLogbookStatus('completed')"
                                    title="Complete All"
                                >
                                    <i class="fas fa-check-circle"></i>
                                </button>
                                <button
                                    class="btn btn-dark rounded-circle d-flex justify-content-center align-items-center"
                                    style="width:80px; height:80px; font-size:1.5rem;"
                                    @click="changeLogbookStatus('locked')"
                                    title="Mark All Incomplete"
                                >
                                    <i class="fas fa-times-circle"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
    </div>

</template>
<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>
<script setup>
    import { onMounted, ref,inject } from 'vue';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    import '@/assets/sass/scrollspyNav.scss';

    useMeta({ title: 'Permissions' });

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    const loading_spinner = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError');


    const changeLogbookStatus = (status) => {
        loading_spinner.value = true;
        axiosInstance.get(`/change-logbook-status?status=${status}`)
            .then((response) => {
                showMessage(response.data.message);
            })
            .catch((error) => {
                showError(error.message);
                loading_spinner.value = false;
                console.error("Error fetching Permissions:", error.message);
            });
    };

</script>
