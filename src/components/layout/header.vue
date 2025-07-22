<template>
    <div>
        <!--  BEGIN NAVBAR  -->
        <div class="header-container fixed-top">
            <header class="header  navbar navbar-expand-sm bg-white navbar-light" >
                <div class="navbar-item flex-row ms-md-0 ms-auto">
                    <ul class="navbar-item theme-brand flex-row text-center">
                        <li class="nav-item theme-logo">
                            <router-link to="/logbook">
                              <h4 class="fw-bolder mobile-hidden">FIELD LOGBOOK </h4>  
                                <!-- <img :src="require(`@/assets/images/logo.png`)" class="navbar-logo" alt="logo" style="width: 150px; height: auto;" /> -->
                            </router-link>
                        </li>
                    </ul>
                </div>
             
                <div class="d-none vertical-menu">
                    <a href="javascript:void(0);" class="sidebarCollapse" data-placement="bottom" @click="$store.commit('toggleSideBar', !$store.state.is_show_sidebar)">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-menu"
                        >
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </a>
                </div>


                <!-- <div  class="navbar-item flex-row ms-md-4 ms-auto">
                    <ul class="navbar-item flex-row ms-md-0 ms-auto">
                        <li class="nav-item align-self-center search-animated" :class="{ 'show-search': $store.state.is_show_search }">
                            <svg
                                @click="$store.commit('toggleSearch', !$store.state.is_show_search)"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-search toggle-search"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <form class="form-inline search-full form-inline search" :class="{ 'input-focused': $store.state.is_show_search }">
                                <div class="search-bar">
                                    <input type="text" class="form-control search-form-control ms-lg-auto" placeholder="Search..." />
                                </div>
                            </form>
                        </li>
                    </ul>
                </div> -->

                <div class="navbar-item flex-row ms-md-auto ">
                   
<!-- notification starts -->
<!--  
                    <div class="dropdown nav-item notification-dropdown btn-group">
                        <a href="javascript:;" id="ddlnotify" data-bs-toggle="dropdown" aria-expanded="false" class="btn dropdown-toggle btn-icon-only nav-link">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-bell text-danger"
                            >
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            <span class="badge badge-success"></span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="ddlnotify">
                            <li role="presentation">
                                <a href="javascript:;" class="dropdown-item">
                                    <div class="media server-log">
                                        <div class="media-aside align-self-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="feather feather-server"
                                            >
                                                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                                                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                                                <line x1="6" y1="6" x2="6" y2="6"></line>
                                                <line x1="6" y1="18" x2="6" y2="18"></line>
                                            </svg>
                                        </div>
                                        <div class="media-body">
                                            <div class="data-info">
                                                <h6 class="">Server Rebooted</h6>
                                                <p class="">45 min ago</p>
                                            </div>

                                            <div class="icon-status">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-x"
                                                >
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li role="presentation"><hr role="separator" aria-orientation="horizontal" size="0" class="dropdown-divider" /></li>
                  
                            <li role="presentation"><hr role="separator" aria-orientation="horizontal" size="0" class="dropdown-divider" /></li>
                            <li role="presentation">
                                <a href="javascript:;" class="dropdown-item">
                                    <div class="media file-upload">
                                        <div class="media-aside align-self-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="feather feather-file-text"
                                            >
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                <polyline points="14 2 14 8 20 8"></polyline>
                                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                                <polyline points="10 9 9 9 8 9"></polyline>
                                            </svg>
                                        </div>
                                        <div class="media-body">
                                            <div class="data-info">
                                                <h6>Kelly Portfolio.pdf</h6>
                                                <p>670 kb</p>
                                            </div>
                                            <div class="icon-status">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-check"
                                                >
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        </div></div
                                ></a>
                            </li>
                        </ul>
                    </div> -->
 <!-- notification ends -->

                    <div class="dropdown nav-item user-profile-dropdown btn-group">
                        <a  href="javascript:;" id="ddluser" data-bs-toggle="dropdown" aria-expanded="false" class="btn dropdown-toggle btn-icon-only user nav-link">
                         
                        <strong><span class="nav-link text-dark " style="font-size: 1em; font-weight: bold;">{{ user ? user.name : "Student" }}</span></strong>
   
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="ddluser">
                            <li role="presentation">
                                <router-link to="/user/profile" class="dropdown-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-user"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    Profile
                                </router-link>
                            </li>
                            <li role="presentation">
                                <a href="javascript:void(0);"  @click="signOut" class="dropdown-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-log-out"
                                    >
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    Sign Out 
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
        <!--  END NAVBAR  -->
        <!--  BEGIN NAVBAR  -->
        <div class="sub-header-container">
            <header class="header navbar navbar-expand-sm">
                <a href="javascript:void(0);" class="sidebarCollapse" data-placement="bottom" @click="$store.commit('toggleSideBar', !$store.state.is_show_sidebar)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-menu"
                    >
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </a>

                <!-- Portal vue/Teleport for Breadcrumb -->
                <div id="breadcrumb" class="vue-portal-target"></div>
            </header>
        </div>
        <!--  END NAVBAR  -->
        <!--  BEGIN TOPBAR  -->
        <div class="topbar-nav header navbar" role="banner">
            <nav class="topbar">
                <ul class="list-unstyled menu-categories" id="topAccordion">

                    <li v-if="user_permissions.includes('can_view_settings')" class="menu single-menu">
                        <a href="javascript:;" class="dropdown-toggle">
                            <div class="">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-cpu"
                                >
                                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                                    <rect x="9" y="9" width="6" height="6"></rect>
                                    <line x1="9" y1="1" x2="9" y2="4"></line>
                                    <line x1="15" y1="1" x2="15" y2="4"></line>
                                    <line x1="9" y1="20" x2="9" y2="23"></line>
                                    <line x1="15" y1="20" x2="15" y2="23"></line>
                                    <line x1="20" y1="9" x2="23" y2="9"></line>
                                    <line x1="20" y1="14" x2="23" y2="14"></line>
                                    <line x1="1" y1="9" x2="4" y2="9"></line>
                                    <line x1="1" y1="14" x2="4" y2="14"></line>
                                </svg>
                                <span>{{ ('Settings') }}</span>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-chevron-down"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <ul class="collapse submenu list-unstyled">
                                                         <li><router-link to="/settings/assumptions" @click="toggleMobileMenu">Assumptions</router-link></li>    
                            <li><router-link to="/settings/competences">Competences</router-link></li>
                            <li><router-link to="/settings/users">Users</router-link></li>
                            <li><router-link to="/students/all">All Students</router-link></li>
                            <!-- <li><router-link to="/settings/roles">Roles</router-link></li> -->
                            <li><router-link to="/settings/permissions">Permissions</router-link></li>
                            <li><router-link to="/settings/role-permissions">Roles</router-link></li>                        
                        </ul>
                    </li>  
                    <li  v-if="user_permissions.includes('can_view_weeks')"  class="menu single-menu">
                        <router-link to="/weeks" class="dropdown-toggle autodroprown">
                            <div class="">
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-day" viewBox="0 0 16 16">
  <path d="M4.684 11.523v-2.3h2.261v-.61H4.684V6.801h2.464v-.61H4v5.332zm3.296 0h.676V8.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a2 2 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43m.094 5.093h.672V7.418h-.672z"/>
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>
                                <span>{{ ('Weeks') }}</span>
                            </div>
                           
                        </router-link>                    
                    </li>  
                    <li  v-if="user_permissions.includes('can_view_logbooks')" class="menu single-menu">
                        <router-link to="/logbooks" class="dropdown-toggle autodroprown">
                            <div class="">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-briefcase"
                                >
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                    <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"></path>
                                </svg>
                                <span>{{ ('Logbook') }}</span>
                            </div>
                           
                        </router-link>                    
                    </li>        
                    <li  v-if="user_permissions.includes('can_view_students')" class="menu single-menu">
                        <router-link to="/users/students" class="dropdown-toggle autodroprown">
                            <div class="">
                             <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
                                <span>{{ ('Students') }}</span>
                            </div>
                           
                        </router-link>                    
                    </li>   
                     <li  v-if="user_permissions.includes('can_view_supervisors')" class="menu single-menu">
                        <router-link to="/users/supervisors" class="dropdown-toggle autodroprown">
                            <div class="">
                             <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
                                <span>{{ ('Supervisors') }}</span>
                            </div>
                           
                        </router-link>                    
                    </li>   
                </ul>
            </nav>
        </div>
        <!--  END TOPBAR  -->
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    const  is_admin=ref(false);
    const  is_dataentry=ref(false);
    const router = useRouter();


    const signOut = () => {
        router.push('/'); // Redirect to login page
    };


const user = ref(null);
const user_role = ref('');
const user_permissions = ref([]);



onMounted(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    router.push('/');
  } else {
    user.value = JSON.parse(storedUser);
    user_role.value = user.value.role;
    user_permissions.value = user.value.permissions;
    
    // Clear localStorage after 3 minutes (180000 ms)
    setTimeout(() => {
      localStorage.removeItem("user");
      router.push('/');
    }, 1800000); //clear after 30 minutes
  }


  //180000 3 minutes
  //240000 4 mins

  toggleMode();
});


    const toggleMode = (mode) => {
        window.$appSetting.toggleMode(mode);
    };

    


</script>
<style>
@media (max-width: 768px) {
  .mobile-hidden {
    display: none;
  }
}

</style>