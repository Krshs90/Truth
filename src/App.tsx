import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CivicProvider } from './context/CivicContext';
import { AppShell } from './components/layout/AppShell';

const OverviewPage = lazy(() => import('./pages/OverviewPage').then((m) => ({ default: m.OverviewPage })));
const DistrictPage = lazy(() => import('./pages/DistrictPage').then((m) => ({ default: m.DistrictPage })));
const InvestigatePage = lazy(() => import('./pages/InvestigatePage').then((m) => ({ default: m.InvestigatePage })));
const ClaimDetailPage = lazy(() => import('./pages/ClaimDetailPage').then((m) => ({ default: m.ClaimDetailPage })));
const ComparePage = lazy(() => import('./pages/ComparePage').then((m) => ({ default: m.ComparePage })));
const GovernmentPage = lazy(() => import('./pages/GovernmentPage').then((m) => ({ default: m.GovernmentPage })));
const MapPage = lazy(() => import('./pages/MapPage').then((m) => ({ default: m.MapPage })));
const SourcesPage = lazy(() => import('./pages/SourcesPage').then((m) => ({ default: m.SourcesPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10,
    },
  },
});

function RouteLoading() {
  return (
    <div className="py-24 flex flex-col items-center justify-center space-y-3">
      <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-semibold text-slate-500 font-mono tracking-wider">
        LOADING CIVIC INTELLIGENCE...
      </span>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CivicProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppShell />}>
              <Route
                index
                element={
                  <Suspense fallback={<RouteLoading />}>
                    <OverviewPage />
                  </Suspense>
                }
              />
              <Route
                path="district"
                element={
                  <Suspense fallback={<RouteLoading />}>
                    <DistrictPage />
                  </Suspense>
                }
              />
              <Route
                path="investigate"
                element={
                  <Suspense fallback={<RouteLoading />}>
                    <InvestigatePage />
                  </Suspense>
                }
              />
              <Route
                path="investigate/:id"
                element={
                  <Suspense fallback={<RouteLoading />}>
                    <ClaimDetailPage />
                  </Suspense>
                }
              />
              <Route
                path="compare"
                element={
                  <Suspense fallback={<RouteLoading />}>
                    <ComparePage />
                  </Suspense>
                }
              />
              <Route
                path="government"
                element={
                  <Suspense fallback={<RouteLoading />}>
                    <GovernmentPage />
                  </Suspense>
                }
              />
              <Route
                path="map"
                element={
                  <Suspense fallback={<RouteLoading />}>
                    <MapPage />
                  </Suspense>
                }
              />
              <Route
                path="sources"
                element={
                  <Suspense fallback={<RouteLoading />}>
                    <SourcesPage />
                  </Suspense>
                }
              />
              <Route
                path="settings"
                element={
                  <Suspense fallback={<RouteLoading />}>
                    <SettingsPage />
                  </Suspense>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CivicProvider>
    </QueryClientProvider>
  );
}
