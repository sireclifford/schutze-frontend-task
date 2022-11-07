import DashboardTable from "./components/Dashboard/dashboardTable.js";
import { GlobalProvider } from "./context/GlobalState";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <DashboardTable />
      </div>
    </GlobalProvider>
  );
}

export default App;
