import { useState } from "react";

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

export default function ChangePassword() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As novas palavras-passe não coincidem");
      return;
    }

    if (newPassword.length < 6) {
      setError("A nova palavra-passe deve ter pelo menos 6 caracteres");
      return;
    }

    // Simulação de sucesso
    alert("Palavra-passe alterada com sucesso!");
    window.location.href = "/settings";
  };

  const handleLogout = () => {
    if (confirm("Tens a certeza que queres terminar a sessão?")) {
      localStorage.clear();
      window.location.href = "/auth";
    }
  };

  const goToCompose = () => {
    window.location.href = "/compose";
  };

  const goToInbox = () => {
    window.location.href = "/inbox";
  };

  const goToOutbox = () => {
    window.location.href = "/outbox";
  };
  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const goToSettings = () => {
    window.location.href = "/settings";
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
          <div className="flex items-center gap-3 lg:gap-4">
            <button className="p-2.5 lg:p-3 hover:bg-white/10 rounded-2xl transition-all">
              <img
                src={bellOnUrl}
                alt="Notificações"
                className="w-6 h-6 lg:w-7 lg:h-7 filter-white"
              />
            </button>
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

        <main className="flex-1 px-4 pb-24 lg:pb-10 lg:px-32 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Alterar Palavra-Passe
            </h2>

            {/* Card do Formulário */}
            <div className="bg-[#0f1b3a]/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-cyan-800/40 p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Palavra-passe atual */}
                <div>
                  <input
                    type="password"
                    placeholder="Digite a palavra-passe atual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-6 py-5 bg-[#1e293b]/70 border border-cyan-800/50 rounded-2xl text-white placeholder-cyan-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all text-lg"
                  />
                </div>

                {/* Nova palavra-passe */}
                <div>
                  <input
                    type="password"
                    placeholder="Digite a nova palavra-passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-6 py-5 bg-[#1e293b]/70 border border-cyan-800/50 rounded-2xl text-white placeholder-cyan-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all text-lg"
                  />
                </div>

                {/* Confirmar nova palavra-passe */}
                <div>
                  <input
                    type="password"
                    placeholder="Confirme a nova palavra-passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-6 py-5 bg-[#1e293b]/70 border border-cyan-800/50 rounded-2xl text-white placeholder-cyan-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all text-lg"
                  />
                </div>

                {/* Erro */}
                {error && (
                  <p className="text-red-400 text-center font-medium">
                    {error}
                  </p>
                )}

                {/* Botão Submeter */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300"
                  >
                    Submeter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

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
