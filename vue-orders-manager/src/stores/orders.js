import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { api } from "../services/api";

export const useOrdersStore = defineStore("orders", () => {
  const orders = ref([]);
  const loading = ref(false);
  const saving = ref(false);
  const error = ref("");

  const orderCount = computed(() => orders.value.length);
  const totalAmount = computed(() => {
    return orders.value.reduce((sum, order) => sum + getOrderTotal(order), 0);
  });

  function normalizeOrder(order) {
    return {
      ...order,
      total: Number(order.total ?? 0),
      items: (order.items ?? []).map((item) => ({
        ...item,
        qty: Number(item.qty ?? 0),
        price: Number(item.price ?? 0),
      })),
    };
  }

  function toCreatePayload(order) {
    return {
      client: order.customer,
      items: order.items.map((item) => ({
        article: item.article,
        qty: Number(item.qty),
        price: Number(item.price),
      })),
    };
  }

  async function fetchOrders() {
    loading.value = true;
    error.value = "";

    try {
      const response = await api.get("/commandes");
      orders.value = (response.data.commandes ?? []).map(normalizeOrder);
    } catch (err) {
      error.value = err.response?.data?.message ?? "Impossible de charger les commandes.";
    } finally {
      loading.value = false;
    }
  }

  function getOrderById(id) {
    return orders.value.find((order) => order.id === id);
  }

  function getOrderTotal(order) {
    return order.items.reduce((sum, item) => sum + Number(item.qty) * Number(item.price), 0);
  }

  async function saveOrder(payload) {
    saving.value = true;
    error.value = "";

    if (payload.id) {
      orders.value = orders.value.map((order) => {
        return order.id === payload.id ? payload : order;
      });
      saving.value = false;
      return;
    }

    try {
      const response = await api.post("/commandes", toCreatePayload(payload));
      orders.value = [normalizeOrder(response.data.commande), ...orders.value];
    } catch (err) {
      error.value = err.response?.data?.message ?? "Impossible d'enregistrer la commande.";
      throw err;
    } finally {
      saving.value = false;
    }
  }

  function deleteOrder(id) {
    orders.value = orders.value.filter((order) => order.id !== id);
  }

  return {
    orders,
    loading,
    saving,
    error,
    orderCount,
    totalAmount,
    fetchOrders,
    getOrderById,
    getOrderTotal,
    saveOrder,
    deleteOrder,
  };
});
