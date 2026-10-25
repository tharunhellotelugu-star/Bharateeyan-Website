import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DemoRoleSwitcher } from './components/DemoRoleSwitcher';
import { ToastContainer } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CampaignDetailPage } from './pages/CampaignDetailPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { TrustSafetyPage } from './pages/TrustSafetyPage';
import { BackerDashboardPage } from './pages/BackerDashboardPage';
import { FounderDashboardPage } from './pages/FounderDashboardPage';
import { CampaignBuilderPage } from './pages/CampaignBuilderPage';
import { InvestorDealRoomPage } from './pages/InvestorDealRoomPage';
import { AdminPanelPage } from './pages/AdminPanelPage';

function MainRouter() {
  // Simple client-side router based on window.location.hash or local state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash.replace('#', '') || '/';
  });

  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('camp-1');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
      if (hash.startsWith('/campaign/')) {
        const id = hash.replace('/campaign/', '');
        setSelectedCampaignId(id);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCampaign = (id: string) => {
    setSelectedCampaignId(id);
    navigate(`/campaign/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-indigo-950 font-sans">
      <Header currentPath={currentPath} navigate={navigate} />

      <main className="flex-1">
        {currentPath === '/' && (
          <HomePage navigate={navigate} onSelectCampaign={handleSelectCampaign} />
        )}

        {currentPath === '/explore' && (
          <ExplorePage onSelectCampaign={handleSelectCampaign} />
        )}

        {currentPath.startsWith('/campaign/') && (
          <CampaignDetailPage campaignId={selectedCampaignId} navigate={navigate} />
        )}

        {currentPath === '/how-it-works' && (
          <HowItWorksPage navigate={navigate} />
        )}

        {currentPath === '/trust-safety' && (
          <TrustSafetyPage />
        )}

        {currentPath === '/backer-dashboard' && (
          <BackerDashboardPage />
        )}

        {currentPath === '/founder-dashboard' && (
          <FounderDashboardPage />
        )}

        {currentPath === '/start-campaign' && (
          <CampaignBuilderPage navigate={navigate} onSelectCampaign={handleSelectCampaign} />
        )}

        {currentPath === '/investor-deal-room' && (
          <InvestorDealRoomPage onSelectCampaign={handleSelectCampaign} />
        )}

        {currentPath === '/admin-panel' && (
          <AdminPanelPage onSelectCampaign={handleSelectCampaign} />
        )}
      </main>

      <Footer navigate={navigate} />
      <DemoRoleSwitcher navigate={navigate} />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
