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
              <!-- visitation notification badge starts -->
       <div v-if="user.notification && notification" class="container py-5">
    <div class="card p-4">
      <div class="close-badge"  @click="notification = false">&times;</div>

      <div class="d-flex align-items-center mb-3">
        <div class="green-dot"></div>
        <h5 class="mb-0">Visitation Notification</h5>
      </div>

      <div class="d-flex align-items-start"
                  data-bs-toggle="modal" 
            data-bs-target="#review_modal"
      >
     <svg class="svg-icon" fill="#28a745" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.485 1.929a1 1 0 0 1 0 1.414L6.414 10.414l-3.9-3.9a1 1 0 0 1 1.414-1.414l2.486 2.486 6.071-6.071a1 1 0 0 1 1.414 0z"/>
</svg>

        <div>
          <p class="mb-1 fw-bold">Dear {{ user.name }}</p>
          <p class="mb-1">
            Your Logbook has been attended by <strong>Supervisor {{ user.visitor.name }}</strong> on <strong>{{ user.visitation_date }}</strong>.
          </p>
          <p class="text-success fw-semibold mb-0"
          >✔ View Assessment</p>
        </div>
      </div>
    </div>
      </div>
     <!--visitation notification badge ends -->
          <!--completion assessment notification badge starts -->
       <div v-if="competence" class="container py-5">
    <div class="card p-4">
      <div class="close-badge"  @click="competence = false">&times;</div>
<div
  data-bs-toggle="modal" 
  data-bs-target="#final_review_modal"
>
   <div class="d-flex align-items-center mb-3">
        <div class="green-dot"></div>
        <h5 class="mb-0">Completion Assessment Notification</h5>
      </div>

      <div class="d-flex align-items-start"

      >
     <svg class="svg-icon" fill="#28a745" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.485 1.929a1 1 0 0 1 0 1.414L6.414 10.414l-3.9-3.9a1 1 0 0 1 1.414-1.414l2.486 2.486 6.071-6.071a1 1 0 0 1 1.414 0z"/>
</svg>

        <div>
          <p class="mb-1 fw-bold">Dear {{ user.name }}</p>
          <p class="mb-1">
            You have been assessed by your Office supervisor from your working Department  on <strong>{{ assessment_date }}</strong>.
          </p>
          <p class="text-success fw-semibold mb-0"
            data-bs-toggle="modal" 
            data-bs-target="#final_review_modal"
          >✔ View Assessment</p>
        </div>
      </div>
</div>
    </div>
      </div>
     <!--attendance notification badge ends -->
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
                v-if="week.remarks"
                @click="prepareModalData(week)"
                 data-bs-toggle="modal" 
                 data-bs-target="#week_review"
                class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm">
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
  <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
  <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
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

           <!-- final review modal starts -->
               <div class="modal fade mymodal" id="final_review_modal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 " id="staticBackdropLabel">Student's Final Review</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="dismiss2"></button>
      </div>
      <div class="container">
        <div class="d-flex">
            <div >{{ today_date }}</div>
           <div class="ms-auto">{{ today }}</div>
        </div>
      </div>
      


<div >

  <div v-if="competence" >
   <div class="table-responsive container">
  <table class="table table-bordered">
    <thead>
      <tr>
         <th>#</th>
        <th>Competence</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="competence,i in competences" :key="competence.id">
        <td>{{ i + 1 }}</td>
        <td>{{ competence.competence.description }}</td>
        <td>{{ competence.status }}</td>
      </tr>
    </tbody>
  </table>
</div>
  </div>
    <div v-else>
  <div class="modal-body">
    <div class="card text-center border-danger">
      <div class="card-body">
        <h5 class="card-title text-danger">No Completion Record</h5>
        <p class="card-text">There is currently no field completion record made for this student.</p>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"  aria-label="Close">
      Close
    </button>
</div>
  </div>


</div>    
    </div>
  </div>
               </div>
        <!-- final review modal ends -->

               <!--visiting supervisor review modal starts -->
       <div class="modal fade mymodal" id="review_modal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 " id="staticBackdropLabel">Student's Review</h1>
        <button type="button" class="btn-close"
         data-bs-dismiss="modal" aria-label="Close" id="dismiss"
        ></button>
      </div>
      <div class="container">
        <div class="d-flex">
            <div >{{ today_date }}</div>
           <div class="ms-auto">{{ today }}</div>
        </div>
      </div>
      

<div >
  <div class="modal-body">
    <div class="row">
       <div class="col-md-3">
        <label class="form-control">Student : {{ user.name }}</label>
       </div>
       <div class="col-md-3">
           <label class="form-control">Email : {{ user.email }}</label>
       </div>
        <div class="col-md-3">
            <label class="form-control">Student was {{ user.visitation_status }}</label>          
       </div>
          <div class="col-md-3">
      <label class="form-control">Date: {{ user.visitation_date }}</label>
       </div>
       <div v-if="user.review" class="col-md-12">
        <label class="form-control">Visitor's Review : {{ user.review }}</label>
       </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
      Close
    </button>
  </div>
</div>
    
    </div>
  </div>
</div>
       <!-- visiting supervisor review modal ends -->
        <!-- week completion review starts -->
         <div class="modal fade mymodal" id="week_review" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1  class="modal-title fs-5 " id="staticBackdropLabel">Weekly Review</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="dismiss"></button>
      </div>
      <div class="container"> 
        <div class="d-flex">
            <div >Date Filled </div>
           <div class="ms-auto">{{ student.date_filled }}</div>
        </div>
      </div>
      
      
    <div class="container my-4">
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
         <!-- week completion review ends -->
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

   const student = ref('')
   const prepareModalData = (data) =>{
    student.value = data
   }

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
                date_filled : formatDate(item.created_at)
                
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
   
    const competences = ref([])
    const competence = ref(false)
   const assessment_date = ref('');


const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  // const yy = String(date.getFullYear()).slice(-2);
  const yy = String(date.getFullYear());
  const HH = String(date.getHours()).padStart(2, '0');
  const ii = String(date.getMinutes()).padStart(2, '0');
  // return `${dd}-${mm}-${yy} Time : ${HH}:${ii}`;
  return `${dd}-${mm}-${yy}`;
};


const fetchCompetences = async () => {
  axiosInstance.get(`/user-competences?student_id=${user_id}`)
    .then((response) => {
      competences.value = response.data;

      if (competences.value.length > 0) {
        competence.value = true;

        // Get the latest created_at (assuming they are not ordered)
        const latest = competences.value.reduce((latest, item) => {
          return new Date(item.created_at) > new Date(latest.created_at) ? item : latest;
        });

        assessment_date.value = formatDate(latest.created_at);
      }

      console.log('competences', competences.value);
    });
};



    onMounted(() => {
        getWeeks();
        fetchCompetences()
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

 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }

</style>