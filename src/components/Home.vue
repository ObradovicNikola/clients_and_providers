<template>
  <div>
    <p class="notification is-danger my-4" v-if="error">{{ error }}</p>
    <table class="table is-bordered">
      <thead>
        <tr>
          <th colspan="99" class="has-background-info">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <p class="has-text-weight-bold has-text-link">Clients</p>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <button
                    class="button"
                    @click="
                      () => {
                        error = null;
                        showModal = true;
                      }
                    "
                  >
                    New Client
                  </button>
                </div>
              </div>
            </div>
          </th>
        </tr>
        <tr class="has-background-grey-lighter">
          <th class="data"><strong>Name</strong></th>
          <th class="data"><strong>Email</strong></th>
          <th class="data"><strong>Phone</strong></th>
          <th class="data"><strong>Providers</strong></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td class="data">{{ client.name }}</td>
          <td class="data">{{ client.email }}</td>
          <td class="data">{{ client.phone }}</td>
          <td class="data is-size-7">
            <div class="is-flex">
              <p
                v-for="(provider, index) in client.providers"
                :key="provider.id"
              >
                {{ mappedProviders.get(provider.id) }}
                <span v-if="index < client.providers.length - 1" class="mr-1"
                  >,</span
                >
              </p>
            </div>
          </td>
          <td>
            <span
              class="table-button has-text-link"
              @click="
                () => {
                  isEdit = true;
                  error = null;
                  editedClient = client;
                  showModal = true;
                }
              "
              >Edit</span
            >
          </td>
          <td>
            <span
              class="table-button has-text-link"
              @click="deleteClient(client._id)"
            >
              Delete
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <ClientModal
      v-if="showModal"
      @close="
        () => {
          getClients();
          isEdit = false;
          editedClient = null;
          showModal = false;
        }
      "
      @refreshData="refreshData"
      @setErrorMessage="setErrorMessage"
      :isEdit="isEdit"
      :providers="providers"
      :editedClient="editedClient"
    />
  </div>
</template>

<script>
import ApiService from "../services/index";
import ClientModal from "./ClientModal.vue";

const components = { ClientModal };
function data() {
  return {
    clients: [],
    providers: [],
    mappedProviders: new Map(),
    error: "",
    showModal: false,
    isEdit: false,
    editedClient: null,
  };
}

const methods = {
  async deleteClient(id) {
    await ApiService.deleteClient(id);
    this.clients = await ApiService.getClients();
  },

  async getClients() {
    this.clients = await ApiService.getClients();
  },

  async getProviders() {
    this.providers = await ApiService.getProviders();

    this.mappedProviders = new Map();
    this.providers.forEach((element) => {
      this.mappedProviders.set(element._id, element.name);
    });
  },

  async refreshData() {
    try {
      await this.getClients();
      await this.getProviders();
    } catch (err) {
      this.error = err;
    }
  },

  setErrorMessage(err) {
    this.error = err;
  },
};

async function created() {
  await this.refreshData();
}

export default {
  name: "HomeComponent",
  props: {
    msg: String,
  },
  components,
  data,
  methods,
  created,
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.notification
  width: 500px
  max-width: 90%
  margin: auto

$tableBorderColor: #6d6d6d

.table
  margin: auto
  border-color: $tableBorderColor !important
  tr
    td, th
      vertical-align: middle
      border-color: $tableBorderColor !important
      &.data
        text-align: left
        min-width: 150px
  .table-button
    text-decoration: underline
    cursor: pointer
</style>
