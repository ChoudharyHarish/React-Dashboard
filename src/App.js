import { BrowserRouter, Routes, Route } from "react-router-dom";

import Pages from "./pages";

import Sidebar from "./components/Sidebar";
import 'chartjs-adapter-date-fns';

function App() {
  return (
    <div className="flex">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route index element={<Pages.Main />} />
          <Route path="/events" element={<Pages.Events />} />
          <Route path='/trends' element={<Pages.Trends />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
