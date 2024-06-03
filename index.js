import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = 'localhost';
const port = 3003;
const app = express();

let listaEmpresa = [];


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


function cadastrarEmpresa(req, res){
    const cnpj = req.body.cnpj;
    const RazaoNome = req.body.RazaoNome;
    const nome = req.body.nome;
    const cidade = req.body.cidade;
    const endereco = req.body.endereco;
    const estado = req.body.estado;
    const cep = req.body.cep;
    const email = req.body.email;
    const telefone = req.body.telefone;
    if(cnpj && RazaoNome && nome && cidade && endereco && estado && cep && email && telefone){
        listaEmpresa.push({
            cnpj: cnpj,
            RazaoNome: RazaoNome,
            nome: nome,
            cidade: cidade,
            endereco: endereco,
            estado: estado,
            cep: cep,
            email: email,
            telefone: telefone
        });
        res.redirect('/listarEmpresa');
    }else{
        res.write(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            <title>Cadastro de Empresa</title>
        </head>
        <body>
            <div class="container m-5">
                <legend>Cadastro de Empresa</legend>
                <form method="post" action="/cadastrarEmpresa" class="row g-3 needs-validation" novalidate>
                    <div class="col-md-4">
                      <label for="cnpj" class="form-label">CNPJ</label>
                      <input type="text" class="form-control" name="cnpj" id="cnpj" value="${cnpj}" required>`);
        if(!cnpj){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira um cnpj válido.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="RazaoNome" class="form-label">Razão Social/Nome</label>
                      <input type="text" class="form-control" name="RazaoNome" id="RazaoNome" value="${RazaoNome}" required>`);
        if(!RazaoNome){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira uma Razão Social/Nome válida.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="nome" class="form-label">Nome Fantasia</label>
                      <input type="text" class="form-control" name="nome" id="nome" value="${nome}" required>`);
        if(!nome){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira um Nome Fantasia válido.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="cidade" class="form-label">Cidade</label>
                      <input type="text" class="form-control" name="cidade" id="cidade" value="${cidade}" required>`);
        if(!cidade){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira uma cidade válida.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="endereco" class="form-label">Endereço</label>
                      <input type="text" class="form-control" name="endereco" id="endereco" value="${endereco}" required>`);
        if(!endereco){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira um endereço válido.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-6">
                        <label for="estado" class="form-label">Estado</label>
                        <select class="form-select" id="estado" name="estado" required>
                            <option selected disabled value="">Escolha...</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
        `)
        if(!estado){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, selecione um estado.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="cep" class="form-label">CEP</label>
                      <input type="text" class="form-control" name="cep" id="cep" value="${cep}" required>`);
        if(!cep){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira um CEP válido.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" class="form-control" name="email" id="email" value="${email}" required>`);
        if(!email){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira um email válido.
                        </div>
            `);
        }
        res.write(`
                    </div>
                    <div class="col-md-4">
                      <label for="telefone" class="form-label">Telefone</label>
                      <input type="text" class="form-control" name="telefone" id="telefone" value="${telefone}" required>`);
        if(!telefone){
            res.write(`
                        <div class="alert alert-danger" role="alert">
                            Por favor, insira um telefone válido.
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

app.post('/cadastrarEmpresa', usuarioIsAuth, cadastrarEmpresa)

app.get('/listarEmpresa', usuarioIsAuth, (req, res) => {
    res.write(`
    <html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <title>Lista de Empresa</title>
    </head>
    <body>
        <h1>Lista de Empresa</h1>
        <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">CNPJ</th>
                <th scope="col">Razão Social/Nome</th>
                <th scope="col">Nome Fantasia</th>
                <th scope="col">Cidade</th>
                <th scope="col">Endereço</th>
                <th scope="col">Estado</th>
                <th scope="col">CEP</th>
                <th scope="col">Email</th>
                <th scope="col">Telefone</th>
            </tr>
        </thead>
        <tbody>
            ${listaEmpresa.map((item, index) => {
                return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.cnpj}</td>
                    <td>${item.RazaoNome}</td>
                    <td>${item.nome}</td>
                    <td>${item.cidade}</td>
                    <td>${item.endereco}</td>
                    <td>${item.estado}</td>
                    <td>${item.cep}</td>
                    <td>${item.email}</td>
                    <td>${item.telefone}</td>                    
                </tr>
                `
            })}
        </tbody>
        </table>
        <a href="/index.html">Voltar</a>
        <a href="./cadastroEmpresa.html">Cadastrar</a>
        <p>Ultimo acesso: ${req.cookies.lastAcessData}</p>
    </body>
    </html>
    `)
    res.end()
})

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});