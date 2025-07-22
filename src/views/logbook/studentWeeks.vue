<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Lists</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Logbooks</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>


        <div class="seperator-header layout-top-spacing">
        </div>
      

    <!-- loading spinner starts -->
<div v-if="loading" v-html="loadingIndicator()" ></div>
 <!-- loading spinner ends -->  

<div v-else  class="row">
    <div v-for="week,i in items" class="col-md-4 mb-4">
        <!-- active card starts-->
  <div  class="card border-0 shadow-lg h-100 overflow-hidden">
    <!-- Card Header with gradient background -->
    <div class="card-header py-3 text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0 font-weight-bold text-white">
          <i class="fas fa-calendar-week me-2"></i>Weekly Report
        </h5>
        <span 
        v-if="week.days_count == 5 "
        class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm">
         <svg 
          @click="setDataModal(week)" data-bs-toggle="modal" 
                                 data-bs-target="#view_modal"
         xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="text-dark bi bi-chat-square-text" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
         </svg>
        </span>
        <span class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm">
          Week <span id="weekNumber" class="fw-bold">  {{  i + 1 }}</span>
        </span>
      </div>
    </div>
    
    <!-- Card Body -->
    <div class="card-body position-relative">
      <!-- Decorative element -->
      <div class="position-absolute top-0 end-0 mt-3 me-3 opacity-10">
        <i class="fas fa-calendar-check fa-4x"></i>
      </div>
      
      <!-- Status Indicators -->
         <div class="row row-cols-1 row-cols-sm-2 g-3 mb-4"> <!-- Changed here -->
        <div class="col">
          <div class="p-3 rounded-3 h-100" style="background-color: rgba(40, 167, 69, 0.1);">
            <div class="d-flex align-items-center">
              <div v-if="week.days_count == 5 " class="bg-success bg-opacity-10 p-2 rounded me-3">
                <i class="fas fa-check-circle text-success"></i>
              </div>
              <div v-else class="bg-danger bg-opacity-10 p-2 rounded me-3">
                <i class="fas fa-check-circle text-success"></i>
              </div>
              <div>
                <p class="small text-muted mb-0">Status</p>
                <h6 v-if="week.days_count == 5 " class="mb-0 text-success fw-bold" id="statusBadge">Completed</h6>
                <h6 v-else class="mb-0 text-danger fw-bold" id="statusBadge">Incomplete</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="p-3 rounded-3 h-100" style="background-color: rgba(13, 110, 253, 0.1);">
            <div  v-if="week.remarks" class="d-flex align-items-center">
              <div class="bg-primary bg-opacity-10 p-2 rounded me-3">
                <i class="fas fa-user-check text-primary"></i>
              </div>
              <div>
                <p class="small text-muted mb-0">Attendance</p>
                <h6 class="mb-0 text-primary fw-bold" id="attendedBadge">Attended</h6>
              </div>
            </div>
             <div v-else class="d-flex align-items-center">
              <div class="bg-danger bg-opacity-10 p-2 rounded me-3">
                <i class="fas fa-user-check text-primary"></i>
              </div>
              <div>
                <p class="small text-muted mb-0">Attendance</p>
                <h6 class="mb-0 text-danger fw-bold" id="attendedBadge">Not Attended</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Progress Section -->
  <div class="mb-4">
    <div class="d-flex justify-content-between mb-2">
      <span class="small text-muted">Days Filled</span>
      <span class="small fw-bold">{{ week.days_count }} of 5 days</span>
    </div>
    <div class="progress" style="height: 10px; border-radius: 5px;">
      <div 
        class="progress-bar"
        role="progressbar"
        :style="{
          width: `${(week.days_count / 5) * 100}%`,
          background: 'linear-gradient(90deg, #f6d365 0%, #fda085 100%)'
        }"
        :aria-valuenow="(week.days_count / 5) * 100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
      <!-- Action Button -->
      <router-link :to="`/week-days/${week.id}`" class="btn btn-outline-primary w-100 py-2 rounded-pill d-flex align-items-center justify-content-center">
        <i class="fas fa-chart-line me-2"></i> View Detailed Analytics
      </router-link>
    </div>
    
    <!-- Card Footer -->
    <div class="card-footer bg-light py-2">
      <div class="d-flex justify-content-between align-items-center">
        <span class="small text-muted">
          <!-- <i class="far fa-clock me-1"></i> Updated: <span id="lastUpdated">Just now</span> -->
           <i class="far fa-clock me-1"></i> Updated: <span id="lastUpdated">{{ week.created_at }}</span>
        </span>
        <div class="dropdown">
          <button class="btn btn-sm p-0 text-muted" type="button" data-bs-toggle="dropdown">
            <i class="fas fa-ellipsis-h"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#"><i class="fas fa-download me-2"></i>Export</a></li>
            <li><a class="dropdown-item" href="#"><i class="fas fa-share-alt me-2"></i>Share</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- active card ends -->
</div>
</div>
<div v-if="items.length === 0" class="d-flex justify-content-center align-items-center" style="min-height: 60vh; background-color: #f8f9fa;">
  <div class="card shadow-sm border-0 rounded-4 text-center p-4" style="max-width: 500px; width: 100%;">
    <div class="card-body">
      <div class="mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#6c757d" class="bi bi-journal-x" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 8a.5.5 0 0 1 .5-.5H9a.5.5 0 0 1 0 1H6.5A.5.5 0 0 1 6 8z"/>
          <path d="M8 1a2 2 0 0 0-2 2v1h6V3a2 2 0 0 0-2-2H8zM4 3V2a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h1a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1zm0 1H3v11h10V4h-1v1H4V4z"/>
        </svg>
      </div>
      <h5 class="card-title text-secondary fw-bold">No Logbook Entries</h5>
      <p class="card-text text-muted">This student has not filled any logbook yet. Please check again later.</p>
    </div>
  </div>
</div>



 <!-- Button trigger modal -->
  <!--view  Modal -->
<div class="modal fade mymodal" id="view_modal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1  class="modal-title fs-5 " id="staticBackdropLabel">Record Preview</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="dismiss"></button>
      </div>
      <div class="container"> 
        <div class="d-flex">
            <div >{{ today_day }}</div>
           <div class="ms-auto">{{ today }}</div>
        </div>
      </div>
      
        <form v-if="!student.remarks" @submit.prevent="updateWeek(student.id)">
            <div class="modal-body">
            <div class="row">
                  <div class="col-md-12 mt-2">
                    <textarea  class="form-control" v-model="remark" placeholder="Enter Weekly Assessment Descriptions" required></textarea>
                </div>
            </div>
          </div>
            <div class="modal-footer">
                <button  type="button" class="btn btn-danger" @click="edit=!edit">Cancel</button>
                  <button type="submit" class="btn btn-primary">
                     <span  v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                     <span v-else>
                      Save
                    </span>
                  </button>
            </div>
        </form>
    <div v-else class="container my-4">
  <div class="row g-3">
    <div class="col-12">
      <div class="card shadow rounded-4 p-3">
        <h5 class="mb-2 text-primary text-start">Supervisor's Reviews</h5>
        <p class="mb-0 text-muted text-start">
         {{student.remarks}}
        </p>
      </div>
    </div>




  </div>
</div>

     
    
    </div>
  </div>
</div>
 <!-- view modal ends -->


    </div>
</template>

<style>
    .table3 .actions svg {
        padding: 2px;
    }
</style>

<script setup>
    import { onMounted, ref,inject } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import axios from "axios";
    import { useRoute } from 'vue-router';    
    useMeta({ title: 'Daily Report' });
    
    const loadingIndicator = inject('loadingIndicator');
    const route = useRoute();
    const today = ref(new Date().toISOString().split('T')[0]);
    const today_day =  new Date().toLocaleDateString('en-US', { weekday: 'long' })
    const columns = ref(['SNo' ,'date','description','lesson_learnt','actions']);
    const items = ref(['']);
    const loading = ref(false);
    const edit = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError'); 
    const table_option = ref({
        perPage: 10,
        perPageValues: [ 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['SNo' ,'date'],
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

    const axiosInstance = axios.create({
        baseURL:process.env.VUE_APP_API_BASE_URL
    });




    const student_id =  route.params.student_id;

const student = ref('');
const setDataModal = (data) => {
    student.value = data;
    console.log('data',data);
}

   
    onMounted(() => {
           getWeeks();
    });



   const total_weeks = ref(0); 
   const last_date = ref('');
   const getWeeks = async () => {
    loading.value=true;
        await axiosInstance.get(`/weeks?student_id=${student_id}`).
         then((response) => {
         total_weeks.value = response.data.weeks;
         last_date.value = response.data.last_filled;
         items.value = response.data.data;
        });
        loading.value=false;
    };

        const remark =ref('');
        const updateWeek = async (id) =>{
          loading.value=true;
        const newData = {
           remarks: remark.value,
        };

        axiosInstance
            .put(`/weeks/${id}`, newData)
            .then((response) => {
              student.value.remarks = response.data.remarks,
              getWeeks();
              loading.value=false;
              showMessage('Assessment Saved');
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error saving Data", error);
            });
    }



</script>

<style scoped>
 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }


</style> 
