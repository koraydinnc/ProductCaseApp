import { Route, Routes } from 'react-router-dom'; 
import './App.css';
import { MainRouter } from './Router';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <Routes>
      {MainRouter.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <MainLayout>
                <route.component />
              </MainLayout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
