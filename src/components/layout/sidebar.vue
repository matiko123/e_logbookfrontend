<template>
    <!--  BEGIN SIDEBAR  -->
    <div class="sidebar-wrapper sidebar-theme">
        <nav ref="menu" id="sidebar">
            <div class="shadow-bottom"></div>

            <perfect-scrollbar class="list-unstyled menu-categories" tag="ul" :options="{ wheelSpeed: 0.5, swipeEasing: !0, minScrollbarLength: 40, maxScrollbarLength: 300, suppressScrollX: true }">
                <li v-if="user_permissions.includes('can_view_settings')" class="menu single-menu" >
                        <a href="javascript:;" class="dropdown-toggle" @click.prevent="toggleSubMenu('masters')">
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
                        <ul class="collapse submenu list-unstyled" :class="{ show: openSubMenu === 'masters' }">
                             <li><router-link to="/settings/assumptions" @click="toggleMobileMenu">Assumptions</router-link></li>                        
                                  <li><router-link to="/settings/competences" @click="toggleMobileMenu">Competences</router-link></li>
                            <li><router-link to="/settings/users" @click="toggleMobileMenu">Users</router-link></li>
                               <li><router-link to="/students/all"  @click="toggleMobileMenu">All Students</router-link></li>
                            <li><router-link to="/settings/permissions" @click="toggleMobileMenu">Permissions</router-link></li>
                            <li><router-link to="/settings/role-permissions" @click="toggleMobileMenu">Roles</router-link></li>                        
                        </ul>
                    </li>
                    <li  class="menu single-menu">
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
                    <li  class="menu single-menu">
                        <router-link to="/logbooks" class="dropdown-toggle autodroprown" @click="toggleMobileMenu">
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
                    <li  v-if="user_permissions.includes('can_view_students')" class="menu single-menu" @click="toggleMobileMenu">
                        <router-link to="/users/students" class="dropdown-toggle autodroprown">
                            <div class="">
                             <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
                                <span>{{ ('Students') }}</span>
                            </div>
                           
                        </router-link>                    
                    </li>   

                       <li  v-if="user_permissions.includes('can_view_supervisors')" class="menu single-menu" @click="toggleMobileMenu">
                        <router-link to="/users/supervisors" class="dropdown-toggle autodroprown">
                            <div class="">
                             <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
                                <span>{{ ('Supervisors') }}</span>
                            </div>
                           
                        </router-link>                    
                    </li>   
            </perfect-scrollbar>
        </nav>
    </div>
    <!--  END SIDEBAR  -->
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const user_role = ref('');
    const user = ref(null);
    const user_permissions = ref([]);
    const is_dataentry= ref(true);
    const menu_collapse = ref('dashboard');
    const openSubMenu = ref(null);

    const toggleSubMenu = (menu) => {
        openSubMenu.value = openSubMenu.value === menu ? null : menu;
    };

    onMounted(() => {
        const selector = document.querySelector('#sidebar a[href="' + window.location.pathname + '"]');
        if (selector) {
            const ul = selector.closest('ul.collapse');
            if (ul) {
                let ele = ul.closest('li.menu').querySelectorAll('.dropdown-toggle');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            } else {
                selector.click();
            }
        }
  
        setTimeout(() => {
      localStorage.removeItem("user");
      router.push('/');
    }, 1800000); //clear after 30 minutes
    
    });

    const toggleMobileMenu = () => {
        if (window.innerWidth < 991) {
            store.commit('toggleSideBar', !store.state.is_show_sidebar);
        }
    };

     const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    router.push('/');
  }
    if (storedUser) {
    user.value = JSON.parse(storedUser);
    user_role.value = user.value.role;
    user_permissions.value = user.value.permissions;
  }
</script>
