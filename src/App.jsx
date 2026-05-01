import { AppProvider } from "./store/AppContext.jsx";
import ClientList from "./components/Clients/ClientList.jsx";

function App() {
  return (
    <AppProvider>
      <ClientList />
    </AppProvider>
  );
}

export default App;
