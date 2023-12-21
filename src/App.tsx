import "./App.css";
import Header from "./components/Header";
import Countries from "./components/Countries";
import Country from "./components/Country";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

// import { BrowserRouter, Route, Link } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header /> <Countries />
            </>
          }
        />
        <Route
          path="/:countryName"
          element={
            <>
              <Header /> <Country />
            </>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
