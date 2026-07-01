import { AppProvider } from "./store/AppContext";
import ClientList from "./components/Clients/ClientList";

function App() {
  return (
    <AppProvider>
      <ClientList />
    </AppProvider>
  );
}

export default App;
