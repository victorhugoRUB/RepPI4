import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = 'localhost';
const port = 3003;
const app = express();

let listaProduto = [];


app.use(session({
    secret: 'Minh4Ch4v3S3cr3t4',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 10 // 10 minutos
    }
}))

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));

function usuarioIsAuth(req, res, next){
    if(req.session.isAuth){
        next()
    }
    else{
        res.redirect('/login.html');
    }
}


function cadastrarProduto(req, res){
    const codBarra = req.body.codBarra;
    const descProd = req.body.descProd;
    const precoCusto = req.body.precoCusto;
    const precoVenda = req.body.precoVenda;
    const dataVal = req.body.dataVal;
    const qnt = req.body.qnt;
    const nome = req.body.nome;
    if(codBarra && descProd && precoCusto && precoVenda && dataVal && qnt && nome){
        listaProduto.push({
            codBarra: codBarra,
            descProd: descProd,
            precoCusto: precoCusto,
            precoVenda: precoVenda,
            dataVal: dataVal,
            qnt: qnt,
            nome: nome
        });
        res.redirect('/listarProduto');
    }else{
        res.write(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            <title>Cadastro de Produto</title>
        </head>
        <body>
            <div class="container m-5">
                <legend>Cadastro de Produto</legend>
                <form method="post" action="/cadastrarProduto" class="row g-3 needs-validation" novalidate>
                    <div class="col-md-4">
                      <label for="codBarra" class="form-label">Código de barras</label>
                      <input type="text" class="form-control" name="codBarra" id="codBarra" value="${codBarra}" required>`);
        if(!codBarra){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira um código de barras válido.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="descProd" class="form-label">Descrição do Produto</label>
                      <input type="text" class="form-control" name="descProd" id="descProd" value="${descProd}" required>`);
        if(!descProd){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira uma descrição válida.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="precoCusto" class="form-label">Preço de custo</label>
                      <input type="number" class="form-control" name="precoCusto" id="precoCusto" value="${precoCusto}" required>`);
        if(!precoCusto){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira um preço de custo válido.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="precoVenda" class="form-label">Preço de venda</label>
                      <input type="number" class="form-control" name="precoVenda" id="precoVenda" value="${precoVenda}" required>`);
        if(!precoVenda){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira um preço de venda válido.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="dataVal" class="form-label">Data de validade</label>
                      <input type="date" class="form-control" name="dataVal" id="dataVal" value="${dataVal}" required>`);
        if(!dataVal){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira uma data de validade válida.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="qnt" class="form-label">Quantidade</label>
                      <input type="number" class="form-control" name="qnt" id="qnt" value="${qnt}" required>`);
        if(!qnt){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira uma quantidade válida.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="nome" class="form-label">Nome</label>
                      <input type="text" class="form-control" name="nome" id="nome" value="${nome}" required>`);
        if(!nome){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira um nome válido.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-12">
                      <button class="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
            </body>
            </html>
            `)
        
        res.end();
    }
}

function authUsuario(req, res){
    const usuario = req.body.usuario
    const senha = req.body.senha
    if(usuario === 'admin' && senha === '123'){
        req.session.isAuth = true
        res.cookie('lastAcessData', new Date().toLocaleString(), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30
        })
        res.redirect('/')
    }else{
        res.write(`
            <p>Usuario ou senha invalidos</p>
            <input type="button" value="Voltar" onclick="history.go(-1)"/>
        `)
        return res.end()
    }
}

app.post('/login', authUsuario)

app.get('/login', (req, res) => {
    res.redirect('/login.html')
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login.html')
})

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(usuarioIsAuth, express.static(path.join(process.cwd(), 'private')));

app.post('/cadastrarProduto', usuarioIsAuth, cadastrarProduto)

app.get('/listarProduto', usuarioIsAuth, (req, res) => {
    res.write(`
    <html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <title>Lista de Produto</title>
    </head>
    <body>
        <h1>Lista de Produto</h1>
        <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Codigo de barras</th>
                <th scope="col">Descricao do Produto</th>
                <th scope="col">Preco de custo</th>
                <th scope="col">Preco de venda</th>
                <th scope="col">Data de validade</th>
                <th scope="col">Qnt em estoque</th>
                <th scope="col">Nome do fabricante</th>
            </tr>
        </thead>
        <tbody>
            ${listaProduto.map((item, index) => {
                return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.codBarra}</td>
                    <td>${item.descProd}</td>
                    <td>${item.precoCusto}</td>
                    <td>${item.precoVenda}</td>
                    <td>${item.dataVal}</td>
                    <td>${item.qnt}</td>
                    <td>${item.nome}</td>
                </tr>
                `
            })}
        </tbody>
        </table>
        <a href="/index.html">Voltar</a>
        <a href="./cadastroProduto.html">Cadastrar</a>
        <p>Ultimo acesso: ${req.cookies.lastAcessData}</p>
    </body>
    </html>
    `)
    res.end()
})

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});