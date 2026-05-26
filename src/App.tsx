import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Hypothyroidism from './components/tools/Hypothyroidism/index';
import Parasites from './components/tools/Parasites/index';
import FoodAmount from './components/tools/FoodAmount/index';
import FluidTherapy from './components/tools/FluidTherapy/index';
import Neurological from './components/tools/Neurological/index';
import Echocardiography from './components/tools/Echocardiography/index';
import Poisoning from './components/tools/Poisoning/index';
import Cushing from './components/tools/Cushing/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/hypothyroidism" element={<Hypothyroidism />} />
        <Route path="/parasites" element={<Parasites />} />
        <Route path="/food-amount" element={<FoodAmount />} />
        <Route path="/fluid-therapy" element={<FluidTherapy />} />
        <Route path="/neurological" element={<Neurological />} />
        <Route path="/echocardiography" element={<Echocardiography />} />
        <Route path="/poisoning" element={<Poisoning />} />
        <Route path="/cushing" element={<Cushing />} />
      </Routes>
    </Router>
  );
}

export default App;
