//Propriedade dos componentes

 export interface LoginViewPropriedades {
  username: string;
  senha: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setSenha: React.Dispatch<React.SetStateAction<string>>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}; //Isso aqui é uma tipagem para o componente saber quais propriedades ele vai receber e seus tipos

