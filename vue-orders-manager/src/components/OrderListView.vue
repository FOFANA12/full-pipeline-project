<script setup>
import { onMounted } from "vue";
import { useOrdersStore } from "../stores/orders";
import OrderStats from "./OrderStats.vue";
import OrdersTable from "./OrdersTable.vue";

const ordersStore = useOrdersStore();

defineEmits(["create", "edit"]);

const confirmDelete = (order) => {
  if (window.confirm(`Supprimer la commande de ${order.customer} ?`)) {
    ordersStore.deleteOrder(order.id);
  }
};

onMounted(() => {
  ordersStore.fetchOrders();
});
</script>

<template>
  <section class="container py-4 py-lg-5">
    <div class="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center mb-4">
      <div>
        <h1 class="h3 mb-1">Commandes</h1>
        <p class="text-secondary mb-0">
          Commandes chargees depuis l'API.
        </p>
      </div>
      <button class="btn btn-primary" type="button" @click="$emit('create')">
        Nouvelle commande
      </button>
    </div>

    <OrderStats
      :order-count="ordersStore.orderCount"
      :total-amount="ordersStore.totalAmount"
    />

    <div v-if="ordersStore.error" class="alert alert-danger">
      {{ ordersStore.error }}
    </div>

    <div v-if="ordersStore.loading" class="alert alert-info">
      Chargement des commandes...
    </div>

    <OrdersTable
      v-else
      :orders="ordersStore.orders"
      :get-order-total="ordersStore.getOrderTotal"
      @edit="$emit('edit', $event)"
      @delete="confirmDelete"
    />
  </section>
</template>
