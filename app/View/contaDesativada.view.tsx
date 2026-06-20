export default function ContaDesativadaView() {
  return (
    <div>
      <h1>Conta Desativada</h1>
      {username && <p>Usuário: {username}</p>}
      <button onClick={Reativar}>Reativar Conta</button>
      <button onClick={HandleLogout}>Sair</button>
    </div>
  );
}
