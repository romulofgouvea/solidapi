# nvm instalado
# nvm install --lts
npm install --global yarn
yarn init -y
yarn add express
yarn add typescript ts-node-dev -D
# Criar o arquivo tsconfig.json
yarn tsc --init
# Mudar no arquivo tsconfig.json "target": "es5" para "target": "es2017"    
# Apagar o "strict": true,
# Adiconar "allowJs": true,
yarn add @types/express -D
yarn add uuidv4

Entities são as models, mas nem toda entiites são representações de tabelas no banco de dados.

Repositories são classes especificas para a gente fazer a comunicação entre as funcionalidades da aplicação com o banco de dados, com a estrutura que a gente vai armazenar esses dados.

Os useCases baseados até no diagrama de classe de uso que a gente aplica lá na Engenharia de Software
são as ações que um determinado tipo de usuário pode realizar dentro da nossa aplicação. A gente pode pensar que cada caso de uso da nossa aplicação como uma funcionalidade que o usuário pode fazer aqui dentro. A única funcionalidade que a gente tem até agora na nossa API é a criação de um usuário.