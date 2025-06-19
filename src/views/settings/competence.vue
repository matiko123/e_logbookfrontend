<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Competencess</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <div
          
            class="d-flex me-4 mt-2">
                        <div class="ms-auto">
                            <button class="btn btn-primary" @click="Competences_registration =! Competences_registration">                           
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
</button>
 
                        </div>
                    </div>  
                    <!-- Competences registration form starts -->
 <form v-if="Competences_registration" class="mt-3 p-3 border rounded bg-white shadow" @submit.prevent="registerCompetences">
        <h4 class="text-center">COMPETENCE  REGISTRATION FORM</h4>
        <div class="row mb-2">
    
            <div class="col-md-12">
                <label class="form-label">Competence Description</label>
                <input type="text" class="form-control" placeholder="Enter Competences Name" v-model="name" required>
            </div>
            
        </div>
        <div class="text-center gap-2 justify-content-end">
            <button type="button" class="btn btn-danger me-3" @click="Competences_registration = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>
    </form>
             <!-- item registration form ends-->
 
                          <!-- loading spinner starts -->
                          <div v-if="loading_spinner" class="d-flex justify-content-center align-items-center" style="height: 100px;">
            <span class="text-primary spinner-border spinner-border-sm" Competences="status" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h-4.07a.5.5 0 0 0 0 1h4.07a.5.5 0 0 0 0-1z"/>
                    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 0-.832-.554A4 4 0 1 1 8 4a.5.5 0 0 0 0-1z"/>
                    <path d="M8 1a7 7 0 1 1-6.546 4.914.5.5 0 1 0-.832-.554A8 8 0 1 0 8 0a.5.5 0 0 0 0 1z"/>
                </svg>
                Loading...
            </span>
        </div>
        <!-- Loading spinner ends -->
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="items" :columns="columns" :options="table_option" >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                            </template>
                            <template #actions="props">                                
                                <a href="javascript:void(0);" title="Delete" @click="deleteCompetences(props.row.id)">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="text-danger"
                                    >
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </a>
                    
                            </template>
                           
                        </v-client-table>
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

    useMeta({ title: 'Competence' });

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
     const user_Competencess = JSON.parse(localStorage.getItem("user")).Competencess;
    const Competencess = ref([]);
    const name = ref('');
    const loading_spinner = ref(false);
    const columns = ref(['id', 'description']);
    const items = ref([]);
    const Competences_registration = ref(false);
    const description = ref('');
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const table_option = ref({
        perPage: 10,
        perPageValues: [ 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['id', 'description'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        resizableColumns: false,
    });

    const getCompetences = () => {
        loading_spinner.value = true;
        axiosInstance.get('/competences')
            .then((response) => {
               Competencess.value = response.data;
                items.value = response.data; // Bind the data to items
                loading_spinner.value = false;
            })
            .catch((error) => {
                showError(error.message);
                loading_spinner.value = false;
                console.error("Error fetching Competences:", error.message);
            });
    };

    const deleteCompetences = (id) => {
    if (confirm("Are you sure you want to delete this Competences? " + id)) {
        loading_spinner.value = true;
        axiosInstance.delete(`/competences/${id}`)
            .then((response) => {
                getCompetences();
                showMessage(response.data.message );
                loading_spinner.value = false;
            })
            .catch((error) => {
                showError(error.message );
                loading_spinner.value = false;
                console.error("Error deleting Competences:", error);
            });
    }
};

    const registerCompetences = () => {
        Competences_registration.value = false;
        loading_spinner.value = true;
        const itemData = {
            description: name.value,
        };

        axiosInstance
            .post('/competences', itemData)
            .then((response) => {
                getCompetences();
                loading_spinner.value = false;
                showMessage('Competences registered successfully!');
                name.value = '';
                description.value = '';
            })
            .catch((error) => {
                showError(error.message);
                loading_spinner.value = false;
                console.error("Error registering Competences:", error.message);
            });
    };


    onMounted(() => {
        getCompetences();
    });
</script>
