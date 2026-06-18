import express from 'express'
import { auth, Active } from './Profile/middlewares.controller.js'
import { Inscrever, Desativar, Reativar } from './Profile/user.controller.js'
import { tokenEnviado, mudarSenha, verificarLogin } from './Profile/auth.controller.js'
import { createTask, updateTask, deleteTask } from './Task/task.controller.js'
import ConfiguracoesGlobais from './global.controller.js'

const app = express ()
app.use(express.json())

app.get('/token-enviado', auth, async (req, res) => {
    try {

       return tokenEnviado(req, res)

    } catch (err) {
        console.log("Erro em /token-enviado:", err);
        res.status(500).json({error: "Algo deu errado no servidor! Verifique /token-invalido"})

    }
})
app.post('/inscrever', async (req, res) => {
    try {

      return Inscrever(req, res)

    } catch (err) {
        res.status(500).json({error: "Algo deu errado no servidor! Verifique /inscrever"})
   
    }
})

app.post('/verificar-logiin', async (req, res) => {
    try {

        return verificarLogin(req, res)

    } catch (err) {

         res.status(500).json({error: "Algo deu errado no servidor! Verifique /verificar-login"})
    
    }
})

app.put('/mudar-senha', auth, Active, async (req, res) => {
    try {
        
        return mudarSenha(req, res)

    } catch (err) {

        res.status(500).json({error: "Algo deu errado no servidor! Verifique /mudar-senha"})
        
    }
})

app.put('/desativar-conta', auth, Active, async (req, res) => {
    try {

        return Desativar(req, res)

    } catch (err) {

          res.status(500).json({error: "Algo deu errado no servidor! Verifique /desativat-conta"})

    }
})

app.put('/reativar-conta', auth, async (req, res) => {
    try {
        
        return Reativar(req, res)
        
    } catch (err) {

          res.status(500).json({error: "Algo deu errado no servidor! Verifique /reativar-conta"})

    }
})


app.post('/criar-tarefa', auth, Active, async (req, res) => {
    try {

        return createTask(req, res);

    } catch (err) {

        return res.status(500).json({error: "Algo deu errado ao criar tarefa"
        });

    }
});


app.put('/editar-tarefa/:id', auth, Active, async (req, res) => {
    try {

        return updateTask(req, res);

    } catch (err) {

        return res.status(500).json({
            error: "Algo deu errado ao editar tarefa"
        });

    }
});


app.delete('/excluir-tarefa/:id', auth, Active, async (req, res) => {
    try {

        return deleteTask(req, res);

    } catch (err) {

        return res.status(500).json({
            error: "Algo deu errado ao excluir tarefa"
        });

    }
});

app.get('/ping',async(req, res)=>{
    return res.send('pong');
});


ConfiguracoesGlobais(app);
