

export default function ContaDesativadaView(config: any) {
    const {
        user,
        setUser,
        senha,
        setSenha, 
        nome,
        setNome,
        username,
        Reativar,
        Logout,

    } = config;
    
  return (
    <div>
      <h1>Conta Desativada</h1>
      {username && <p>Usuário: {username}</p>}
      <button onClick={Reativar}>Reativar Conta</button>
      <button onClick={Logout}>Sair</button>
    </div>
  );
}
