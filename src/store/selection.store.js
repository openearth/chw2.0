import wps from "../lib/wps";

async function getLineData(coordinates) {
  console.log(coordinates)
  return [[-76.72066509401847,8.738443673066499],[-76.65362249470581,8.588214318050433]]
}

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
      state.enabled = value
    }
  },

  actions: {
    async getSelection({ commit }, coordinates) {
      const data = await getLineData(coordinates)
      commit('SET_LINE_COORDINATES', data)
    },
    async getDataForSelection({ state, commit }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_DATA", {})

      try {
        const data = await wps({
          data:  state.lineCoordinates,
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
