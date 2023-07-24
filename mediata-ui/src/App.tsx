import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layouts/main-layout";
import { PageNotFound } from "./components/pages/other-pages/page-not-found";
import { HomePage } from "./components/pages/home-pages/home-pages";
import { SettingsPages } from "./components/pages/settings-pages/settings-page";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/query-client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/settings" element={<SettingsPages />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
