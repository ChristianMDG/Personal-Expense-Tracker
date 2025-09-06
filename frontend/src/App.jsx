// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Expenses from './pages/Expenses';
import Incomes from './pages/Incomes';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<h1>Dashboard Page</h1>} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="incomes" element={<h1>{<Incomes/>}</h1>} />
        <Route path="categories" element={<h1>Categories Page</h1>} />
        <Route path="profile" element={<h1>Profile Page</h1>} />
      </Route>
    </Routes>
  );
}
