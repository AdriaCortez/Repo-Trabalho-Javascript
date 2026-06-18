"use client";

import { useState } from 'react';
import { useNavigate } from 'react-router';
import Login from '../layout/loginForm';
import { ok, erro as toastErro } from '../alerts/toasts';

export function meta() {
  return [
    { title: 'Login — NoTicks' },
    { name: 'description', content: 'Acesse sua conta' },
  ];
}

export default function LoginPage() {

  const [username, setUsername] = useState('');
  const [senha, setSenha]       = useState('');
  const [erro, setErro]         = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const login = await fetch('http://localhost:4000/auth-login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, senha })
      });

      const data = await login.json();

      if (!login.ok) {
        console.error('Erro backend:', data);
        setErro(data.error || 'Credenciais inválidas.');
        return;
      } //tratamento de erro caso o login falhe

      ok('Login realizado com sucesso!');
      console.log('Login bem-sucedido:', data);
      console.log('Navegando pro home...');

      navigate('/home') //Autenticado? Vai direto pro quadro

    } catch (err) {
      console.error('Erro no fetch:', err);
      toastErro('Não foi possível conectar ao servidor.');
      setErro('Não foi possível conectar ao servidor.');

    } finally {
      setCarregando(false);
    }
  };

  return (
    <Login
      username={username}
      setUsername={setUsername}
      senha={senha}
      setSenha={setSenha}
      erro={erro}
      carregando={carregando}
      handleLogin={handleLogin}
    />
  );
}
