# Sistema de Login genérico utilizando NextJS + MongoDB + NextAuth com Typescript

Uma aplicação simples que permite o usuário realizar o Login e o Logout da mesma, protegendo algumas páginas se o mesmo não estiver autenticado. Implementando assim Autenticação e Autorização. As tecnologias utilizadas no desenvolvimento foram MongoDB como DB para persistir os usuários que se cadastraram, e o NextAuth para realizar o processo de SignIn e SignOut e proteção de rotas/páginas configurado para utilizar o JWT(JSON Web Tokens) e cookies para armazenamento desse token, e claro o bcrypt para realizar os hashs nos passwords dos usuários e também verifica-los quando necessário na aplicação.

### Live demo

- [Generic Login App](https://nextjs-login-2077.vercel.app/ "Login App Homepage")

### É preciso ter a versão LTS do NodeJS instalado na máquina antes de todo o procedimento daqui descrito - ultima versão LTS até o momento da finalização deste projeto é (18.12.1)

- Acesse para fazer o download e a instalação do mesmo no endereço: https://nodejs.org/

### Instalação e Configuração do Projeto para rodar direto na tua máquina

- Baixe os arquivos e extraia a pasta NEXTJS-GENERIC-LOGIN.

- No mesmo diretório "NEXTJS-GENERIC-LOGIN" abra o terminal/prompt de comandos e digite: npm install (Para instalar as dependências do projeto).

- No mesmo diretório "NEXTJS-GENERIC-LOGIN" crie um arquivo .env.local com as seguintes informações:

Acesse este site https://bcrypt-generator.com/ para gerar o hash do REGISTER_KEY que você escolher, e no Rounds deixe como "12" mesmo. Pois é esse campo no arquivo .env.local que permite filtrar quem pode ou não se cadastrar no sistema através da comparação quando o usuário entra com algum valor no input "P-Key". Implementei isso pois não queria deixar a aplicação mais complexa utilizando uma lógica de Roles e etc. OBS: Se no hash tiver qualquer símbolo de cifrão ("$") utilize scape ("\") antes do mesmo se não o arquivo irá apresentar erros e a aplicação não conseguirá interpretá-lo.

```
MONGODB_URI=mongodb+srv://<yours_mongodb_user>:<yours_mongodb_password>@clusterpkdemos.bruyipn.mongodb.net/yours_db_name?retryWrites=true&w=majority
SECRET=WhatEverSecretDoYouWantToPut
JWT_SECRET=WhatEverSecretDoYouWantToPut
NODE_ENV=development
REGISTER_KEY=HashedKeyThatYouChooseButWith12SaltAsAnOption  - Ex: \$2a\$12\$cXAPpGeA79EwsaVhsGarl.bdOAQO.zplRvLI1uN5MlwJJz5qOKTtO
```

### Inicializando a Aplicação NextJS Generic Login

- No mesmo diretório "NEXTJS-GENERIC-LOGIN" abra o terminal/prompt de comandos e digite: npm start (Para inicializar a aplicação).
