import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/universal/Sidebar';
import Topbar from '../../components/universal/Topbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Fixed Topbar */}
      <Topbar />
      
      {/* Main Content with proper margin */}
      <main className="ml-64 mt-[60px] p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}