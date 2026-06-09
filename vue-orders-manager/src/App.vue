<script setup>
import { ref } from "vue";
import AppNavbar from "./components/AppNavbar.vue";
import OrderFormView from "./components/OrderFormView.vue";
import OrderListView from "./components/OrderListView.vue";

const currentPage = ref("list");
const editingOrderId = ref(null);

const showList = () => {
  editingOrderId.value = null;
  currentPage.value = "list";
};

const showCreateForm = () => {
  editingOrderId.value = null;
  currentPage.value = "form";
};

const showEditForm = (order) => {
  editingOrderId.value = order.id;
  currentPage.value = "form";
};
</script>

<template>
  <main class="app-shell">
    <AppNavbar @home="showList" />

    <OrderListView
      v-if="currentPage === 'list'"
      @create="showCreateForm"
      @edit="showEditForm"
    />

    <OrderFormView
      v-else
      :order-id="editingOrderId"
      @cancel="showList"
      @saved="showList"
    />
  </main>
</template>
