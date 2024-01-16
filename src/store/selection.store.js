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
    coastlineId: null, 
    notification: "", //Notification message for special cases. Dont confuse it with Error message. 
                        //When no classification happens then it passes in the error message
  },

  mutations: {
    SET_SELECTED_COORDINATE(state, coordinate) {
      state.selectedCoordinate = coordinate;
    },
    SET_LINE_COORDINATES(state, coordinates) {
      state.lineCoordinates = coordinates;
    },
    SET_COAST_LINE_ID(state, id) {
      state.coastlineId = id;
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
    SET_NOTIFICATION(state, notification) {
      state.notification = notification
    }
  },

  actions: {
    async getSelection({ commit, state }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      const { transect_coordinates, coastline_id, notification, errMsg } = await wps({
        identifier: "create_transect",
        functionId: "sea_point",
        type: "Point",
        data: JSON.stringify(state.selectedCoordinate),
      });

      if (errMsg) {
        commit("SET_ERROR", { message: errMsg });
      }

      commit("SET_NOTIFICATION", notification)
      commit("SET_LINE_COORDINATES", transect_coordinates);
      commit("SET_COAST_LINE_ID", coastline_id);
    },
    async getDataForSelection({ state, commit }) {
     
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_DATA", {});
        const data = await wps({
          identifier: "chw_risk_classification_test",
          functionId: "transect",
          data: JSON.stringify(state.lineCoordinates),
          type: "LineString",
          coastId: state.coastlineId,
          notification: JSON.stringify(state.notification)

          
        });
  
       if (data.errMsg) {
        commit("SET_ERROR", {message: data.errMsg});
      }else{
        commit("SET_DATA", data);
        commit("SET_LOADING", false);
      }

      
    },
  },
};
