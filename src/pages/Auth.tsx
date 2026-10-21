
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

type Usuario = {
  nome: string;
  email: string;
  senha: string;
};

export default function Auth() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  function trocarModo(novoModo: "login" | "cadastro") {
    setModo(novoModo);
    setErro("");
    setSucesso("");
    setSenha("");
    setConfirmarSenha("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    const emailNormalizado = email.trim().toLowerCase();

    if (!emailNormalizado.includes("@") || !emailNormalizado.includes(".")) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    // Demonstração local: não usar como autenticação de produção.
    const usuarios: Usuario[] = JSON.parse(
      localStorage.getItem("onze_usuarios") || "[]"
    );

    if (modo === "cadastro") {
      if (!nome.trim()) {
        setErro("Digite seu nome.");
        return;
      }

      if (usuarios.some((usuario) => usuario.email === emailNormalizado)) {
        setErro("Este e-mail já está cadastrado.");
        return;
      }

      if (senha !== confirmarSenha) {
        setErro("As senhas não coincidem.");
        return;
      }

      usuarios.push({
        nome: nome.trim(),
        email: emailNormalizado,
        senha,
      });

      localStorage.setItem("onze_usuarios", JSON.stringify(usuarios));
      setSucesso("Conta criada com sucesso! Você já pode entrar.");
      setModo("login");
      setNome("");
      setSenha("");
      setConfirmarSenha("");
      return;
    }

    const usuario = usuarios.find(
      (item) =>
        item.email === emailNormalizado && item.senha === senha
    );

    if (!usuario) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    localStorage.setItem(
      "onze_sessao",
      JSON.stringify({ nome: usuario.nome, email: usuario.email })
    );

    navigate("/");
  }

  return (
    <main className="auth">
      <section className="auth__painel">
        <Link to="/" className="auth__logo" aria-label="Onze WebStore - início">
          <span className="auth__marca">11</span>
          <span>ONZE<span className="auth__logo-destaque">.</span></span>
        </Link>

        <div className="auth__conteudo">
          <span className="auth__eyebrow">PAIXÃO PELO FUTEBOL</span>

          <h1>
            {modo === "login" ? (
              <>Bom te ver <span>de novo.</span></>
            ) : (
              <>Faça parte <span>do time.</span></>
            )}
          </h1>

          <p className="auth__descricao">
            {modo === "login"
              ? "Entre na sua conta e encontre o manto perfeito para você."
              : "Crie sua conta e fique mais perto da camisa do seu time."}
          </p>

          <div className="auth__abas">
            <button
              type="button"
              className={modo === "login" ? "ativa" : ""}
              onClick={() => trocarModo("login")}
            >
              Entrar
            </button>

            <button
              type="button"
              className={modo === "cadastro" ? "ativa" : ""}
              onClick={() => trocarModo("cadastro")}
            >
              Criar conta
            </button>
          </div>

          <form className="auth__form" onSubmit={handleSubmit}>
            {modo === "cadastro" && (
              <label>
                Nome completo
                <input
                  type="text"
                  placeholder="Como podemos te chamar?"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label>
              E-mail
              <input
                type="email"
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label>
              Senha
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Mínimo de 6 caracteres"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                autoComplete={
                  modo === "login" ? "current-password" : "new-password"
                }
                minLength={6}
                required
              />
            </label>

            {modo === "cadastro" && (
              <label>
                Confirmar senha
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite a senha novamente"
                  value={confirmarSenha}
                  onChange={(event) =>
                    setConfirmarSenha(event.target.value)
                  }
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </label>
            )}

            <label className="auth__mostrar">
              <input
                type="checkbox"
                checked={mostrarSenha}
                onChange={(event) => setMostrarSenha(event.target.checked)}
              />
              Mostrar senha
            </label>

            {erro && <p className="auth__mensagem auth__mensagem--erro" role="alert">{erro}</p>}
            {sucesso && <p className="auth__mensagem auth__mensagem--sucesso" role="status">{sucesso}</p>}

            <button className="auth__submit" type="submit">
              {modo === "login" ? "Entrar na minha conta" : "Criar minha conta"}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="auth__rodape">
            {modo === "login" ? "Ainda não tem uma conta?" : "Já faz parte do time?"}{" "}
            <button
              type="button"
              onClick={() =>
                trocarModo(modo === "login" ? "cadastro" : "login")
              }
            >
              {modo === "login" ? "Cadastre-se" : "Entre aqui"}
            </button>
          </p>
        </div>

        <p className="auth__copyright">
          © {new Date().getFullYear()} Onze WebStore. Feito para quem vive futebol.
        </p>
      </section>

      <aside className="auth__visual" aria-label="Onze WebStore">
        <div className="auth__visual-overlay" />
        <div className="auth__frase">
          <span>MAIS QUE UM JOGO.</span>
          <h2>Vista a paixão.<br />Viva o futebol.</h2>
          <p>O manto que representa você.</p>
        </div>
        <span className="auth__numero">011</span>
      </aside>
    </main>
  );
}
