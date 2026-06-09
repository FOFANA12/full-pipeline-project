<script setup>
import { reactive } from "vue";
import { formatCurrency } from "../utils/currency";

const items = defineModel({
  type: Array,
  required: true,
});

const itemForm = reactive({
  article: "",
  qty: 1,
  price: 0,
});

const resetItemForm = () => {
  itemForm.article = "";
  itemForm.qty = 1;
  itemForm.price = 0;
};

const addItem = () => {
  const article = itemForm.article.trim();
  const qty = Number(itemForm.qty);
  const price = Number(itemForm.price);

  if (!article || qty < 1 || price < 0) {
    return;
  }

  items.value.push({
    id: Date.now(),
    article,
    qty,
    price,
  });
  resetItemForm();
};

const removeItem = (itemId) => {
  items.value = items.value.filter((item) => item.id !== itemId);
};
</script>

<template>
  <div class="panel mb-4">
    <h2 class="h5 mb-3">Ajouter un item</h2>

    <div class="row g-3 align-items-end">
      <div class="col-md-5">
        <label class="form-label" for="article">Article</label>
        <input
          id="article"
          v-model="itemForm.article"
          class="form-control"
          type="text"
          placeholder="Nom de l'article"
        >
      </div>
      <div class="col-6 col-md-2">
        <label class="form-label" for="qty">Quantite</label>
        <input id="qty" v-model.number="itemForm.qty" class="form-control" type="number" min="1">
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label" for="price">Prix</label>
        <input id="price" v-model.number="itemForm.price" class="form-control" type="number" min="0" step="0.01">
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-primary w-100" type="button" @click="addItem">
          Ajouter
        </button>
      </div>
    </div>
  </div>

  <div class="panel p-0 overflow-hidden">
    <div class="table-responsive">
      <table class="table align-middle mb-0">
        <thead>
          <tr>
            <th>Article</th>
            <th class="text-end">Quantite</th>
            <th class="text-end">Prix</th>
            <th class="text-end">Total</th>
            <th class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.article }}</td>
            <td class="text-end">
              <input
                v-model.number="item.qty"
                class="form-control form-control-sm text-end item-number-input ms-auto"
                type="number"
                min="1"
              >
            </td>
            <td class="text-end">
              <input
                v-model.number="item.price"
                class="form-control form-control-sm text-end item-number-input ms-auto"
                type="number"
                min="0"
                step="0.01"
              >
            </td>
            <td class="text-end fw-semibold">
              {{ formatCurrency(item.qty * item.price) }}
            </td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-danger" type="button" @click="removeItem(item.id)">
                Retirer
              </button>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td class="text-center text-secondary py-4" colspan="5">
              Aucun item ajoute.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
