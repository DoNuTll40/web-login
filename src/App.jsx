import AuthHook from "./hooks/AuthHook";
import AppRouter from "./routers/AppRouter";
import LoadingPage from "./components/LoadingPage";

function App() {

  const { loading } = AuthHook();

  if(loading){
    return <LoadingPage />
  }

  return (
    <AppRouter />
  );
}

export default App;
