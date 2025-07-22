<template>
    <div class="layout-px-spacing">  
            <ul class="navbar-nav flex-row mt-2">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Masters</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Users</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
     <!-- loading spinner starts -->
<div class="mt-2 mb-2" v-if="loading_spinner" v-html="loadingIndicator()" ></div>
 <!-- loading spinner ends -->  
 


        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table :data="items" :columns="columns" :options="table_option" >
                            <template #status="props">
                                <span class="badge inv-status" :class="'badge-' + props.row.status.class">{{ props.row.status.key }} </span>
                            </template>
                            <template #actions="props">

 <a href="javascript:void(0)" class="text-success" title="Edit" 
   @click="openEditModal(props.row)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
      <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
    </svg>
  </a>


</template>
                        </v-client-table>

                        <!-- Single Update Modal -->
<div class="modal fade mymodal" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true" data-bs-backdrop="false" data-bs-keyboard="false">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="updateModalLabel">Update User Details</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="dismiss"></button>
      </div>

  
        <div class="modal-body">
               <!-- loading spinner starts -->
<div class="mt-2 mb-2" v-if="assigning" v-html="loadingIndicator()" ></div>
 <!-- loading spinner ends -->  
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="username" class="form-label">Assigned Students</label>
             <v-client-table :data="myStudents" :columns="columns" :options="table_option" >
                          
                            <template #actions="props">

 <a href="javascript:void(0)" class="text-danger" title="Edit" 
   @click="deleteAssignedStudent(props.row.assignment_id)">
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
  </a>


</template>
  </v-client-table>
              </div>

            </div>

                <div class="col-md-6">
              <div class="mb-3">
                <label for="username" class="form-label">Unassigned Students</label>
             <v-client-table :data="students" :columns="columns" :options="table_option" >
                          
                            <template #actions="props">

 <a href="javascript:void(0)" class="text-success" title="Edit" 
   @click="assignStudent(props.row.id)">
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
      <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
    </svg>
  </a>


</template>
  </v-client-table>
              </div>

            </div>
          </div>

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          <!-- <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Save changes</button> -->
        </div>
    </div>
  </div>
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
    useMeta({ title: 'Users List' });
    const loadingIndicator = inject('loadingIndicator');
    const updatePassword = ref(false);
    const showMessage = inject('showMessage');
    const showError = inject('showError');
    const name = ref('');
    const loading_spinner = ref(true);
    const username = ref('');
    const useremail = ref('');
    const password = ref(false);
    const user_role = ref('');
    const roles = ref([]);
    const columns = ref(['Sn','Username','actions']);
    const items = ref([]);
    const students = ref([]);
    const item_registration = ref(false);
    const table_option = ref({
        perPage: 10,
        perPageValues: [ 10, 20, 50],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        sortable: ['Sn','User ID' ],
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
    // api base user creation for sample 
 
   
    
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    const selectedId = ref(null);
    const openEditModal = async (row) => {
    selectedId.value = row.id;
        await getAssignedStudents();
    user_role.value = row.role;
    useremail.value = row.email;
    username.value = row.name;
    updatePassword.value = false;
    password.value = ''; // clear previous password if any
    supervisor.value = row.id; // set the supervisor id for assigning students
    // open modal via Bootstrap JS
    const modal = new bootstrap.Modal(document.getElementById('updateModal'));
    modal.show();
};




    const getUsers = () => {
        loading_spinner.value = true;
         axiosInstance.get('/supervisors').
         then((response) => {
            items.value = response.data.map((item, index) => ({
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

const getUnassignedStudents = () => {
    axiosInstance.get('/students')
        .then((response) => {
            students.value = response.data.map((item, index) => ({
                ...item,
                Sn: index + 1,
                Role: item.role,
                User_ID: item.id,
                Username: item.name,
                Email: item.email,
            }));
        })
        .catch((error) => {
        });
};


const myStudents = ref([]);
const getAssignedStudents = async ()  => {
    assigning.value = true;
    axiosInstance.get('/supervisor-students?supervisor_id=' + selectedId.value)
        .then((response) => {
            myStudents.value = response.data.map((item, index) => ({
                ...item,
                Sn: index + 1,
                Role: item.role,
                User_ID: item.id,
                Username: item.name,
                Email: item.email,
            }));
              assigning.value = false;
        })
        .catch((error) => {
            assigning.value = false;
            showError(error.message)
        });
};

    
    const supervisor = ref('');
    const assigning = ref(false);
    const assignStudent = (student) => {
    assigning.value = true;
    const data = {
      student_id : student,
      supervisor_id: supervisor.value
};


           axiosInstance
               .post(`/supervisor-students`, data)
               .then((response) => {
                   showMessage('Student assigned successfully!');
                    getUnassignedStudents();
                    getAssignedStudents();
                       assigning.value = false;
               })
               .catch((error) => {
                showError("Error code : "+ error.status);
                console.log(error);
                   assigning.value = false;
               });
            
       };

       const deleteAssignedStudent = (id) => {
      assigning.value = true;
      axiosInstance
        .delete(`/supervisor-students/${id}`)
        .then((response) => {
          showMessage('Student unassigned successfully!');
          getUnassignedStudents();
          getAssignedStudents();
          assigning.value = false;
        })
        .catch((error) => {
          showError("Error code : " + error.status);
          console.log(error);
          assigning.value = false;
        });
      }

      
    onMounted(() => {
        getUsers();
        getUnassignedStudents();
    });
</script>

<style scoped>
 .mymodal{
  background-color: rgba(79, 79, 79, 0.607);
 }


</style> 