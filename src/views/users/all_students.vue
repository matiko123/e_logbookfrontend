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

     <!-- my graph starts -->
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-unique-visitors">
                    <div class="widget-heading">
                        <h5>Students Performance Analysis</h5>
                    </div>
                    <div class="widget-content">
                        <apex-chart v-if="unique_visitor_options" height="350" type="bar" :options="unique_visitor_options" :series="unique_visitor_series"></apex-chart>
                    </div>
                </div>
            </div>
         <!-- my graph ends -->
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

        <div v-if="user_permissions.includes('can_visit_students')">
        <span v-if="student.visitation_status === 'Present'"   
           class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm"
           @click="setDataModal(student)" data-bs-toggle="modal" 
            data-bs-target="#review_modal"
           >
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" stroke="green" stroke-width="2"/>
  <path d="M7 12.5L10.5 16L17 9" stroke="green" stroke-width="2" fill="none"/>
</svg>

           </span>

            <span v-if="student.visitation_status === 'Absent'"   
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
        </div>
           <span v-if="!student.visitation_status && user_permissions.includes('can_visit_students')"   
           class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm"
           @click="setDataModal(student)" data-bs-toggle="modal" 
            data-bs-target="#review_modal"
           >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
</svg>
           </span>
            <span v-if="user_permissions.includes('can_open_logbook')" class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm">
            <span  v-if="locking == student.id " class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span >

            <svg 
             @click="setFinalDataModal(student)" data-bs-toggle="modal" 
            data-bs-target="#final_review_modal"
          
             v-if="student.status === 'completed' "
            xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class=" text-dark bi bi-pen-fill" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
</svg>


          <svg v-if="student.status === 'unlocked' && locking != student.id" 
 @click="lockLogbook(student.id)"
  style="cursor:pointer"
  xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 0a4 4 0 0 1 4 4v2.5h-1V4a3 3 0 1 0-6 0v2h.5A2.5 2.5 0 0 1 12 8.5v5A2.5 2.5 0 0 1 9.5 16h-7A2.5 2.5 0 0 1 0 13.5v-5A2.5 2.5 0 0 1 2.5 6H8V4a4 4 0 0 1 4-4"/>
</svg>
<svg
v-if="student.status === 'locked' && locking != student.id"
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
            <div class="d-flex align-items-center"
                @click="setFinalDataModal(student)" data-bs-toggle="modal" 
            data-bs-target="#final_review_modal"
            >
              <div class="bg-opacity-10 p-2 rounded me-3"
               :style="{ background: student.status === 'completed' ? '#28a745' : '#dc3545' }"
              >
                <i class="fas fa-check-circle text-success"></i>
              </div>
              <div>
                <p class="small text-muted mb-0">Status </p>
<h6
  id="attendedBadge"
  class="mb-0 fw-bold"
  :style="{ color: student.status === 'completed' ? '#28a745' : '#dc3545' }"
>
  {{ student.status === 'completed' ? 'Completed' : 'Not completed' }}
</h6>

              </div>
            </div>
          </div>
        </div>
        <div 
        @click="setDataModal(student)" data-bs-toggle="modal" 
            data-bs-target="#review_modal"
          
        class="col">
          <div class="p-3 rounded-3 h-100" style="background-color: rgba(13, 110, 253, 0.1);">
            <div class="d-flex align-items-center">
                <div class="bg-opacity-10 p-2 rounded me-3"
               :style="{ background:  student.visitation_status ? '#28a745' : '#dc3545' }"
              >
                <i class="fas fa-user-check text-primary"></i>
              </div>
              <div>
                <p class="small text-muted mb-0">Visitation</p>
<h6
  id="attendedBadge"
  class="mb-0 fw-bold"
  :style="{ color: student.visitation_status ? '#28a745' : '#dc3545' }"
>
  {{ student.visitation_status ? 'Visited' : 'Not Visited' }}
</h6>

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
        <button type="button" class="btn-close"
         data-bs-dismiss="modal" aria-label="Close" id="dismiss"
         @click="closeModal"
        ></button>
      </div>
      <div class="container">
        <div class="d-flex">
            <div >{{ today_date }}</div>
           <div class="ms-auto">{{ today }}</div>
        </div>
      </div>
      

<div v-if="student.visitation_status">
  <div class="modal-body">
    <div class="row">
       <div class="col-md-3">
        <label class="form-control">Student : {{ student.name }}</label>
       </div>
       <div class="col-md-3">
           <label class="form-control">Email : {{ student.email }}</label>
       </div>
        <div class="col-md-3">
            <label class="form-control">Student was {{ student.visitation_status }}</label>          
       </div>
          <div class="col-md-3">
      <label class="form-control">Date: {{ student.updated_at }}</label>
       </div>
       <div v-if="student.review" class="col-md-12">
        <label class="form-control">Visitor's Review : {{ student.review }}</label>
       </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" @click="closeModal">
      Close
    </button>
  </div>
</div>


  <form v-else  @submit.prevent="addReview(student.id)" enctype="multipart/form-data" v-if="user_permissions.includes('can_visit_students')">
  <div class="modal-body">
    <div class="row">
       <div class="col-md-4">
        <label class="form-control">Student : {{ student.name }}</label>
       </div>
       <div class="col-md-4">
           <label class="form-control">Email : {{ student.email }}</label>
       </div>
        <div class="col-md-4">
           <select class="form-control" v-model="status" required>
            <option value="">Presence Status</option>
            <option value="Present">Was Present</option>
            <option value="Absent">Was Absent</option>
           </select>
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

<div v-if="!student.visitation_status && !user_permissions.includes('can_visit_students')">
  <div class="modal-body">
    <div class="card text-center border-danger">
      <div class="card-body">
        <h5 class="card-title text-danger">No Visitation Recorded</h5>
        <p class="card-text">There is currently no visitation made for this student.</p>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
      Close
    </button>
  </div>
</div>
 
    
    </div>
  </div>
</div>
       <!-- review modal ends -->

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

  <form v-if="competence_form && user_permissions.includes('can_fill_final_review') && student.status === 'completed'"  @submit.prevent="submitCompetenceForm">
    <div class="table-responsive">
    <div class="modal-body ">
      <table class="table table-bordered align-middle text-center">
        <thead class="table-light">
          <tr>
            <th class="text-start">#</th>
            <th>None</th>
            <th>Weak</th>
            <th>Considerable</th>
            <th>Strong</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(competence, index) in competences"
            :key="index"
          >
            <td class="text-start">{{ index + 1 }}. {{ competence.description }}</td>

            <td>
              <input
                type="radio"
                :name="'competence_' + index"
                value="None"
                v-model="competence.status"
                required
              />
            </td>
            <td>
              <input
                type="radio"
                :name="'competence_' + index"
                value="Weak"
                v-model="competence.status"
                required
              />
            </td>
            <td>
              <input
                type="radio"
                :name="'competence_' + index"
                value="Considerable"
                v-model="competence.status"
                required
              />
            </td>
            <td>
              <input
                type="radio"
                :name="'competence_' + index"
                value="Strong"
                v-model="competence.status"
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-danger" @click="closeModal">
      Close
    </button>
      <button type="submit" class="btn btn-primary">
          <span  v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span v-else>
         Submit
        </span>
      </button>
    </div>
  </form>
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
      <tr v-for="competence,i in studentCompetences" :key="competence.id">
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
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
      Close
    </button>
</div>
  </div>


</div>    
    </div>
  </div>
               </div>
        <!-- final review modal ends -->

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
    import { useStore } from 'vuex';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Student List' });
    import ApexChart from 'vue3-apexcharts';
    const loadingIndicator = inject('loadingIndicator');
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const status = ref('');
    const loading_spinner = ref(true);
    const items = ref([]);
    const user_permissions = JSON.parse(localStorage.getItem("user")).permissions;
    const user_id =  JSON.parse(localStorage.getItem("user")).id;
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
 const store = useStore();
 const today = ref('');
 const student = ref('');

 const closeModal = () => {
      competence.value= false
     competence_form.value=false
      document.getElementById('dismiss2').click()
      document.getElementById('dismiss').click()
     studentCompetences.value = ['']
 }
 const setDataModal = async (data)  => {
   await fetchStudentCompetences(data.id);
    student.value = data;
}

 const setFinalDataModal = async (data)  => {
     student.value = data;
    await fetchStudentCompetences(data.id);
}

const loading = ref(false);
const submitCompetenceForm = async () => {
  loading.value=true;
  try {
    const userId = student.value?.id

    if (!userId) {
      throw new Error('User ID is missing.')
    }

    const selectedCompetences = competences.value.filter(c => c.status)

    if (selectedCompetences.length === 0) {
      showError('Please select a status for at least one competence.')
      return
    }

    for (const competence of selectedCompetences) {
      const payload = {
        user_id: userId,
        competence_id: competence.id,
        status: competence.status
      }

      await axiosInstance.post('/user-competences', payload)
    }
    fetchStudentCompetences(userId);
    showMessage('Competence data submitted successfully.');
    // document.getElementById('close').click();
    loading.value=false;
  } catch (error) {
    console.error('Submission error:', error)
    showError(error.response?.data?.message || error.message)
  }
}


    const getUsers = () => {
         axiosInstance.get(`all-students`).
         then((response) => {
            items.value = response.data
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

    const competences = ref(['']);
    const fetchCompetences = () => {
         axiosInstance.get('/competences').
         then((response) => {
            competences.value = response.data
        });
    };



     const competence = ref(false);
     const competence_form = ref(false)
      const studentCompetences = ref(['']);
const fetchStudentCompetences = async (id) => {
    axiosInstance.get(`/user-competences?student_id=${id}`)
    .then((response) => {
        studentCompetences.value = response.data;
        if (studentCompetences.value.length > 0) {
            competence.value = true;
            competence_form.value = false;
        } else {
            competence.value = false;
            competence_form.value = true;
        }
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
       visitation_status: status.value,
       visitor_id : user_id,
       reading_notification : 'visited',
       visitation_date : new Date().toISOString().split('T')[0] 
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

         const unique_visitor_options = ref(null);
    const unique_visitor_series = ref([
        { name: 'Weeks', data: [] },
        { name: 'Days', data: [] },
    ]);

    // Initialize options in onMounted or create a function to generate them
const initChartOptions = () => {
    const is_dark = store.state.is_dark_mode;
    return {
        chart: { toolbar: { show: false } },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        colors: ['#5c1ac3', '#ffbb44'],
        dropShadow: { enabled: true, opacity: 0.3, blur: 1, left: 1, top: 1, color: '#515365' },
        plotOptions: { bar: { horizontal: false, columnWidth: '20%', borderRadius: 10 } },
        legend: { position: 'bottom', horizontalAlign: 'center', fontSize: '14px', markers: { width: 12, height: 12 }, itemMargin: { horizontal: 0, vertical: 8 } },
        grid: { borderColor: is_dark ? '#191e3a' : '#e0e6ed' },
        xaxis: {
            categories: [],
            axisBorder: { show: true, color: is_dark ? '#3b3f5c' : '#e0e6ed' },
        },
        yaxis: {
            min: 0,
            forceNiceScale: false,
            labels: {
                formatter: function(val) {
                    return parseInt(val); // Fuck decimals
                }
            },
            tickAmount: 4 // Shows 0,1,2,3,4,5
        },
        fill: {
            type: 'gradient',
            gradient: { shade: is_dark ? 'dark' : 'light', type: 'vertical', shadeIntensity: 0.3, inverseColors: false, opacityFrom: 1, opacityTo: 0.8, stops: [0, 100] },
        },
        tooltip: {
            theme: is_dark ? 'dark' : 'light',
            y: {
                formatter: function (val) {
                    return val; // Keep tooltip values as-is
                },
            },
        },
    };
};

    const getAnalysis = () => {
        axiosInstance.get(`/analysis`)
            .then((response) => {
                if (response.data) {
                    const raw = response.data;

                    const categories = raw.map(item => item.name);
                    const weeksData = raw.map(item => item.weeks);
                    const daysData = raw.map(item => item.days);

                    // Update series data
                    unique_visitor_series.value = [
                        { name: 'Weeks', data: weeksData },
                        { name: 'Days', data: daysData },
                    ];

                    // Update options with new categories
                    unique_visitor_options.value = {
                        ...initChartOptions(),
                        xaxis: {
                            ...initChartOptions().xaxis,
                            categories: categories
                        }
                    };
        
                } else {
                    console.error('Error fetching analysis data:', response.data);
                }
            })
            .catch(error => {
                console.error('API error:', error);
            });
    };



    onMounted(() => {
        loading_spinner.value = true;
        getUsers();
        fetchCompetences();
        unique_visitor_options.value = initChartOptions();
        getAnalysis();
    });
</script>

<style scoped>
 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }


</style> 