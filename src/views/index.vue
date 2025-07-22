<template>
    <div class="layout-px-spacing dash_2">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Sales</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

        </teleport>

        <div class="row layout-top-spacing">
   
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
        
      

         

       
        </div>
    </div>
</template>
<script setup>
    import '@/assets/sass/widgets/widgets.scss';
    import { computed, ref, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import ApexChart from 'vue3-apexcharts';
    import axios from 'axios';
    import { useMeta } from '@/composables/use-meta';
    
    useMeta({ title: 'Widgets' });
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL
    });
    const store = useStore();

    // Make options a ref instead of computed
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
            tickAmount: 6,
            labels: {
                formatter: function(val) {
                    return Math.round(val); // Rounds to nearest integer
                }
            },
            forceNiceScale: true
        },
        fill: {
            type: 'gradient',
            gradient: { shade: is_dark ? 'dark' : 'light', type: 'vertical', shadeIntensity: 0.3, inverseColors: false, opacityFrom: 1, opacityTo: 0.8, stops: [0, 100] },
        },
        tooltip: {
            theme: is_dark ? 'dark' : 'light',
            y: {
                formatter: function (val) {
                    return val; // Keep original value in tooltip
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
        unique_visitor_options.value = initChartOptions();
        getAnalysis();
    });
</script>
