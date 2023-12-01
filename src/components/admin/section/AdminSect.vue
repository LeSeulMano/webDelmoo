<template>
    <AdminHeader :selected="1"></AdminHeader>
    <AdminUser :adminUser="false"></AdminUser>
  <AdminCours :adminUser="true"></AdminCours>
</template>

<script>
import AdminHeader from "@/components/admin/header/AdminHeader.vue";
import AdminUser from "@/components/admin/users/AdminUser.vue";
import AdminCours from "@/components/admin/cours/AdminCours.vue";
export default {
  components: {
    AdminHeader,
    AdminUser,
    AdminCours
  }
}
</script>

<style lang="scss">


</style>