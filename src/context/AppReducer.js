export default function appReducer(state, action) {
  switch (action.type) {
    case "EDIT_DASHBOARD":
      const updatedDashboard = action.payload;
      console.log("payload", updatedDashboard);
      const updatedDashboards = state.dashboards.map((dashboard) => {
        if (dashboard._id === updatedDashboard._id) {
          return updatedDashboard;
        }
        return dashboard;
      });
      console.log("updatedDashboards", updatedDashboards);
      return {
        ...state,
        dashboards: updatedDashboards,
      };
    default:
      return state;
  }
}
