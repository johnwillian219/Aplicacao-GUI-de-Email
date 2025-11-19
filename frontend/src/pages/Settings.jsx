import { useState, useEffect } from "react";

// =============== ÍCONES ===============
import bellOnUrl from "../icons/bell-on.svg";
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
  const [theme, setTheme] = useState("dark");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // =============== DADOS DO USUÁRIO (dinâmico) ===============
  const userName = "Ana Souza"; // pode vir do localStorage ou API
  const userEmail = "ana.souza@mail.com";
  const firstLetter = userName.charAt(0).toUpperCase();

  // =============== TEMA CLARO/ESCURO ===============
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const handleLogout = () => {
    if (confirm("Tens a certeza que queres terminar a sessão?")) {
      localStorage.clear();
      window.location.href = "/auth";
    }
  };

  const handleChangePassword = () => {
    window.location.href = "/change-password";
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    alert("Conta eliminada com sucesso!");
    localStorage.clear();
    window.location.href = "/auth";
  };

  return (
    <>
      <div
        className={`min-h-screen ${
          theme === "light"
            ? "bg-gray-100 text-gray-900"
            : "bg-[#0a192f] text-white"
        } flex flex-col lg:flex-row transition-all duration-500`}
      >
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 ${
            theme === "light"
              ? "bg-white/95 border-gray-300"
              : "bg-[#0f1b3a]/95"
          } backdrop-blur-xl border-r border-cyan-900/50 transform transition-transform lg:translate-x-0 ${
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
                onClick={() => (window.location.href = "/compose")}
              />
              <SidebarItem
                iconUrl={inboxUrl}
                label="Inbox"
                onClick={() => (window.location.href = "/inbox")}
              />
              <SidebarItem
                iconUrl={outboxUrl}
                label="Outbox"
                onClick={() => (window.location.href = "/outbox")}
              />
              <SidebarItem
                iconUrl={dashboardUrl}
                label="Dashboard"
                onClick={() => (window.location.href = "/dashboard")}
              />
              <SidebarItem iconUrl={settingsUrl} label="Configurações" active />
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
          <header
            className={`rounded-3xl mx-4 mt-4 mb-6 p-4 lg:p-6 flex items-center justify-between shadow-2xl border ${
              theme === "light"
                ? "bg-white border-gray-200"
                : "bg-gradient-to-r from-[#0f1b3a] to-[#0a2e5c] border-cyan-800/30"
            }`}
          >
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
            <div className="flex items-center gap-3 lg:gap-4">
              <button className="p-2.5 lg:p-3 hover:bg-white/10 rounded-2xl transition-all">
                <img
                  src={bellOnUrl}
                  alt="Notificações"
                  className="w-6 h-6 lg:w-7 lg:h-7 filter-white"
                />
              </button>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center font-bold text-lg lg:text-xl shadow-lg">
                {firstLetter}
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
              <div
                className={`rounded-3xl p-6 lg:p-8 shadow-2xl border ${
                  theme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-gradient-to-r from-[#0f1b3a] to-[#0a2e5c] border-cyan-800/40"
                } flex flex-col sm:flex-row items-center justify-between gap-6`}
              >
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

              {/* Preferências - MELHORADO */}
              <div
                className={`rounded-3xl p-6 lg:p-8 shadow-2xl border ${
                  theme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-[#0f1b3a]/80 border-cyan-800/40"
                }`}
              >
                <h3 className="text-2xl font-bold text-cyan-300 mb-8">
                  Preferências
                </h3>

                {/* TEMA - texto à esquerda dos botões */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                  <span className="text-lg font-medium">Tema</span>
                  <div className="flex items-center gap-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        checked={theme === "dark"}
                        onChange={() => setTheme("dark")}
                        className="w-6 h-6 text-cyan-500 focus:ring-cyan-400 cursor-pointer"
                      />
                      <span className="text-lg">Escuro</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        checked={theme === "light"}
                        onChange={() => setTheme("light")}
                        className="w-6 h-6 text-cyan-500 focus:ring-cyan-400 cursor-pointer"
                      />
                      <span className="text-lg">Claro</span>
                    </label>
                  </div>
                </div>

                {/* NOTIFICAÇÕES - ícone juntinho ao texto */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">
                    Notificações do Sistema
                  </span>
                  <button className="p-2 hover:bg-white/10 rounded-2xl transition-all">
                    <img
                      src={bellOnUrl}
                      alt="Notificações"
                      className="w-10 h-10 filter-white"
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

          {/* Bottom Nav Mobile */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f1b3a]/95 backdrop-blur-2xl border-t border-cyan-900/50 z-40">
            <div className="grid grid-cols-4 py-4 text-center">
              <MobileNavItem iconUrl={pencilUrl} label="Escrever" />
              <MobileNavItem iconUrl={inboxUrl} label="Inbox" />
              <MobileNavItem iconUrl={outboxUrl} label="Outbox" />
              <MobileNavItem iconUrl={settingsUrl} label="Config" active />
            </div>
          </nav>
        </div>

        <style jsx>{`
          .filter-white {
            filter: brightness(0) invert(1);
          }
        `}</style>
      </div>
    </>
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

function MobileNavItem({ iconUrl, label, active = false }) {
  return (
    <button
      className={`flex flex-col items-center ${
        active ? "text-cyan-400" : "text-gray-400"
      }`}
    >
      <img src={iconUrl} alt={label} className="w-7 h-7 filter-white mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
