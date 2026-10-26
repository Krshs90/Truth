import React from 'react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
import { MapPage } from '../pages/MapPage';
import { OnboardingModal } from '../components/onboarding/OnboardingModal';

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

  it('Renders Investigate workspace with search console and curated library', () => {
    renderWithProviders(<InvestigatePage />);
    expect(screen.getByText('Investigate Political Claims')).toBeInTheDocument();
    expect(screen.getByText(/Political Claim or Statement to Investigate/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Begin Investigation/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Civic Claims Library/i).length).toBeGreaterThan(0);
  });

  it('Renders Candidate Comparison matrix with issue dropdowns', () => {
    renderWithProviders(<ComparePage />);
    expect(screen.getByText('Compare Candidates on Documented Issues')).toBeInTheDocument();
    expect(screen.getAllByText(/Ken Paxton/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/James Talarico/i).length).toBeGreaterThan(0);
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

  it('Renders Map page with spatial civic intelligence header and interactive division system', () => {
    renderWithProviders(<MapPage />);
    expect(screen.getByText('Texas Civic & Electoral Map')).toBeInTheDocument();
    expect(screen.getByText(/Map Division:/i)).toBeInTheDocument();
    expect(screen.getByText(/Districts \(38\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Counties \(254\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Politicians \(12 Key\)/i)).toBeInTheDocument();
    expect(screen.getByText(/TX Senate \(31\)/i)).toBeInTheDocument();
    expect(screen.getByText(/None \(Standard Map\)/i)).toBeInTheDocument();
  });

  it('Renders Onboarding modal with mission, district setup, and nonpartisan pledge', async () => {
    renderWithProviders(<OnboardingModal isOpen={true} onClose={() => {}} />);
    expect(screen.getAllByText(/TRUTH/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/the spin\./i)).toBeInTheDocument();
    expect(screen.getByText(/Understand your candidates/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Begin/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^Begin/i }));

    expect(await screen.findByText('See beyond the political spin.')).toBeInTheDocument();
    expect(screen.getByText(/Strictly Nonpartisan/i)).toBeInTheDocument();
    expect(screen.getByText(/Primary Government Sources First/i)).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });
});
