import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
// import DiagramBpmn from './components/DiagramBpmn';
// import FormIO from './components/FormIO';


const DiagramBpmn = React.lazy(() => import('./components/DiagramBpmn'));
const FormIO = React.lazy(() => import('./components/FormIO'));

function App() {
  return (
    <div className="App">
      {/* <DiagramBpmn /> */}
      <Router basename='/'>
      <React.Suspense fallback={null}>
        <Routes>
          <Route path="" element={<DiagramBpmn />} />
          <Route path="FormIO" element={<FormIO />} />
        </Routes>
      </React.Suspense>
    </Router>
    </div>
  );
}
export default App;