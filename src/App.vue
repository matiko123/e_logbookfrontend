<template>
    <div :class="[$store.state.layout_style, $store.state.menu_style]">
        <component v-bind:is="layout"></component>
    </div>
</template>
<script setup>
    import { computed,provide } from 'vue';
    import axios from 'axios';   
    import '@/assets/sass/app.scss';

    import { useMeta } from '@/composables/use-meta';
    import { useStore } from 'vuex';

    useMeta({ title: 'Sales Admin' });

    const store = useStore();

    const layout = computed(() => {
        return store.getters.layout;
    });
const showMessage = (msg = '', type = 'success') => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};

const showError =  (msg = '', type = 'error') => {

const toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
}

const showSuccessbox = (title = '',msg = '',icon = 'success') => {
    window.Swal.fire({
        icon: icon,
        title: title,
        text: msg,
        padding: '2em',
      });
    }



    const showErrorBox = (msg = '', type = 'error') => {
    window.Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
        padding: '2em',
      });
    }

        const showDeleteConfirmation = (title = '',msg = '') => {
     window.Swal.fire({
      title: title,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  }

// table printout starts
const printReport = (dataArray, reportTitle = "Report") => {
    const formatCell = (value, key) => {
        if (typeof value === 'number') return `<span class="number">${value}</span>`;
        return value !== null && value !== undefined ? value : '';
    };

    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        console.error("No data provided or empty array!");
        return;
    }

    const excludeKeys = ['actions', 'status'];
    const headers = Object.keys(dataArray[0]).filter(key => !excludeKeys.includes(key));
    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
        <html>
            <head>
                <title>Print ${reportTitle}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 10px; }
                    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
                    th, td { 
                        border: 1px solid #ccc; 
                        padding: 4px; 
                        text-align: left; 
                        font-size: 15px; 
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    th { background-color: #f1f1f1; }
                    td.number { text-align: right; }
                    @media print { body { zoom: 90%; } }
                </style>
            </head>
            <body>
                <h2>${reportTitle}</h2>
                <div style="overflow-x:auto;">
                    <table>
                        <thead><tr>${headers.map(key => `<th>${key}</th>`).join('')}</tr></thead>
                        <tbody>${dataArray.map(item => `
                            <tr>${headers.map(key => `<td>${formatCell(item[key], key)}</td>`).join('')}</tr>
                        `).join('')}</tbody>
                    </table>
                </div>
                <p>Generated on: ${new Date().toLocaleString()}</p>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
};


const now = new Date();
const nowDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
const nowTime = now.toTimeString().slice(0, 8); // HH:MM:SS


// table printout ends
const recordLog = async (user_id,user_name,action,type,activity_id,date,quantity) => {
      try {
        const formData = {
          user_id: user_id,
          user_name: user_name,
          action: action,
          type: type,
          activity_id: activity_id,
          date: date ?? nowDate,
          time: nowTime,
          quantity:quantity
        };
        
        // Send POST request to create new activity
        const response = await axios.post('https://construction.trustdigital.space/api/v1/activity-logs', formData);
        
        if (response.data && response.data.status === "success") {
            console.log('log:OK');
        } else {
           console.log('log:FAIL');
        }
      } catch (error) {
        console.log('log:Error',error);
      } 
    };
// recording log starts

// recording log ends 

// notification starts
  const whatsappNotification = async (phone,sender,action,message) => {
  const recipientPhone = phone;
  const endpoint = 'https://graph.facebook.com/v22.0/721816217672551/messages';
  const accessToken = 'EAAXZAN9ZAW4VoBOZBhohedZA7pfKZBfzMghywTumPW7yFY0ZAI7u6Kh9DFtai4usEnmKsOnMZBYisZAQ0ojZBtEpDC72XXNyf6qFmtFtTCX61hv3I2eZCdZAevM9ahsDXGcIhT8stZAoTGstgOsujK4G1pxcSGqwFxiucZBcLr8HUoRxTLlB0IdVlLLlRGQ7n831T93WGUQZDZD';

  const requestData = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": recipientPhone,
    "type": "template",
    "template": {
        "name": "notifier",
        "language": {
            "code": "en"
        },
        "components": [
            {
                "type": "body",
                "parameters": [
                    {
                        "type": "text",
                        "text": sender // Replaced "Engineer" with sender variable
                    },
                    {
                        "type": "text",
                        "text": action // Replaced first "check" with action variable
                    },

                     {
                        "type": "text",
                        "text": message // Replaced first "check" with action variable
                    },
                ]
            }
        ]
    }
};
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    const data = await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};
// notification ends

// Provide globally
provide('showMessage', showMessage);
provide('showError', showError);
provide('printReport', printReport);
provide('recordLog', recordLog);
// whatsapp notification injection
provide('whatsappNotification',whatsappNotification);

// ngugo's injections
provide('DeleteConfirmationbox', showDeleteConfirmation);
provide('SuccessBox', showSuccessbox);
provide('ErrorBox', showErrorBox);


// loading indicator starts
const loadingIndicator = () => {
  return `
  <style>
    .progress {
      position: relative;
      height: 4px;
      display: block;
      width: 100%;
      background-color: rgb(5, 197, 255);;
      overflow: hidden;
    }
    .progress .determinate {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background-color: #26a69a;
      transition: width .3s linear;
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
      animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }
    .progress .indeterminate:after {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      animation-delay: 1.15s;
    }
    @keyframes indeterminate {
      0% { left: -35%; right: 100%; }
      60% { left: 100%; right: -90%; }
      100% { left: 100%; right: -90%; }
    }
    @keyframes indeterminate-short {
      0% { left: -200%; right: 100%; }
      60% { left: 107%; right: -8%; }
      100% { left: 107%; right: -8%; }
    }
  </style>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
    </div>
  </div>`;
};

provide('loadingIndicator', loadingIndicator);
// loading indicator ends
</script>
<script>
    // layouts
    import appLayout from './layouts/app-layout.vue';
    import authLayout from './layouts/auth-layout.vue';

    export default {
        components: {
            app: appLayout,
            auth: authLayout,
        },
    };

    
</script>
