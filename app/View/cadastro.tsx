"use client";

import { useState } from 'react';
import { useNavigate } from 'react-router';
import Cadastro from '../layout/subscribeForm';
import { ok, erro as toastErro } from '../alerts/toasts';

export function meta() {
  return [
    { title: 'Cadastro — Kanban' },
    { name: 'description', content: 'Crie sua conta' },
  ];
}

export default function Subscribe() {

  const [nome, setNome]                     = useState('');
  const [username, setUsername]             = useState('');
  const [email, setEmail]                   = useState('');
  const [senha, setSenha]                   = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro]                     = useState('');
  const [carregando, setCarregando]         = useState(false);

  const navigate = useNavigate();

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validações no front antes de chamar a API
    if (!nome || !username || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const subscribe = await fetch('http://localhost:4000/inscrever', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha, nome, username })
      });

      const data = await subscribe.json();

      ok('Cadastro realizado com sucesso!')

      if (!subscribe.ok) {
        console.error('Erro backend:', data);
        setErro(data.error || 'Erro ao criar conta.');
        return;
      } //tratamento de erro caso ocorra algum erro na hora da inscrição.

      console.log('Cadastro enviado com sucesso:', data);
      console.log('Navegando pro login...');

      navigate('/login') //Cadastro foi validado? Vai direto pro login

    } catch (err) {
      console.error('Erro no fetch:', err);
      toastErro('Não foi possível conectar ao servidor.');
      setErro('Não foi possível conectar ao servidor.');

    } finally {
      setCarregando(false);
    }
  };

  return (
    <Cadastro
      nome={nome}
      setNome={setNome}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      senha={senha}
      setSenha={setSenha}
      confirmarSenha={confirmarSenha}
      setConfirmarSenha={setConfirmarSenha}
      erro={erro}
      carregando={carregando}
      handleSubscribe={handleSubscribe}
    />
  );
}
