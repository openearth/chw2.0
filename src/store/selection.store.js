import wps from "../lib/wps";

export default {
  namespaced: true,

  state: {
    enabled: false,
    selectedCoordinate: null,
    lineCoordinates: [],
    loading: false,
    error: null,
    data: {},
  },

  mutations: {
    SET_SELECTED_COORDINATE(state, coordinate) {
      state.selectedCoordinate = coordinate;
    },
    SET_LINE_COORDINATES(state, coordinates) {
      state.lineCoordinates = coordinates;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_DATA(state, data) {
      state.data = data;
    },
    SET_ENABLED(state, value) {
      state.enabled = value;
    },
  },

  actions: {
    async getSelection({ commit, state }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      const { transect_coordinates, errMsg } = await wps({
        identifier: "create_transect",
        functionId: "point",
        data: JSON.stringify(state.selectedCoordinate),
      });

      if (errMsg) {
        commit("SET_ERROR", { message: errMsg });
      }

      commit("SET_LINE_COORDINATES", transect_coordinates);
    },
    async getDataForSelection({ state, commit }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_DATA", {});

      try {
        const data = await wps({
          identifier: "chw2_risk_classification",
          functionId: "transect",
          data: JSON.stringify(state.lineCoordinates),
        });

        commit("SET_DATA", data);
      } catch (error) {
        commit("SET_ERROR", { code: error.response.status });
      }

      commit("SET_LOADING", false);
    },
  },
};
