import type React from "react";

//Propriedade dos componentes

export interface LoginViewPropriedades {
  username: string;
  senha: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setSenha: React.Dispatch<React.SetStateAction<string>>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

