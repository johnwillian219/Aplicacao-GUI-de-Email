import { useState } from "react";

export default function Auth() {
  const [mode, setMode] = useState("login"); // login | register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateName(fullName) {
    const nameParts = fullName.trim().split(/\s+/);
    return nameParts.length >= 2 && nameParts[1]?.length > 0;
  }

  function validateForm() {
    const newErrors = {};

    if (mode === "register") {
      if (!name.trim()) newErrors.name = "Nome é obrigatório";
      else if (!validateName(name))
        newErrors.name = "Por favor, insira nome e sobrenome";
    }

    if (!email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido";

    if (!password) newErrors.password = "Password é obrigatória";
    else if (password.length < 6)
      newErrors.password = "Password deve ter pelo menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    if (mode === "register") {
      alert("Conta criada com sucesso!");
      setMode("login");
      setName("");
    } else {
      window.location.href = "/dashboard";
    }
    setEmail("");
    setPassword("");
    setErrors({});
  }

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);
    if (mode === "register") {
      if (value.trim() && !validateName(value)) {
        setErrors((prev) => ({
          ...prev,
          name: "Por favor, insira nome e sobrenome",
        }));
      } else {
        setErrors((prev) => ({ ...prev, name: undefined }));
      }
    }
  }

  return (
    <>
      {/* Fundo escuro total + viewport fixo para mobile */}
      <div className="fixed inset-0 bg-[#0a1428] flex flex-col">
        {/* Força fundo escuro em tudo (Next.js/Vite) */}
        <style jsx global>{`
          html,
          body,
          #__next,
          .__className_hash {
            margin: 0;
            padding: 0;
            height: 100%;
            background: #0a1428 !important;
            overflow: hidden;
          }
        `}</style>

        {/* Conteúdo centralizado com scroll suave */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Card principal */}
            <div className="bg-[#0f172a] rounded-3xl shadow-2xl border border-cyan-900/50 overflow-hidden">
              {/* Header */}
              <div className="bg-[#0f1b3a] p-6 pb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-10 tracking-wider">
                  Mail Application
                </h1>

                {/* Toggle responsivo */}
                <div className="relative inline-flex bg-[#1e293b] rounded-full p-1 w-full max-w-xs mx-auto">
                  <div
                    className="absolute inset-1 w-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500 shadow-lg"
                    style={{
                      transform:
                        mode === "login"
                          ? "translateX(0%)"
                          : "translateX(100%)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrors({});
                    }}
                    className={`relative z-10 flex-1 py-3.5 text-base sm:text-lg font-bold transition-all ${
                      mode === "login" ? "text-white" : "text-cyan-300"
                    }`}
                  >
                    LOGIN
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setErrors({});
                    }}
                    className={`relative z-10 flex-1 py-3.5 text-base sm:text-lg font-bold transition-all ${
                      mode === "register" ? "text-white" : "text-cyan-300"
                    }`}
                  >
                    REGISTAR
                  </button>
                </div>
              </div>

              {/* Formulário */}
              <div className="p-6 sm:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {mode === "register" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Nome Completo"
                        value={name}
                        onChange={handleNameChange}
                        className={`w-full px-5 py-4 bg-[#1e293b] border ${
                          errors.name ? "border-red-500" : "border-cyan-800"
                        } rounded-xl text-cyan-100 placeholder-cyan-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all text-base`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm">{errors.name}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`w-full px-5 py-4 bg-[#1e293b] border ${
                        errors.email ? "border-red-500" : "border-cyan-800"
                      } rounded-xl text-cyan-100 placeholder-cyan-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all text-base`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      className={`w-full px-5 py-4 bg-[#1e293b] border ${
                        errors.password ? "border-red-500" : "border-cyan-800"
                      } rounded-xl text-cyan-100 placeholder-cyan-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all text-base`}
                    />
                    {errors.password && (
                      <p className="text-red-400 text-sm">{errors.password}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-8 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-xl hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 active:scale-95"
                  >
                    {mode === "login" ? "ENTRAR" : "CADASTRAR"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
