import React from 'react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CivicProvider } from '../context/CivicContext';
import { OverviewPage } from '../pages/OverviewPage';
import { DistrictPage } from '../pages/DistrictPage';
import { InvestigatePage } from '../pages/InvestigatePage';
import { ComparePage } from '../pages/ComparePage';
import { GovernmentPage } from '../pages/GovernmentPage';
import { SourcesPage } from '../pages/SourcesPage';
import { SettingsPage } from '../pages/SettingsPage';

function renderWithProviders(ui: React.ReactElement, initialRoute = '/') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <CivicProvider>
        <MemoryRouter initialEntries={[initialRoute]}>
          {ui}
        </MemoryRouter>
      </CivicProvider>
    </QueryClientProvider>
  );
}

describe('UI Functional Integration Tests', () => {
  it('Renders Overview page with headline and investigation search box', () => {
    renderWithProviders(<OverviewPage />);
    expect(screen.getByText('See beyond the spin.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Paste a political claim/i)).toBeInTheDocument();
    expect(screen.getByText('Recent Claim Investigations')).toBeInTheDocument();
  });

  it('Renders District page with ZIP lookup and manual selectors', () => {
    renderWithProviders(<DistrictPage />);
    expect(screen.getByText('My District & Representatives')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter 5-digit Texas ZIP/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Elected Officials/i)).toBeInTheDocument();
  });

  it('Renders Investigate workspace with 4-step pipeline', () => {
    renderWithProviders(<InvestigatePage />);
    expect(screen.getByText('Investigate Political Claims')).toBeInTheDocument();
    expect(screen.getByText('Extract Claims')).toBeInTheDocument();
    expect(screen.getByText('Retrieve Evidence')).toBeInTheDocument();
    expect(screen.getByText('Evaluate Evidence')).toBeInTheDocument();
    expect(screen.getByText('Transparent Report')).toBeInTheDocument();
  });

  it('Renders Candidate Comparison matrix with issue dropdowns', () => {
    renderWithProviders(<ComparePage />);
    expect(screen.getByText('Compare Candidates on Documented Issues')).toBeInTheDocument();
    expect(screen.getAllByText(/Ted Cruz/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Colin Allred/i).length).toBeGreaterThan(0);
  });

  it('Renders Government Tracker with bill search and filters', () => {
    renderWithProviders(<GovernmentPage />);
    expect(screen.getByText('Government & Legislative Tracker')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by bill number/i)).toBeInTheDocument();
    expect(screen.getByText('TX 88(2C) SB 2')).toBeInTheDocument();
  });

  it('Renders Sources & Methodology page with provenance audit log', () => {
    renderWithProviders(<SourcesPage />);
    expect(screen.getByText(/Sources, Methodology & Evidential Standards/i)).toBeInTheDocument();
    expect(screen.getByText(/Hierarchy of Evidence/i)).toBeInTheDocument();
    expect(screen.getByText(/Data Provenance & Audit Log/i)).toBeInTheDocument();
  });

  it('Renders Settings page with privacy policy and local inference status', () => {
    renderWithProviders(<SettingsPage />);
    expect(screen.getByText('Settings & Local Configuration')).toBeInTheDocument();
    expect(screen.getByText('Privacy & Data Architecture Standards')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Optional Local AI Inference/i })).toBeInTheDocument();
  });
});
