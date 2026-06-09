<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useOrdersStore } from "../stores/orders";
import { formatCurrency } from "../utils/currency";
import OrderItemsEditor from "./OrderItemsEditor.vue";

const props = defineProps({
  orderId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["cancel", "saved"]);
const ordersStore = useOrdersStore();
const errors = ref([]);
const form = reactive({
  customer: "",
  items: [],
});

const pageTitle = computed(() => {
  return props.orderId ? "Modifier la commande" : "Nouvelle commande";
});

const formTotal = computed(() => {
  return form.items.reduce((sum, item) => sum + item.qty * item.price, 0);
});

const fillForm = () => {
  const order = props.orderId ? ordersStore.getOrderById(props.orderId) : null;

  form.customer = order?.customer ?? "";
  form.items = order?.items.map((item) => ({ ...item })) ?? [];
  errors.value = [];
};

const validateForm = () => {
  const nextErrors = [];

  if (!form.customer.trim()) {
    nextErrors.push("Le client est obligatoire.");
  }

  if (form.items.length === 0) {
    nextErrors.push("Ajoute au moins un item.");
  }

  errors.value = nextErrors;
  return nextErrors.length === 0;
};

const saveOrder = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    await ordersStore.saveOrder({
      id: props.orderId,
      customer: form.customer.trim(),
      items: form.items.map((item) => ({ ...item })),
    });

    emit("saved");
  } catch {
    errors.value = [ordersStore.error || "Impossible d'enregistrer la commande."];
  }
};

watch(() => props.orderId, fillForm, { immediate: true });
</script>

<template>
  <section class="container py-4 py-lg-5">
    <div class="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center mb-4">
      <div>
        <h1 class="h3 mb-1">{{ pageTitle }}</h1>
        <p class="text-secondary mb-0">
          Renseigne le client, puis ajoute les items.
        </p>
      </div>
      <button class="btn btn-outline-secondary" type="button" @click="$emit('cancel')">
        Retour
      </button>
    </div>

    <div v-if="errors.length" class="alert alert-danger">
      <ul class="mb-0">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>

    <div class="row g-4">
      <div class="col-lg-5">
        <div class="panel">
          <h2 class="h5 mb-3">Commande</h2>
          <label class="form-label" for="customer">Client</label>
          <input
            id="customer"
            v-model="form.customer"
            class="form-control"
            type="text"
            placeholder="Nom du client"
          >
        </div>
      </div>

      <div class="col-lg-7">
        <OrderItemsEditor v-model="form.items" />

        <div class="panel mt-4">
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-semibold">Total commande</span>
            <strong>{{ formatCurrency(formTotal) }}</strong>
          </div>
        </div>

        <div class="d-flex justify-content-end gap-2 mt-4">
          <button class="btn btn-outline-secondary" type="button" @click="$emit('cancel')">
            Annuler
          </button>
          <button class="btn btn-primary" type="button" :disabled="ordersStore.saving" @click="saveOrder">
            {{ ordersStore.saving ? "Enregistrement..." : "Enregistrer" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
