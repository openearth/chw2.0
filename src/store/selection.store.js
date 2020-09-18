import pick from "lodash/pick";
import wps from "../lib/wps";

export default {
  namespaced: true,

  state: {
    coordinates: [],
    loading: false,
    error: null,
    data: {},
  },

  getters: {
    hazardData: (state) =>
      pick(state.data, [
        "geological_layout",
        "wave_exposure",
        "tidal_range",
        "flora_fauna",
        "sediment",
        "storm_climate",
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
  },

  actions: {
    async getDataForSelection({ commit }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const data = await wps({
          functionId: "chw_transect",
          lineData: [
            "wktline",
            "LINESTRING(-75.64579010009734 9.813031445135282,-75.59291839599524 9.800852433811665)",
          ],
        });

        commit("SET_DATA", data);
      } catch (error) {
        commit("SET_ERROR", error.message);
      }

      commit("SET_LOADING", false);
    },
  },
};
