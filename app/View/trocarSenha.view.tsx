export default function TrocarSenhaView(config: any) {
  const {
    senhaAtual,
    novaSenha,
    confirmarSenha,
    user,
    carregando,
    setSenhaAtual,
    setNovaSenha,
    setConfirmarSenha,
    setUser,
    setCarregando,
    MudarSenha,
    Logout,
  } = config;
  return (
    <div>
      <h1>Trocar Senha</h1>
      {user && (
        <form onSubmit={MudarSenha}>
          <input
            type="password"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            placeholder="Senha Atual"
          />
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            placeholder="Nova Senha"
          />
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirmar Senha"
          />
          <button type="submit" disabled={carregando}>
            {carregando ? "Alterando..." : "Alterar Senha"}
          </button>
        </form>
      )}
    </div>
  );
}
