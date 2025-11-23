import { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";

import bellOnUrl from "../icons/bell-on.svg";
import bellOffUrl from "../icons/bell-off.svg";
import dashboardUrl from "../icons/dashboard.svg";
import inboxUrl from "../icons/inbox.svg";
import outboxUrl from "../icons/outbox.svg";
import sendUrl from "../icons/send.svg";
import settingsUrl from "../icons/settings.svg";
import mailUrl from "../icons/email.svg";
import pencilUrl from "../icons/pencil-square.svg";
import trashUrl from "../icons/trash.svg";
import usersUrl from "../icons/users.svg";
import likeUrl from "../icons/like.svg";
import logoutUrl from "../icons/logout.svg";
import menuUrl from "../icons/menu.svg";

export default function Dashboard() {
  const [userType] = useState("admin"); // muda para "admin" ou "user" para testar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { enabled: notificationsEnabled, toggle: toggleNotifications } =
    useNotifications();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/Aplicacao-GUI-de-Email/#/auth";
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

  const stats = [
    { iconUrl: mailUrl, label: "Recebidos", value: "520", route: goToInbox },
    { iconUrl: sendUrl, label: "Enviados", value: "423", route: goToOutbox },
    { iconUrl: trashUrl, label: "Lixeira", value: "52", route: "#" },
    { iconUrl: likeUrl, label: "Likes", value: "1.4K", route: "#" },
  ];

  const updates = [
    { title: "Atualização do sistema", author: "Admin", date: "17 Nov" },
    { title: "Nova funcionalidade", author: "Admin", date: "14 Nov" },
    { title: "Nova funcionalidade", author: "Admin", date: "05 Nov" },
  ];

  const usersList = [
    { name: "João Gomes", email: "joao.gomes@mail.com" },
    { name: "Manuel Lopes", email: "manuel.lopes@mail.com" },
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex flex-col lg:flex-row">
      {/* Sidebar*/}
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
            <SidebarItem iconUrl={dashboardUrl} label="Dashboard" active />
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
        {/* Header no mobile */}
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

        <main className="flex-1 px-4 pb-24 lg:pb-10 lg:px-8 overflow-y-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Painel de Controlo
          </h2>

          {/* Cards clicáveis - mobile horizontal / desktop quadrados */}
          <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-6 mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                onClick={stat.route}
                className="cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {/* Mobile - Horizontal */}
                <div className="lg:hidden bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-6 flex items-center gap-6 shadow-2xl hover:shadow-cyan-500/50">
                  <div className="bg-white/20 p-4 rounded-2xl">
                    <img
                      src={stat.iconUrl}
                      alt={stat.label}
                      className="w-12 h-12 filter-white"
                    />
                  </div>
                  <div>
                    <p className="text-5xl font-bold">{stat.value}</p>
                    <p className="text-lg text-cyan-100">{stat.label}</p>
                  </div>
                </div>

                {/* Desktop - Quadrado */}
                <div className="hidden lg:block bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-cyan-800/50 hover:border-cyan-500/70 transition-all">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-2xl w-fit mb-4 shadow-xl">
                    <img
                      src={stat.iconUrl}
                      alt={stat.label}
                      className="w-12 h-12 filter-white"
                    />
                  </div>
                  <p className="text-cyan-300 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold mt-2">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SECÇÃO QUE AGORA TODOS VÊEM */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Apenas Admin vê Utilizadores */}
            {userType === "admin" && (
              <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-cyan-800/40 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-5 rounded-2xl">
                    <img
                      src={usersUrl}
                      alt="Users"
                      className="w-10 h-10 filter-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">138</h3>
                    <p className="text-cyan-300 text-lg">Utilizadores</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {usersList.map((user, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-[#1e293b]/60 rounded-2xl p-5 hover:bg-[#1e293b]/80 transition-all"
                    >
                      <div>
                        <p className="font-semibold text-lg">{user.name}</p>
                        <p className="text-sm text-cyan-300">{user.email}</p>
                      </div>
                      ....
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Atualizações → TODOS VÊEM (admin e user) */}
            <div
              className={`${
                userType === "admin" ? "lg:col-span-1" : "lg:col-span-2"
              } bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-cyan-800/40 shadow-2xl`}
            >
              <h3 className="text-2xl font-bold mb-8 text-cyan-300">
                Atualizações
              </h3>
              <div className="space-y-5">
                {updates.map((upd, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-[#1e293b]/60 rounded-2xl p-5"
                  >
                    <div>
                      <p className="font-medium text-lg">{upd.title}</p>
                      <p className="text-sm text-gray-400">{upd.author}</p>
                    </div>
                    <span className="text-cyan-400 font-medium">
                      {upd.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Nav Mobile */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f1b3a]/95 backdrop-blur-2xl border-t border-cyan-900/50 z-40">
          <div className="grid grid-cols-4 py-4 text-center">
            <MobileNavItem iconUrl={dashboardUrl} label="Dashboard" active />
            <MobileNavItem iconUrl={inboxUrl} label="Recebidos" />
            <MobileNavItem iconUrl={sendUrl} label="Enviados" />
            <MobileNavItem iconUrl={settingsUrl} label="Config" />
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

// Componentes menu lateral
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
