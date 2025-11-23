import { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";

// =============== ÍCONES ===============
import bellOnUrl from "../icons/bell-on.svg";
import bellOffUrl from "../icons/bell-off.svg";
import dashboardUrl from "../icons/dashboard.svg";
import inboxUrl from "../icons/inbox.svg";
import outboxUrl from "../icons/outbox.svg";
import sendUrl from "../icons/send.svg";
import settingsUrl from "../icons/settings.svg";
import mailUrl from "../icons/email.svg";
import pencilUrl from "../icons/pencil-square.svg";
import logoutUrl from "../icons/logout.svg";
import menuUrl from "../icons/menu.svg";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { enabled: notificationsEnabled, toggle: toggleNotifications } =
    useNotifications();

  // Dados do usuário (pode vir do localStorage ou API depois)
  const userName = "Ana Souza";
  const userEmail = "ana.souza@mail.com";
  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    if (confirm("Tens a certeza que queres terminar a sessão?")) {
      localStorage.clear();
      window.location.href = "/Aplicacao-GUI-de-Email/#/auth";
    }
  };

  const handleChangePassword = () => {
    window.location.href = "/Aplicacao-GUI-de-Email/#/change-password";
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Limpa tudo
    localStorage.clear();

    // Mostra o modal de sucesso
    setShowDeleteModal(false); // fecha o modal de confirmação
    setShowDeleteSuccessModal(true); // abre o modal de sucesso

    // Depois de 2 segundos, vai para o login
    setTimeout(() => {
      window.location.href = "/Aplicacao-GUI-de-Email/#/auth";
    }, 6000);
  };

  const goToCompose = () => {
    window.location.href = "/Aplicacao-GUI-de-Email/#/compose";
  };

  const goToInbox = () => {
    window.location.href = "/Aplicacao-GUI-de-Email/#/inbox";
  };
  const goToOutbox = () => {
    window.location.href = "/Aplicacao-GUI-de-Email/#/outbox";
  };

  const goToDashboard = () => {
    window.location.href = "/Aplicacao-GUI-de-Email/#/dashboard";
  };

  const goToSettings = () => {
    window.location.href = "/Aplicacao-GUI-de-Email/#/settings";
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f1b3a]/95 backdrop-blur-xl border-r border-cyan-900/50 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-cyan-900/30">
            <h1 className="text-2xl font-bold text-cyan-400">
              Mail Application
            </h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-3">
            <SidebarItem
              iconUrl={pencilUrl}
              label="Escrever"
              onClick={goToCompose}
            />
            <SidebarItem iconUrl={inboxUrl} label="Inbox" onClick={goToInbox} />
            <SidebarItem
              iconUrl={outboxUrl}
              label="Outbox"
              onClick={goToOutbox}
            />
            <SidebarItem
              iconUrl={dashboardUrl}
              label="Dashboard"
              onClick={goToDashboard}
            />
            <SidebarItem
              iconUrl={settingsUrl}
              label="Configurações"
              onClick={goToSettings}
              active
            />
          </nav>
          <div className="p-4 border-t border-cyan-900/30">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-4 text-red-400 hover:bg-red-900/20 rounded-2xl transition-all"
            >
              <img
                src={logoutUrl}
                alt="Sair"
                className="w-6 h-6 filter-white"
              />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#0f1b3a] to-[#0a2e5c] rounded-3xl mx-4 mt-4 mb-6 p-4 lg:p-6 flex items-center justify-between shadow-2xl border border-cyan-800/30">
          <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
            <div className="bg-cyan-500/20 p-2.5 lg:p-3 rounded-2xl flex-shrink-0">
              <img
                src={mailUrl}
                alt="Email"
                className="w-7 h-7 lg:w-9 lg:h-9 filter-white"
              />
            </div>
            <h1 className="text-lg lg:text-2xl font-bold text-cyan-300 truncate">
              Mail Application
            </h1>
          </div>
          <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
            {/* Botão de notificações com toggle */}
            <button
              onClick={toggleNotifications}
              className="relative p-2.5 lg:p-3 hover:bg-white/10 rounded-2xl transition-all duration-300 group"
              title={
                notificationsEnabled
                  ? "Desativar notificações"
                  : "Ativar notificações"
              }
            >
              <img
                src={notificationsEnabled ? bellOnUrl : bellOffUrl}
                alt="Notificações"
                className="w-6 h-6 lg:w-7 lg:h-7 filter-white transition-all duration-300"
              />
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center font-bold text-lg lg:text-xl shadow-lg">
              J
            </div>
          </div>
        </header>

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-3 left-3 z-50 p-2.5 bg-cyan-600/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-400/30"
        >
          <img src={menuUrl} alt="Menu" className="w-6 h-6 filter-white" />
        </button>

        <main className="flex-1 px-4 pb-24 lg:pb-10 lg:px-20 overflow-y-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Definições da Conta
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Perfil */}
            <div className="bg-gradient-to-r from-[#0f1b3a] to-[#0a2e5c] rounded-3xl p-6 lg:p-8 shadow-2xl border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl border-4 border-cyan-300">
                  {firstLetter}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cyan-300">
                    {userName}
                  </h3>
                  <p className="text-cyan-200">{userEmail}</p>
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                className="px-6 py-3 bg-[#1e293b]/80 text-cyan-300 font-bold rounded-2xl border border-cyan-700 hover:bg-[#1e293b] transition-all"
              >
                Alterar Password
              </button>
            </div>

            {/* Preferências */}
            <div className="bg-[#0f1b3a]/80 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl border border-cyan-800/40">
              <h3 className="text-2xl font-bold text-cyan-300 mb-8">
                Preferências
              </h3>

              {/* Notificações */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">
                  Notificações do Sistema
                </span>
                {/* Botão de notificações com toggle */}
                <button
                  onClick={toggleNotifications}
                  className="relative p-2.5 lg:p-3 hover:bg-white/10 rounded-2xl transition-all duration-300 group"
                  title={
                    notificationsEnabled
                      ? "Desativar notificações"
                      : "Ativar notificações"
                  }
                >
                  <img
                    src={notificationsEnabled ? bellOnUrl : bellOffUrl}
                    alt="Notificações"
                    className="w-6 h-6 lg:w-7 lg:h-7 filter-white transition-all duration-300"
                  />
                </button>
              </div>
            </div>

            {/* Eliminar Conta */}
            <div className="text-center">
              <button
                onClick={handleDeleteAccount}
                className="px-12 py-4 bg-red-600/80 text-white font-bold rounded-2xl shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
              >
                Eliminar Conta
              </button>
            </div>
          </div>
        </main>

        {/* Modal Eliminar Conta */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-[#0f1b3a] to-[#0a2e5c] rounded-3xl shadow-2xl border border-cyan-800/50 p-8 max-w-sm w-full text-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Tens a certeza que queres eliminar a conta?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={confirmDelete}
                  className="px-8 py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all"
                >
                  Sim, Eliminar
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DE SUCESSO - CONTA ELIMINADA */}
        {showDeleteSuccessModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-3xl shadow-2xl border border-red-800/50 p-10 max-w-md w-full text-center transform scale-100 animate-in fade-in zoom-in duration-500">
              {/* Ícone de sucesso com X vermelho grande */}
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg
                  className="w-16 h-16 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Conta eliminada com sucesso!
              </h3>
              <p className="text-red-200 text-lg mb-8">
                Todos os dados foram removidos permanentemente.
              </p>

              <div className="flex justify-center">
                <div className="w-16 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>

              <p className="text-sm text-gray-400 mt-6">
                Redirecionando para o login...
              </p>
            </div>
          </div>
        )}
        {/* Bottom Nav Mobile */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f1b3a]/95 backdrop-blur-2xl border-t border-cyan-900/50 z-40">
          <div className="grid grid-cols-4 py-4 text-center">
            <MobileNavItem
              iconUrl={pencilUrl}
              label="Escrever"
              onClick={goToCompose}
            />
            <MobileNavItem
              iconUrl={inboxUrl}
              label="Inbox"
              onClick={goToInbox}
            />
            <MobileNavItem
              iconUrl={outboxUrl}
              label="Outbox"
              onClick={goToOutbox}
            />
            <MobileNavItem
              iconUrl={settingsUrl}
              label="Config"
              onClick={goToSettings}
              active
            />
          </div>
        </nav>
      </div>

      <style jsx>{`
        .filter-white {
          filter: brightness(0) invert(1);
        }
      `}</style>
    </div>
  );
}

// Componentes reutilizáveis
function SidebarItem({ iconUrl, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
        active
          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-700/50 shadow-lg"
          : "hover:bg-white/10"
      }`}
    >
      <img src={iconUrl} alt={label} className="w-6 h-6 filter-white" />
      <span className="font-medium text-lg">{label}</span>
    </button>
  );
}

function MobileNavItem({ iconUrl, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center ${
        active ? "text-cyan-400" : "text-gray-400"
      }`}
    >
      <img src={iconUrl} alt={label} className="w-7 h-7 filter-white mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
