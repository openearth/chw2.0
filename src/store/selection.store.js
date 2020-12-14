import pick from "lodash/pick";
import wps from "../lib/wps";

export default {
  namespaced: true,

  state: {
    enabled: false,
    coordinates: [],
    loading: false,
    error: null,
    data: {},
  },

  getters: {
    dataResults: (state) =>
      pick(state.data, [
        "geological_layout",
        "wave_exposure",
        "tidal_range",
        "flora_fauna",
        "sediment",
        "storm_climate",
      ]),
    coastalEnvironment: (state) =>
      pick(state.data, [
        "slope",
        "coastenv",
        "erosion",
      ]),
    riskData: (state) =>
      pick(state.data, [
        "gar_distance",
        "population",
        "capital_stock",
        "roads",
      ]),
    measuresData: (state) =>
      pick(state.data, [
        "code",
        "breakwaters",
        "groynes",
        "jetties",
        "revetments",
        "seawalls",
        "dikes",
        "stormsurgebarriers",
        "beachnourishment",
        "duneconstab",
        "cliffstab",
        "wetlandrest",
        "floodwarning",
        "floodproofing",
        "coastalzoning",
        "groundwatermgmt",
        "fluvsedmgmt",
      ]),
  },

  mutations: {
    SET_COORDINATES(state, coordinates) {
      state.coordinates = coordinates;
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
      state.enabled = value
    }
  },

  actions: {
    async getDataForSelection({ state, commit }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_DATA", {})

      try {
        const data = await wps({
          data:  state.coordinates,
        });

        commit("SET_DATA", data);
      } catch (error) {
        console.log(error)
        commit("SET_ERROR", { code: error.response.status });
      }

      commit("SET_LOADING", false);
    },
  },
};
