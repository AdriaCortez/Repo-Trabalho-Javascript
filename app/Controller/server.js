import express from 'express'
import { auth, Active } from './Profile/middlewares.controller.js'
import { Inscrever, Desativar, Reativar } from './Profile/user.controller.js'
import { tokenEnviado, mudarSenha, verificarLogin } from './Profile/auth.controller.js'
import ConfiguracoesGlobais from './global.controller.js'

const app = express ()
app.use(express.json())

app.get('/token-enviado', auth, async (req, res) => {
    try {

       return tokenEnviado()

    } catch (err) {
        console.log("Erro em /token-enviado:", err);
        res.status(500).json({error: "Algo deu errado no servidor! Verifique /token-invalido"})

    }
})
app.post('/inscrever', async (req, res) => {
    try {

      return Inscrever()

    } catch (err) {
        res.status(500).json({error: "Algo deu errado no servidor! Verifique /inscrever"})
   
    }
})

app.post('/verificar-logiin', async (req, res) => {
    try {

        return verificarLogin()

    } catch (err) {

         res.status(500).json({error: "Algo deu errado no servidor! Verifique /verificar-login"})
    
    }
})

app.put('/mudar-senha', auth, Active, async (req, res) => {
    try {
        
        return mudarSenha()

    } catch (err) {

        res.status(500).json({error: "Algo deu errado no servidor! Verifique /mudar-senha"})
        
    }
})

app.put('/desativar-conta', auth, Active, async (req, res) => {
    try {

        return Desativar()

    } catch (err) {

          res.status(500).json({error: "Algo deu errado no servidor! Verifique /desativat-conta"})

    }
})

app.put('/reativar-conta', auth, async (req, res) => {
    try {
        
        return Reativar()
        
    } catch (err) {

          res.status(500).json({error: "Algo deu errado no servidor! Verifique /reativar-conta"})

    }
})

ConfiguracoesGlobais();
