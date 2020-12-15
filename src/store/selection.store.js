import wps from "../lib/wps";

async function getLineData(coordinates) {
  console.log(coordinates)
  return new Promise((res)  => {
    setTimeout(() => {
      // res({
      //   errMsg: "Please select a point on the sea",
      // });

      res({
        transect_coordinates: [
          [-76.72066509401847, 8.738443673066499],
          [-76.65362249470581, 8.588214318050433],
        ],
      });
    }, 2000)
  })

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
      commit("SET_SELECTED_COORDINATE", coordinates);
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      
      const { transect_coordinates, errMsg } = await getLineData(coordinates);

      if (errMsg) {
        commit("SET_ERROR", { message: errMsg });
      }

      commit("SET_LINE_COORDINATES", transect_coordinates);
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
        commit("SET_ERROR", { code: error.response.status });
      }

      commit("SET_LOADING", false);
    },
  },
};
