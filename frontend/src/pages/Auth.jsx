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
      alert("Login realizado com sucesso!");
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
    <div className="min-h-screen bg-[#0a1428] flex items-center justify-center p-0">
      {/* Força o corpo da página a ocupar a tela toda e remove qualquer fundo branco padrão */}
      <style jsx global>{`
        html,
        body,
        #__next,
        .__className_hash {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: #0a1428 !important; /* cor escura igual ao fundo */
        }
      `}</style>

      <div
        className="bg-[#0f172a] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-cyan-900/50 
                      h-screen max-h-screen md:h-auto md:max-h-none md:rounded-3xl md:my-8"
      >
        {/* Header */}
        <div className="bg-[#0f1b3a] p-8 pb-6 text-center">
          <h1 className="text-3xl font-bold text-cyan-400 mb-8 tracking-wider">
            Mail Application
          </h1>

          {/* Toggle Login / Register */}
          <div className="relative inline-flex bg-[#1e293b] rounded-full p-1 w-80 max-w-full mx-auto">
            <div
              className="absolute top-1 left-1 w-1/2 h-[calc(100%-8px)] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500 shadow-lg"
              style={{
                transform:
                  mode === "login" ? "translateX(0%)" : "translateX(100%)",
              }}
            />
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrors({});
              }}
              className={`relative z-10 w-1/2 py-3 text-lg font-semibold transition-all duration-300 ${
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
              className={`relative z-10 w-1/2 py-3 text-lg font-semibold transition-all duration-300 ${
                mode === "register" ? "text-white" : "text-cyan-300"
              }`}
            >
              REGISTAR
            </button>
          </div>
        </div>

        {/* Formulário */}
        <div className="p-8 pt-10">
          <form className="space-y-7" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Nome Completo"
                  value={name}
                  onChange={handleNameChange}
                  className={`w-full px-4 py-3 bg-[#1e293b] border ${
                    errors.name ? "border-red-500" : "border-cyan-800"
                  } rounded-xl text-cyan-100 placeholder-cyan-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div className="space-y-1">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`w-full px-5 py-3 bg-[#1e293b] border ${
                  errors.email ? "border-red-500" : "border-cyan-800"
                } rounded-xl text-cyan-100 placeholder-cyan-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                className={`w-full px-5 py-3 bg-[#1e293b] border ${
                  errors.password ? "border-red-500" : "border-cyan-800"
                } rounded-xl text-cyan-100 placeholder-cyan-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300`}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-8 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300"
            >
              {mode === "login" ? "ENTRAR" : "CADASTRAR"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
