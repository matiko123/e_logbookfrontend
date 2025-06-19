<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <!-- <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li> -->
                                <li class="breadcrumb-item active" aria-current="page"><span>Students</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
     <!-- loading spinner starts -->
<div class="mt-2 mb-2" v-if="loading_spinner" v-html="loadingIndicator()" ></div>
 <!-- loading spinner ends -->  

    <!-- students card starts -->

             <div class="row">
     <div v-for="student in items "  class="col-md-4 mb-4">
        <!-- active card starts-->
  <div  class="card border-0 shadow-lg h-100 overflow-hidden">
    <!-- Card Header with gradient background -->
    <div class="card-header py-3 text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0 font-weight-bold text-white">
          <i class="fas fa-calendar-week me-2"></i>{{ student.name }}
        </h5>

            <span v-if="student.status === 'Approved'"   
           class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm"
           @click="setDataModal(student)" data-bs-toggle="modal" 
            data-bs-target="#review_modal"
           >
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" stroke="green" stroke-width="2"/>
  <path d="M7 12.5L10.5 16L17 9" stroke="green" stroke-width="2" fill="none"/>
</svg>

           </span>

                 <span v-if="student.status === 'Rejected'"   
           class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm"
           @click="setDataModal(student)" data-bs-toggle="modal" 
            data-bs-target="#review_modal"
           >
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" stroke="red" stroke-width="2"/>
  <line x1="8" y1="8" x2="16" y2="16" stroke="red" stroke-width="2"/>
  <line x1="16" y1="8" x2="8" y2="16" stroke="red" stroke-width="2"/>
</svg>
           </span>

           <span v-if="student.status === 'on_review'"   
           class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm"
           @click="setDataModal(student)" data-bs-toggle="modal" 
            data-bs-target="#review_modal"
           >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
</svg>
           </span>
            <span v-if="student.status === 'locked' ||  student.status === 'unlocked'  " class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm">
            <span  v-if="locking == student.id " class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-else>
          <svg v-if="student.status === 'unlocked'" 
 @click="lockLogbook(student.id)"
  style="cursor:pointer"
  xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 0a4 4 0 0 1 4 4v2.5h-1V4a3 3 0 1 0-6 0v2h.5A2.5 2.5 0 0 1 12 8.5v5A2.5 2.5 0 0 1 9.5 16h-7A2.5 2.5 0 0 1 0 13.5v-5A2.5 2.5 0 0 1 2.5 6H8V4a4 4 0 0 1 4-4"/>
</svg>
<svg
v-if="student.status === 'locked'"
@click="unlockLogbook(student.id) "
style="cursor:pointer"
xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
</svg>
          </span> 


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
      <router-link :to="`/student-weeks/${student.id}`" class="btn btn-outline-primary  w-100 py-2 rounded-pill d-flex align-items-center justify-content-center">
        View Weeks
      </router-link>
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
</div>
     <!-- student card ends -->
      <!-- review modal starts -->
       <div class="modal fade mymodal" id="review_modal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 " id="staticBackdropLabel">Student's Review</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="dismiss"></button>
      </div>
      <div class="container">
        <div class="d-flex">
            <div >{{ today_date }}</div>
           <div class="ms-auto">{{ today }}</div>
        </div>
      </div>
      
      <form @submit.prevent="addReview(student.id)" enctype="multipart/form-data" v-if="user_permissions.includes('can_fill_final_review')">
  <div class="modal-body">
    <div class="row">
       <div class="col-md-4">
        <label class="form-control">Student : {{ student.name }}</label>
       </div>
       <div class="col-md-4">
           <label class="form-control">Email : {{ student.email }}</label>
       </div>
        <div class="col-md-2">
           <select class="form-control" v-model="status" required>
            <option value="">Select Status</option>
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
           </select>
       </div>
     <div class="col-md-2">
  <input 
    v-if="status ==='Approved'"
    v-model="grade"
    type="number" 
    class="form-control" 
    placeholder="Enter Grade" 
    step="0.01" 
    min="0.00" 
    max="100.0" 
    required
  >
</div>

       <div v-if="student.review" class="col-md-12">
        <label class="form-control">Last Review : {{ student.review }}</label>
       </div>
      <div class="col-md-12 mb-2">
        <textarea
          class="form-control"
          v-model="review"
          placeholder="Enter Student's Remarks"
          required
          style="height:120px;"
        ></textarea>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
      Cancel
    </button>
    <button type="submit" class="btn btn-primary">
      <span  v-if="locking == 1 " class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
     <span v-else>
          Save
     </span>
    </button>
  </div>
</form>

<div v-else>
<div v-if="student.status ==='Rejected'" class="modal-footer">
     <label class="form-label">Date Rejected : {{ student.updated_at }}</label>
  <label class="form-control">Reason for Rejection  : {{ student.review }}</label>
 <div class="modal-footer">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
      Close
    </button>
  </div>
</div>

<div v-else class="modal-body">
  <div class="row">
    <div class="col-md-6">
      <label class="form-control">Date Approved : {{ student.updated_at }}</label>
    </div>
    <div class="col-md-3">
      <label class="form-control">Marks : {{ student.grade }}</label>
    </div>
     <div class="col-md-3">
      <label class="form-control">Grade : {{ mark }}</label>
    </div>
  </div>
  <label class="form-control">Approval Review  : {{ student.review }}</label>

  <div class="modal-footer">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
      Close
    </button>
  </div>
</div>
</div>

     
    
    </div>
  </div>
</div>
       <!-- review modal ends -->

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
    useMeta({ title: 'Users List' });
    const loadingIndicator = inject('loadingIndicator');
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const status = ref('');
    const loading_spinner = ref(true);
    const items = ref([]);
    const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });

 const today = ref('');
 const student = ref('');
 const mark = ref('');
 const setDataModal = (data) => {
    student.value = data;
    status.value = data.status; 
   if (data.grade >= 80) {
  mark.value = 'A';
} else if (data.grade >= 70) {
  mark.value = 'B+';
} else if (data.grade >= 60) {
  mark.value = 'B';
} else if (data.grade >= 50) {
  mark.value = 'C';
} else if (data.grade >= 40) {
  mark.value = 'D';
} else {
  mark.value = 'F';
}

}

    const getUsers = () => {
         axiosInstance.get('/users').
         then((response) => {
            items.value = response.data
            .filter(item => item.role === 'Student')
            .map((item, index) => ({
                ...item,
                Sn: index + 1,
                Role: item.role,
                User_ID: item.id,
                Username: item.name,
                Email: item.email,
                
            }));
            loading_spinner.value = false;
                 locking.value = 0;
        });
    };

const locking = ref(0);
    const unlockLogbook = (id) => {
        locking.value = id;
    const newItemData = {
       status: "unlocked",
};
           axiosInstance
               .put(`/users/${id}`, newItemData)
               .then((response) => {
                   getUsers();
                   showMessage('Logbook Opened for Today');
               })
               .catch((error) => {
                showError("Error code : "+ error.status);
                console.log(error);
               });
                  
       };

       
    const lockLogbook = (id) => {
           locking.value = id;
    const newItemData = {
       status: "locked",
};
           axiosInstance
               .put(`/users/${id}`, newItemData)
               .then((response) => {
                   showMessage('Logbook CLosed ');
                getUsers();
               })
               .catch((error) => {
                showError("Error code : "+ error.status);
                console.log(error);
               });
                
       };

    const review= ref(''); 
    const grade= ref(''); 
    const addReview = (id) => {
      locking.value=1;
    const newItemData = {
       review : review.value,
       status: status.value,
       grade: grade.value
};
           axiosInstance
               .put(`/users/${id}`, newItemData)
               .then((response) => {
                showMessage('Review Submitted ');
                getUsers();
                review.value='';
                status.value='';
                document.getElementById('dismiss').click();
               })
               .catch((error) => {
                showError("Error code : "+ error.status);
                console.log(error);
               }); 
       };

    onMounted(() => {
        loading_spinner.value = true;
        getUsers();
    });
</script>

<style scoped>
 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }


</style> 