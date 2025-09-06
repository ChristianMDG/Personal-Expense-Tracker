// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Expenses from './pages/Expenses';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<h1>Dashboard Page</h1>} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="incomes" element={<h1>Incomes Page</h1>} />
        <Route path="categories" element={<h1>Categories Page</h1>} />
        <Route path="profile" element={<h1>Profile Page</h1>} />
      </Route>
      <Route path="/login" element={<h1>Login Page</h1>} />
    </Routes>
  );
}
