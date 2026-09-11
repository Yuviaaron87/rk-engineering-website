import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { AdminLogin } from '../pages/AdminLogin';
import { AdminDashboard } from '../pages/AdminDashboard';
import { ROUTES } from '../constants/route';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Client Site Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Route>

      {/* Admin Portal Routes */}
      <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
      <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />

      {/* 404 Catch-All */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
