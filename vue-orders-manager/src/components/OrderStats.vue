<script setup>
import { formatCurrency } from "../utils/currency";

defineProps({
  orderCount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="row g-3 mb-4">
    <div class="col-sm-6 col-lg-3">
      <div class="stat">
        <span class="text-secondary">Commandes</span>
        <strong>{{ orderCount }}</strong>
      </div>
    </div>
    <div class="col-sm-6 col-lg-3">
      <div class="stat">
        <span class="text-secondary">Total</span>
        <strong>{{ formatCurrency(totalAmount) }}</strong>
      </div>
    </div>
  </div>
</template>
