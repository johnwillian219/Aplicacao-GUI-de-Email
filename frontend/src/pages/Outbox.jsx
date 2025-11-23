import { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";

// =============== ÍCONES (pasta icons) ===============
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
import arrowLeftUrl from "../icons/arrow-left.svg";
import checkUrl from "../icons/check.svg"; // verde - entregue
import clockUrl from "../icons/clock.svg"; // cinza - em fila
import errorUrl from "../icons/x-circle.svg"; // vermelho - erro

export default function Outbox() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { enabled: notificationsEnabled, toggle: toggleNotifications } =
    useNotifications();

  const sentEmails = [
    {
      id: 1,
      to: "Alice Duarte",
      subject: "Projectos Recentes",
      date: "13 Set",
      status: "delivered",
      body: "It is a long established fact that a reader will be distracted...",
    },
    {
      id: 2,
      to: "Carlos Lopes",
      subject: "Reunião de Equipe",
      date: "10 Set",
      status: "pending",
      body: "A reunião está agendada para amanhã. Confirma a tua presença?",
    },
    {
      id: 3,
      to: "Alice Duarte",
      subject: "Projectos Recentes",
      date: "13 Set",
      status: "error",
      body: "Ocorreu um erro no envio anterior. Por favor tenta novamente.",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return checkUrl;
      case "pending":
        return clockUrl;
      case "error":
        return errorUrl;
      default:
        return clockUrl;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-400";
      case "pending":
        return "text-gray-400";
      case "error":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "delivered":
        return "Entregue";
      case "pending":
        return "Em fila";
      case "error":
        return "Erro";
      default:
        return "Em fila";
    }
  };

  const handleLogout = () => {
    if (confirm("Tens a certeza que queres terminar a sessão?")) {
      localStorage.clear();
      window.location.href = "/Aplicacao-GUI-de-Email/#/auth";
    }
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

  const goToSettings = () => {
    window.location.href = "/Aplicacao-GUI-de-Email/#/settings";
  };

  const goToDashboard = () => {
    window.location.href = "/Aplicacao-GUI-de-Email/#/dashboard";
  };

  const goBack = () => setSelectedEmail(null);

  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex flex-col lg:flex-row">
      {/* Sidebar - Outbox ativo */}
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
            <SidebarItem iconUrl={outboxUrl} label="Outbox" active />
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

        <main className="flex-1 px-4 pb-24 lg:pb-10 lg:px-6 overflow-y-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Emails Enviados
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Lista de Emails */}
            <div
              className={`lg:w-96 bg-[#0f1b3a]/80 backdrop-blur-xl rounded-3xl border border-cyan-800/40 shadow-2xl overflow-hidden ${
                selectedEmail ? "hidden lg:block" : "block"
              }`}
            >
              <div className="p-4 border-b border-cyan-800/30 flex gap-2 flex-wrap">
                <button className="px-4 py-2 bg-cyan-600/30 text-cyan-300 rounded-xl text-sm font-medium">
                  Por data
                </button>
                <button className="px-4 py-2 hover:bg-white/10 rounded-xl text-sm">
                  Por destinatário
                </button>
                <button className="px-4 py-2 hover:bg-white/10 rounded-xl text-sm">
                  Por status
                </button>
              </div>

              <div className="divide-y divide-cyan-800/30">
                {sentEmails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`p-5 cursor-pointer hover:bg-white/5 transition-all ${
                      selectedEmail?.id === email.id
                        ? "bg-cyan-900/30 border-l-4 border-cyan-400"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{email.to}</h4>
                      <div className="flex items-center gap-2">
                        <img
                          src={getStatusIcon(email.status)}
                          alt={getStatusText(email.status)}
                          className={`w-5 h-5 ${
                            // ← só esta linha muda
                            email.status === "delivered"
                              ? "text-green-400"
                              : email.status === "pending"
                              ? "text-yellow-400" // amarelo para "em fila"
                              : "text-red-400"
                          }`}
                        />
                        <span className="text-sm text-cyan-400">
                          {email.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-cyan-300 font-medium">{email.subject}</p>
                    <p className="text-sm text-gray-400 mt-1 truncate">
                      {email.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pré-visualização */}
            <div
              className={`flex-1 ${
                selectedEmail ? "block" : "hidden lg:block"
              }`}
            >
              {selectedEmail ? (
                <div className="bg-[#0f1b3a]/80 backdrop-blur-xl rounded-3xl border border-cyan-800/40 shadow-2xl h-full flex flex-col">
                  {/* Seta Voltar Mobile */}
                  <div className="lg:hidden p-4 border-b border-cyan-800/30 flex items-center gap-3">
                    <button
                      onClick={goBack}
                      className="p-2 hover:bg-white/10 rounded-xl transition-all"
                    >
                      <img
                        src={arrowLeftUrl}
                        alt="Voltar"
                        className="w-6 h-6 filter-white"
                      />
                    </button>
                    <h3 className="text-xl font-bold text-cyan-300">
                      {selectedEmail.subject}
                    </h3>
                  </div>

                  <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
                    <div className="hidden lg:block text-2xl font-bold text-cyan-300 mb-6">
                      {selectedEmail.subject}
                    </div>
                    <p className="text-lg text-gray-300 mb-6">
                      Para:{" "}
                      <span className="text-cyan-300">{selectedEmail.to}</span>{" "}
                      • {selectedEmail.date}
                    </p>
                    <div className="flex items-center gap-3 mb-8">
                      <img
                        src={getStatusIcon(selectedEmail.status)}
                        alt={getStatusText(selectedEmail.status)}
                        className={`w-7 h-7 ${
                          // ← só esta linha muda
                          selectedEmail.status === "delivered"
                            ? "text-green-400"
                            : selectedEmail.status === "pending"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      />
                      <span
                        className={`text-xl font-bold ${
                          selectedEmail.status === "delivered"
                            ? "text-green-400"
                            : selectedEmail.status === "pending"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {getStatusText(selectedEmail.status)}
                      </span>
                    </div>
                    <div className="text-gray-300 leading-relaxed text-lg">
                      {selectedEmail.body}
                    </div>
                  </div>

                  <div className="p-6 border-t border-cyan-800/30 flex gap-4">
                    <button className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:from-green-400 hover:to-emerald-500 transform hover:scale-105 transition-all">
                      Reenviar
                    </button>
                    <button className="flex-1 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:from-red-400 hover:to-pink-500 transform hover:scale-105 transition-all">
                      Apagar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="hidden lg:flex bg-[#0f1b3a]/80 backdrop-blur-xl rounded-3xl border border-cyan-800/40 shadow-2xl p-10 text-center text-gray-400 h-full items-center justify-center">
                  <p className="text-xl">Seleciona um email para visualizar</p>
                </div>
              )}
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
              active
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
