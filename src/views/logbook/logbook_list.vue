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
        <!-- <button class="btn btn-dark me-2 px-3" @click="$router.go(-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
                </button> -->

                        <!-- loading bar starts -->
<div v-if="loading" class="container">
	<div class="row">
        <div class="col-sm-12">
          <div class="progress">
              <div class="indeterminate"></div>
          </div>
        </div>
    </div>
</div>
         <!-- loading bar ends -->

                     <div v-if="items.length > 0" class="d-flex justify-content-between align-items-center mb-3">  

                   <div class="ms-auto">
    
                        <button class="btn btn-success me-1 p-1" @click="printTable">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer me-1">
                                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                        </button>
                          <button class="btn btn-dark me-1 p-1" @click="downloadPDFTable">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                           </svg>
                        </button>

                        <button class="btn btn-info p-1"  @click="downloadExcelTable">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-spreadsheet-fill" viewBox="0 0 16 16">
  <path d="M6 12v-2h3v2z"/>
  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3z"/>
</svg>
                        </button>
                    </div>
    </div>
                
             
           
       
        <div class="row layout-top-spacing">            
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table table3">
                        <v-client-table  :data="items" :columns="columns" :options="table_option">
                        <template #actions="props">
                              <div class="actions text-center">
                                <a class="btn btn-primary btn-sm p-1" href="javascript:;" @click="setDataModal(props.row)" data-bs-toggle="modal" 
  data-bs-target="#view_modal">
 View
</a>

                                  &nbsp;
                              </div>
    
                          </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
<!-- modal starts -->
 <!-- Button trigger modal -->

<!--Register  Modal -->
<div class="modal fade mymodal" id="staticBackdrop" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 " id="staticBackdropLabel">Enter New Record</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="dismiss"></button>
      </div>
      <div class="container">
        <div class="d-flex">
            <div >{{ today_day }}</div>
           <div class="ms-auto">{{ today }}</div>
        </div>
      </div>
      
        <form @submit.prevent="registerDayData()">
            <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <input type="text" class="form-control" v-model="description" placeholder="Enter Description" required>
                </div>
                  <div class="col-md-12 mt-2">
                    <textarea  class="form-control" v-model="lesson" placeholder="Enter Lesson Learnt" required></textarea>
                </div>
            </div>
          </div>
            <div class="modal-footer">
                <button  type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
     
    
    </div>
  </div>
</div>
 <!-- register modal ends -->
  <!--view  Modal -->
<div class="modal fade mymodal" id="view_modal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 v-if="!edit" class="modal-title fs-5 " id="staticBackdropLabel">Record Preview</h1>
        <h1 v-else class="modal-title fs-5 " id="staticBackdropLabel">Edit Records</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="dismiss"></button>
      </div>
      <div class="container"> 
        <div class="d-flex">
            <div >{{ today_day }}</div>
           <div class="ms-auto">{{ today }}</div>
        </div>
                  <div class="d-flex">
            <div class="ms-auto">
               <button class="btn btn-dark" @click="edit =! edit ">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
               </button>
            </div>
        </div>  
      </div>
      
        <form v-if="edit" @submit.prevent="updateDayData(data_id)">
            <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <input type="text" class="form-control" v-model="description" placeholder="Enter Description" required>
                </div>
                  <div class="col-md-12 mt-2">
                    <textarea  class="form-control" v-model="lesson" placeholder="Enter Lesson Learnt" required></textarea>
                </div>
            </div>
          </div>
            <div class="modal-footer">
                <button  type="button" class="btn btn-danger" @click="edit=!edit">Cancel</button>
                  <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    <div v-else class="container my-4">
  <div class="row g-3">
    <div class="col-12">
      <div class="card shadow rounded-4 p-3">
        <h5 class="mb-2 text-primary">Description</h5>
        <p class="mb-0 text-muted text-start">
         {{description}}
        </p>
      </div>
    </div>
    <div class="col-12">
      <div class="card shadow rounded-4 p-3">
        <h5 class="mb-2 text-success">Lesson Learnt</h5>
        <p class="mb-0 text-muted text-start ">
        {{lesson}}
        </p>
      </div>
    </div>
<div class="col-12" v-if="upload">
  <div class="card shadow rounded-4 p-3 text-center">
    <h5 class="mb-2 text-info">Image</h5>
    <div class="d-flex justify-content-center">
      <img :src="upload" alt="Uploaded Image" class="img-fluid rounded" style="max-width: 300px;" />
    </div>
  </div>
</div>



  </div>
</div>

     
    
    </div>
  </div>
</div>
 <!-- view modal ends -->

 <!-- pdf downloader pages starts -->
  <div id="pdfContent" style="display: none">
    <div class="header" style="text-align:center;margin-bottom:20px;border-bottom:1px solid #ddd;padding-bottom:10px;">
        <h1>Logbook Records</h1>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <thead>
            <tr>
                <th v-for="col in columns.filter(c => c !== 'actions')" :key="col" 
                    style="border:1px solid #ddd;padding:8px;background:#f2f2f2;text-align:left;">
                    {{ col }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td v-for="col in columns.filter(c => c !== 'actions')" :key="col" 
                    style="border:1px solid #ddd;padding:8px;">
                    {{ item[col] }}
                </td>
            </tr>
        </tbody>
    </table>

    <div class="footer" style="text-align:center;font-size:12px;color:#777;">
        <p>This report is system generated. For any queries, please contact the administrator.</p>
    </div>
</div>

  <!-- pdf downloader page ends -->

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
    useMeta({ title: 'Daily Report' });
    
    const today = ref(new Date().toISOString().split('T')[0]);
    const today_day =  new Date().toLocaleDateString('en-US', { weekday: 'long' })
    const columns = ref(['SNo' ,'date','description','lesson_learnt','actions']);
    const items = ref(['']);
    const loading = ref(false); // Add loading state
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


    const description = ref('');
    const lesson = ref('');
    const registerDayData = async () =>{
        document.getElementById('dismiss').click();
        loading.value = true;
        const newData = {
           date:today.value,
           description:description.value,
           lesson: lesson.value,
           student_id:0,
           week_id:0,
        };

        axiosInstance
            .post(`/days`, newData)
            .then((response) => {
                getDaysData();
                loading.value = false;
                showMessage("Saved successfully");
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error saving Data", error);
                loading.value = false;
            });
    }

      const updateDayData = async (id) =>{
        edit.value = false;
        const updatedData = {
           description:description.value,
           lesson: lesson.value,
        };

        axiosInstance
            .put(`/days/${id}`, updatedData)
            .then((response) => {
                getDaysData();
                loading.value = false;
                showMessage("Updated successfully");
            })
            .catch((error) => {
                showError(error.message);
                console.error("Error updating Data", error);
                loading.value = false;
            });
    }

      const user_id = JSON.parse(localStorage.getItem("user")).id;
     const getDaysData = async () =>{
        loading.value=true;
    try {
        const response = await axiosInstance.get(`/days?student_id=${user_id}`);
        items.value = response.data.map((day, index) => {
    return {
        'SNo': index + 1,
        'id': day.id,
        'description':day.description,
        'lesson_learnt':day.lesson,
        'upload' :day.upload,
        'date':day.date,
    };

});
        
    } catch (error) {

        console.error("Error fetching data", error);
        showError(error.message);
    } finally {
        loading.value = false;
    }
     }


   
    onMounted(() => {
           getDaysData()
    });

    const printTable = () => {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        
        // Get the current date for the report header
        const currentDate = new Date().toLocaleDateString();
        
        // Filter out any hidden columns and prepare visible columns
        const visibleColumns = columns.value.filter(col => col !== 'actions');


        // Create the HTML content for printing
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Logbook Report </title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        color: #333;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 10px;
                    }
                    .report-info {
                        margin-bottom: 15px;
                        display: flex;
                        justify-content: space-between;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #777;
                    }
                    @media print {
                        @page {
                            size: landscape;
                            margin: 10mm;
                        }
                    }
                </style>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 500);
                    }
                <\/script>
            </head>
            <body>
                <div class="header">
                    <h1>Logbook Records <br>
                </div>
                
          
                <table>
                    <thead>
                        <tr>
                            ${visibleColumns.map(col => `<th>${col}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${items.value.map(item => `
                            <tr>
                                ${visibleColumns.map(col => {
                                    // Format numbers with commas
                                    if (typeof item[col] === 'number') {
                                        return `<td>${item[col].toLocaleString()}</td>`;
                                    }
                                    // Return regular cell
                                    return `<td>${item[col] || ''}</td>`;
                                }).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="footer">
                    <p>This report is system generated. For any queries, please contact the administrator.</p>
                </div>
            </body>
            </html>
        `);
        
        // Close the document
        printWindow.document.close();
    };

    const downloadExcelTable = () => {
    const visibleColumns = columns.value.filter(col => col !== 'actions');
    const csvRows = [];

    // Header row
    csvRows.push(visibleColumns.join(','));

    // Data rows
    items.value.forEach(item => {
        const row = visibleColumns.map(col => `"${(item[col] || '').toString().replace(/"/g, '""')}"`);
        csvRows.push(row.join(','));
    });

    const csvData = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(csvData);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `logbook-report-${today}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

import html2pdf from 'html2pdf.js';

const downloadPDFTable = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const visibleColumns = columns.value.filter(col => col !== 'actions');

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; margin: 20px; color: #333;">
            <div style="text-align: center; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                <h1>Logbook Records</h1>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr>
                        ${visibleColumns.map(col => `<th style="border: 1px solid #ddd; padding: 8px; background: #f2f2f2; text-align: left;">${col}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${items.value.map(item => `
                        <tr>
                            ${visibleColumns.map(col => {
                                const val = item[col] || '';
                                return `<td style="border: 1px solid #ddd; padding: 8px;">${typeof val === 'number' ? val.toLocaleString() : val}</td>`;
                            }).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div style="text-align: center; font-size: 12px; color: #777;">
                <p>This report is system generated. For any queries, please contact the administrator.</p>
            </div>
        </div>
    `;

    const element = document.createElement('div');
    element.innerHTML = htmlContent;

    html2pdf()
        .set({
            margin: 10,
            filename: `Logbook_Report_${currentDate}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        })
        .from(element)
        .save();
};

const data_id = ref(0);
const upload = ref('');
const setDataModal = (data) => {
    data_id.value=data.id,
    description.value = data.description,
    lesson.value= data.lesson_learnt,
    today.value = data.date,
    upload.value = data.upload
}



</script>

<style scoped>
 .mymodal{
  background-color: rgba(122, 122, 122, 0.653);
 }

     .progress {
    position: relative;
    height: 4px;
    display: block;
    width: 100%;
    background-color: rgb(4, 129, 174);
    overflow: hidden
}
.progress .determinate {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #26a69a;
    -webkit-transition: width .3s linear;
    transition: width .3s linear
}
.progress .indeterminate {
    background-color: #e7eef1;
}
.progress .indeterminate:before {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite
}
.progress .indeterminate:after {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    -webkit-animation-delay: 1.15s;
    animation-delay: 1.15s
}
@-webkit-keyframes indeterminate {
    0% {
        left: -35%;
        right: 100%
    }
    60% {
        left: 100%;
        right: -90%
    }
    100% {
        left: 100%;
        right: -90%
    }
}
@keyframes indeterminate {
    0% {
        left: -35%;
        right: 100%
    }
    60% {
        left: 100%;
        right: -90%
    }
    100% {
        left: 100%;
        right: -90%
    }
}
@-webkit-keyframes indeterminate-short {
    0% {
        left: -200%;
        right: 100%
    }
    60% {
        left: 107%;
        right: -8%
    }
    100% {
        left: 107%;
        right: -8%
    }
}
@keyframes indeterminate-short {
    0% {
        left: -200%;
        right: 100%
    }
    60% {
        left: 107%;
        right: -8%
    }
    100% {
        left: 107%;
        right: -8%
    }
}
</style> 
