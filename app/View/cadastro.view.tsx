export default function CadastroView(config: any) {
    const {

        Cadastrar,
        nome,
        setNome,
        email,
        setEmail,
        username,
        setUsername,
        senha,
        setSenha

    } = config;

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={Cadastrar}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
