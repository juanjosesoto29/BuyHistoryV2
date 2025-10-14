import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/components/Sidebar';
import '../styles/Admin.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet /> {/* Aquí se renderizarán las páginas del admin */}
      </div>
    </div>
  );
};

export default AdminLayout;