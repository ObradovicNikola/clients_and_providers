<template>
  <div>
    <div class="modal is-active">
      <div class="modal-background" @click="$emit('close')"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="has-text-weight-bold has-text-link is-size-4">
            <span v-if="isEdit === true">Edit Client</span>
            <span v-else>New Client</span>
          </p>
          <!-- <button class="delete" aria-label="close" @click="$emit('close')">
            X
          </button> -->
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="content">
            <div class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <span>Name:</span>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <input
                    class="input"
                    type="text"
                    placeholder="John"
                    v-model="frmData.name"
                  />
                </div>
              </div>
            </div>

            <div class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <span>Email:</span>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <input
                    class="input"
                    type="email"
                    placeholder="john@example.com"
                    v-model="frmData.email"
                  />
                </div>
              </div>
            </div>

            <div class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <span>Phone:</span>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <input
                    class="input"
                    type="tel"
                    placeholder="123-45-678"
                    pattern="[0-9]{1,10}-*[0-9]{1,10}-*[0-9]{1,10}"
                    v-model="frmData.phone"
                  />
                </div>
              </div>
            </div>

            <div class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <span>Providers:</span>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item" style="flex-grow: 2">
                  <input
                    class="input"
                    type="text"
                    placeholder=""
                    v-model="providerName"
                  />
                </div>
                <div class="level-item">
                  <button
                    class="button is-size-7"
                    style="line-height: 0px;"
                    @click="createProvider()"
                  >
                    Add Provider
                  </button>
                </div>
              </div>
            </div>

            <div class="level is-mobile">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item is-flex-grow-2">
                  <ul class="providers ">
                    <li
                      class="provider"
                      v-for="provider in providers"
                      :key="provider._id"
                    >
                      <div class="level is-mobile">
                        <div class="level-item is-flex-grow-0">
                          <label class="checkbox is-flex">
                            <input
                              type="checkbox"
                              :value="provider._id"
                              v-model="frmData.checkedProviders"
                            />
                          </label>
                        </div>
                        <div
                          class="level-item is-flex-grow-1 is-justify-content-flex-start"
                        >
                          <input
                            v-if="
                              editedProvider &&
                                editedProvider._id === provider._id
                            "
                            type="text"
                            v-model="provider.name"
                            @blur="doneEdit(provider)"
                            @keyup.enter="doneEdit(provider)"
                          />
                          <span v-else>
                            {{ provider.name }}
                          </span>
                        </div>
                        <div class="level-item is-flex-grow-0">
                          <span class="action">
                            <span
                              v-if="
                                editedProvider &&
                                  editedProvider._id === provider._id
                              "
                              @click="doneEdit(provider)"
                              >Save</span
                            >
                            <span
                              v-else
                              @click="
                                () => {
                                  editProvider(provider);
                                }
                              "
                            >
                              <EditIcon />
                            </span>
                          </span>
                        </div>
                        <div class="level-item is-flex-grow-0">
                          <span
                            class="action"
                            @click="deleteProvider(provider._id)"
                          >
                            <TrashIcon />
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="level-item"></div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="level is-mobile">
            <div class="level-left">
              <div class="level-item" v-if="isEdit === true">
                <button
                  class="button is-danger"
                  @click="
                    () => {
                      deleteClient(editedClient._id);
                      $emit('close');
                    }
                  "
                >
                  Delete Client
                </button>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button class="button" @click="$emit('close')">Cancel</button>
              </div>
              <div class="level-item">
                <button
                  v-if="isEdit === true"
                  class="button"
                  @click="updateClient()"
                >
                  Save Client
                </button>
                <button v-else class="button" @click="createClient()">
                  Add Client
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/index";
import EditIcon from "./icons/EditIcon.vue";
import TrashIcon from "./icons/TrashIcon.vue";
const name = "ClientModal";

const props = {
  isEdit: {
    type: Boolean,
    default: false,
  },
  providers: {
    type: Array,
    default: [],
  },
  editedClient: {
    type: Object,
    default: null,
  },
};

function data() {
  return {
    isActive: false,
    providerName: null,
    editedProvider: null,
    frmData: {
      name: null,
      email: null,
      phone: null,
      checkedProviders: [],
    },
  };
}

const components = { EditIcon, TrashIcon };

const methods = {
  async createProvider() {
    this.providerName = this.providerName.trim();
    try {
      if (this.providerName !== "")
        await ApiService.createProvider({ name: this.providerName });
    } catch (err) {
      console.log(err);
    }
    this.$emit("refreshData");
    this.providerName = "";
  },

  async deleteProvider(id) {
    try {
      await ApiService.deleteProvider(id);

      // remove provider from frmData.checkedProviders
      this.frmData.checkedProviders = this.frmData.checkedProviders.filter(
        (p) => {
          return p !== id;
        }
      );
    } catch (err) {
      console.log(err);
    }
    this.$emit("refreshData");
  },

  async updateProvider(id, provider) {
    try {
      await ApiService.updateProvider(id, provider);
    } catch (err) {
      console.log(err);
    }
    this.$emit("refreshData");
  },

  editProvider(provider) {
    this.editedProvider = provider;
  },

  async doneEdit(provider) {
    if (!this.editedProvider) {
      return;
    }
    this.editedProvider = null;
    provider.name = provider.name.trim();
    try {
      if (!provider.name) {
        await this.deleteProvider(provider._id);
      } else {
        await this.updateProvider(provider._id, { name: provider.name });
      }
    } catch (err) {
      console.log(err);
    }
    this.$emit("refreshData");
  },

  clearFormData() {
    this.frmData.name = null;
    this.frmData.email = null;
    this.frmData.phone = null;
    this.frmData.checkedProviders = [];
    this.frmData.providers = [];
  },

  async createClient() {
    this.frmData.providers = this.frmData.checkedProviders.map((id) => {
      return { id };
    });

    try {
      await ApiService.createClient({ ...this.frmData });
    } catch (err) {
      console.log(err);
      this.$emit("setErrorMessage", err);
    }

    this.clearFormData();
    this.$emit("close");
  },

  async deleteClient(id) {
    await ApiService.deleteClient(id);
  },

  async updateClient() {
    this.frmData.providers = this.frmData.checkedProviders.map((id) => {
      return { id };
    });

    try {
      await ApiService.updateClient(this.editedClient._id, {
        name: this.frmData.name,
        email: this.frmData.email,
        phone: this.frmData.phone,
        providers: this.frmData.providers,
      });
    } catch (err) {
      console.log(err);
      this.$emit("setErrorMessage", err);
    }

    this.clearFormData();
    this.$emit("close");
  },
};

function created() {
  if (this.isEdit && this.editedClient) {
    Object.keys(this.editedClient).forEach((key) => {
      if (key !== "providers") this.frmData[key] = this.editedClient[key];
    });

    this.editedClient.providers.forEach((provider) => {
      this.frmData.checkedProviders.push(provider.id);
    });
  }
}

export default {
  name,
  props,
  data,
  components,
  methods,
  created,
};
</script>

<style scoped lang="sass">
.modal-card-body
  overflow: hidden
  overflow-y: auto
  padding-top: 0rem
  padding-bottom: 0rem

  .content
    margin: 0 4rem
    padding-top: 2rem
    padding-bottom: 2rem

  input
    font-size: 0.75rem
    height: 2.5em

  .level-left
    margin-right: 24px
    flex-grow: 1
    flex-shrink: 1
    flex-basis: 0
    justify-content: flex-end !important
    .level-item
      flex-grow: unset !important
  .level-right
    flex-grow: 3
    flex-shrink: 1
    flex-basis: 0
    justify-content: flex-start
    .level-item
      flex-grow: 1
      flex-shrink: 1
      flex-basis: 0
      .button
        width: 100%
    input
      width: 100%
  .providers
    width: 100%
    height: 100%
    max-height: 150px
    border: 1px solid #dbdbdb
    border-radius: 4px
    padding: .2rem .5rem 0
    overflow-y: auto
    .provider
      padding-bottom: .2rem
      .action
        cursor: pointer
        color: #4a4a4a
        &:hover
          color: black
.modal-card-foot
    display: block
</style>
