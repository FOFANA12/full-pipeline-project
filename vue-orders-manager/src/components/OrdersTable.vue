<script setup>
import { formatCurrency } from "../utils/currency";

defineProps({
  orders: {
    type: Array,
    required: true,
  },
  getOrderTotal: {
    type: Function,
    required: true,
  },
});

defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="panel p-0 overflow-hidden">
    <div class="table-responsive">
      <table class="table align-middle mb-0">
        <thead>
          <tr>
            <th>Client</th>
            <th class="text-end">Items</th>
            <th class="text-end">Total</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td class="fw-medium">{{ order.customer }}</td>
            <td class="text-end">{{ order.items.length }}</td>
            <td class="text-end fw-semibold">
              {{ formatCurrency(getOrderTotal(order)) }}
            </td>
            <td class="text-end">
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary" type="button" @click="$emit('edit', order)">
                  Modifier
                </button>
                <button class="btn btn-outline-danger" type="button" @click="$emit('delete', order)">
                  Supprimer
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="orders.length === 0">
            <td class="text-center text-secondary py-5" colspan="4">
              Aucune commande pour le moment.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
