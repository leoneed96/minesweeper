<template>
  <div>
    <b-icon-gear-fill @click="showModal = !showModal" />
    <b-modal v-model="showModal" @ok="onChange" title="Field settings">
      <b-list-group>
        <b-list-group-item
          v-for="(defaultMode, idx) in modes"
          :key="idx"
          :active="activeMode === idx"
          @click="activeMode = idx"
          class="flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ defaultMode.title }}</h5>
          </div>
          <small v-if="idx !== 3"
            >{{ defaultMode.rows }}x{{ defaultMode.cols }},
            {{ defaultMode.mines }} mines</small
          >
        </b-list-group-item>
      </b-list-group>
      <div>
        <b-card class="mt-2" v-if="customModeSelected">
          <b-form-group label-cols-sm="3" label="Rows:">
            <b-form-input
              :state="customInputState.rows"
              id="rows"
              v-model="modes[3].rows"
            >
            </b-form-input>
            <b-form-invalid-feedback id="input-live-feedback-rows">
              Enter a positive number
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols-sm="3" label="Cols:">
            <b-form-input
              id="cols"
              :state="customInputState.cols"
              v-model="modes[3].cols"
            >
              <b-form-invalid-feedback id="input-live-feedback-cols">
                Enter a positive number
              </b-form-invalid-feedback>
            </b-form-input>
          </b-form-group>
          <b-form-group label-cols-sm="3" label="Mines:">
            <b-form-input
              id="mines"
              :state="customInputState.mines"
              v-model="modes[3].mines"
            >
            </b-form-input>
            <b-form-invalid-feedback id="input-live-feedback-mines">
              Enter a number smaller than total cells count and greater than 1
            </b-form-invalid-feedback>
          </b-form-group>
        </b-card>
        <b-card class="mt-2">
          <b-form-checkbox size="lg" switch v-model="easyStart"
            >Enable easy start</b-form-checkbox
          >
        </b-card>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      easyStart: false,
      showModal: false,
      activeMode: 0,
      modes: [
        { rows: 8, cols: 8, mines: 10, title: "Beginner" },
        { rows: 16, cols: 16, mines: 40, title: "Intermediate" },
        { rows: 16, cols: 30, mines: 99, title: "Expert" },
        { rows: 16, cols: 30, mines: 99, title: "Custom" },
      ],
    };
  },
  computed: {
    customModeSelected() {
      return this.activeMode === 3;
    },
    customInputState() {
      return {
        rows: this.modes[3].rows > 0,
        cols: this.modes[3].cols > 0,
        mines:
          this.modes[3].mines < this.modes[3].rows * this.modes[3].cols &&
          this.modes[3].mines > 0,
      };
    },
  },
  methods: {
    onChange() {
      this.$emit("settingsChanged", {
        data: this.modes[this.activeMode],
        easyStart: this.easyStart,
      });
    },
  },
};
</script>
