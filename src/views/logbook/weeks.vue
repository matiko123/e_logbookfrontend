<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Student</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Weeks</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
            <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Lists</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Weeks</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>
  <!-- loading spinner starts -->
<div v-if="loading_spinner" v-html="loadingIndicator()" ></div>
 <!-- loading spinner ends -->  


        <!-- weeks card starts -->
         <div v-else class="row">
              <!-- notification badge starts -->
       <div v-if="user.notification && notification" class="container py-5">
    <div class="card p-4">
      <div class="close-badge"  @click="notification = false">&times;</div>

      <div class="d-flex align-items-center mb-3">
        <div class="green-dot"></div>
        <h5 class="mb-0">Attendance Notification</h5>
      </div>

      <div class="d-flex align-items-start">
     <svg class="svg-icon" fill="#28a745" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.485 1.929a1 1 0 0 1 0 1.414L6.414 10.414l-3.9-3.9a1 1 0 0 1 1.414-1.414l2.486 2.486 6.071-6.071a1 1 0 0 1 1.414 0z"/>
</svg>

        <div>
          <p class="mb-1 fw-bold">Dear {{ user.name }}</p>
          <p class="mb-1">
            Your Logbook has been attended by <strong>Supervisor Abc Supervisor</strong> on <strong>Date bla bla bla</strong>.
          </p>
          <p class="text-success fw-semibold mb-0">✔ Success & Completion</p>
        </div>
      </div>
    </div>
      </div>
     <!-- notification badge ends -->
    <div v-for="week,i in items" class="col-md-4 mb-4">
        <!-- active card starts-->
  <div  class="card border-0 shadow-lg h-100 overflow-hidden">
    <!-- Card Header with gradient background -->
    <div class="card-header py-3 text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0 font-weight-bold text-white">
          <i class="fas fa-calendar-week me-2"></i>Weekly Report
        </h5>
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
            <div class="d-flex align-items-center">
              <div class="bg-primary bg-opacity-10 p-2 rounded me-3">
                <i class="fas fa-user-check text-primary"></i>
              </div>
              <div>
                <p class="small text-muted mb-0">Attendance</p>
                <h6 class="mb-0 text-primary fw-bold" id="attendedBadge">Present</h6>
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

   <!-- inactive card starts -->
   <div v-if="items.length!= 0 && items.length < 8 " class="col-md-4 mb-4">
<div  class="card border-0 shadow-lg h-100 overflow-hidden" style="
    filter: grayscale(20%) brightness(0.95);
    background-color: #f5f5f5;
    pointer-events: none;
    opacity: 0.9;
    border: 1px solid #e0e0e0 !important;
">
    <!-- Card Header with muted gradient background -->
    <div class="card-header py-3 text-white" style="
          background: linear-gradient(135deg, #bebebe 0%, #6b6a6c 100%);
        filter: brightness(0.9);
    ">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0 font-weight-bold" style="color: #f0f0f0 !important">
          <i class="fas fa-calendar-week me-2"></i>Weekly Report
        </h5>
        <span class="badge rounded-pill px-3 py-2 shadow-sm" style="
            background-color: rgba(245,245,245,0.9) !important;
            color: #555 !important;
        ">
          Week <span id="weekNumber" class="fw-bold">  {{  items.length + 1 }}</span>
        </span>
      </div>
    </div>
    
    <!-- Card Body -->
    <div class="card-body position-relative" style="background-color: #f8f8f8">
      <!-- Decorative element -->
      <div class="position-absolute top-0 end-0 mt-3 me-3" style="opacity: 0.05">
        <i class="fas fa-calendar-check fa-4x" style="color: #666"></i>
      </div>
      
      <!-- Status Indicators -->
      <div class="row row-cols-1 row-cols-sm-2 g-3 mb-4">
        <div class="col">
          <div class="p-3 rounded-3 h-100" style=" background: linear-gradient(135deg, #bebebe 0%, #6b6a6c 100%);">
            <div class="d-flex align-items-center">
              <div class="p-2 rounded me-3" style=" background: linear-gradient(135deg, #bebebe 0%, #6b6a6c 100%);">
                <i class="fas fa-check-circle" style="color: #2a8a4a"></i>
              </div>
              <div>
                <p class="small mb-0" style="color: #777">Status</p>
                <h6 class="mb-0 fw-bold text-dark" id="statusBadge">Inactive</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="p-3 rounded-3 h-100" style=" background: linear-gradient(135deg, #bebebe 0%, #6b6a6c 100%);">
            <div class="d-flex align-items-center">
              <div class="p-2 rounded me-3" style=" background: linear-gradient(135deg, #bebebe 0%, #6b6a6c 100%);">
                <i class="fas fa-user-check" style="color: #0a58ca"></i>
              </div>
              <div>
                <p class="small mb-0" style="color: #777">Attendance</p>
                <h6 class="mb-0 fw-bold text-dark"  id="attendedBadge">Absent </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Progress Section -->
      <div class="mb-4">
        <div class="d-flex justify-content-between mb-2">
          <span class="small" style="color: #777">Days Filled</span>
          <span class="small fw-bold" style="color: #555" id="daysText">0 of 5 days</span>
        </div>
        <div class="progress" style="height: 10px; border-radius: 5px; background-color: #e0e0e0">
          <div class="progress-bar" 
               id="daysProgress"
               role="progressbar" 
               style="width: 0%; background: linear-gradient(135deg, #bebebe 0%, #6b6a6c 100%);"
               aria-valuenow="75" 
               aria-valuemin="0" 
               aria-valuemax="100"></div>
        </div>
      </div>
      
      <!-- Action Button -->
      <button class="btn  w-100 py-2 rounded-pill d-flex align-items-center justify-content-center" 
              style="
                  background-color: #e0e0e0 !important;
                  color: #777 !important;
                  border: 1px solid #ccc !important;
                  cursor: not-allowed;
              " disabled>
        <i class="fas fa-chart-line me-2"></i> View Detailed Analytics
      </button>
    </div>
    
    <!-- Card Footer -->
    <div class="card-footer py-2" style="background-color: #ececec; border-top: 1px solid #ddd !important">
      <div class="d-flex justify-content-between align-items-center">
        <span class="small" style="color: #777">
          <i class="far fa-clock me-1"></i> Updated: <span id="lastUpdated">No update</span>
        </span>
        <button class="btn btn-sm p-0" style="color: #999 !important" disabled>
            <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>
    </div>
</div>
   </div> 
    <!-- inactive card ends -->

    <!-- new card starts  -->
<div v-if="items.length == 0"   class="col-md-4 mb-4">
        <!-- active card starts-->
  <div  class="card border-0 shadow-lg h-100 overflow-hidden">
    <!-- Card Header with gradient background -->
    <div class="card-header py-3 text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0 font-weight-bold text-white">
          <i class="fas fa-calendar-week me-2"></i>Weekly Report
        </h5>
        <span class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm">
          Week <span id="weekNumber" class="fw-bold">  1</span>
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
              <div class="bg-danger bg-opacity-10 p-2 rounded me-3">
                <i class="fas fa-check-circle text-success"></i>
              </div>
              <div>
                <p class="small text-muted mb-0">Status</p>
                <h6 class="mb-0 text-danger fw-bold" id="statusBadge">Incomplete</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="p-3 rounded-3 h-100" style="background-color: rgba(13, 110, 253, 0.1);">
            <div class="d-flex align-items-center">
              <div class="bg-primary bg-opacity-10 p-2 rounded me-3">
                <i class="fas fa-user-check text-primary"></i>
              </div>
              <div>
                <p class="small text-muted mb-0">Attendance</p>
                <h6 class="mb-0 text-primary fw-bold" id="attendedBadge">Present</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Progress Section -->
    <div class="mb-4">
        <div class="d-flex justify-content-between mb-2">
          <span class="small text-muted">Days Filled</span>
          <span class="small fw-bold" id="daysText">0 of 5 days</span>
        </div>
        <div class="progress" style="height: 10px; border-radius: 5px;">
          <div class="progress-bar" 
               id="daysProgress"
               role="progressbar" 
               style="width: 0%; background: linear-gradient(90deg, #f6d365 0%, #fda085 100%);"
               aria-valuenow="75" 
               aria-valuemin="0" 
               aria-valuemax="100"></div>
        </div>
      </div>
      <!-- Action Button -->
      <button @click="registerWeek()" class="btn btn-outline-primary  w-100 py-2 rounded-pill d-flex align-items-center justify-content-center">
         Get Started
      </button>
    </div>
    
    <!-- Card Footer -->
    <div class="card-footer bg-light py-2">
      <div class="d-flex justify-content-between align-items-center">
        <span class="small text-muted">
          <!-- <i class="far fa-clock me-1"></i> Updated: <span id="lastUpdated">Just now</span> -->
           <i class="far fa-clock me-1"></i> Updated: <span id="lastUpdated"> No Update</span>
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

     <!-- new card ends -->
         </div>

         <!-- weeks card ends  -->
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
    import { useRouter } from 'vue-router';
    useMeta({ title: 'Weeks' });

    const router = useRouter();
    const loadingIndicator = inject('loadingIndicator');
    const showMessage = inject('showMessage');
    const showError = inject('showError'); 
    const user_id = JSON.parse(localStorage.getItem("user")).id;
     const user = JSON.parse(localStorage.getItem("user"));
    const loading_spinner = ref(false);
    const notification = ref(true)
    const items = ref(['']);

    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });




    const getWeeks = () => {
        loading_spinner.value = true;
         axiosInstance.get(`/weeks?student_id=${user_id}`).
         then((response) => {
            items.value = response.data.data.map((item, index) => ({
                ...item,
                Sn: index + 1,
                Role: item.role,
                User_ID: item.id,
                Username: item.name,
                Email: item.email,
                
            }));
            loading_spinner.value = false;
        });
    };

    const registerWeek = async () =>{
        loading_spinner.value = true;
        const newData = {
           student_id: user_id,
        };

        axiosInstance
            .post(`/weeks`, newData)
            .then((response) => {
              router.push(`/week-days/${response.data.week_id}`);
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error saving Data", error);
                loading.value = false;
            });
    }


    onMounted(() => {
        getWeeks();
    });
</script>

<style scoped>
.disabled-card {
  cursor: not-allowed;
  filter: grayscale(30%);
}
 .card {
      border: none;
      border-radius: 1rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      position: relative;
    }
    .green-dot {
      width: 12px;
      height: 12px;
      background-color: #28a745;
      border-radius: 50%;
      margin-right: 8px;
    }
    .svg-icon {
      width: 40px;
      height: 40px;
      margin-right: 12px;
    }
    .close-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background-color: #dc3545;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
</style>