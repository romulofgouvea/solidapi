// não deve saber exatamente onde está sendo armazenado esses usuários.
// Ele sabe exatamente qual a forma de comunicação que ele vai ter com
// o repositório, que vai servir os dados desses usuários, mas não sabe 
// se é um postgres, mongodb, mysql, ou seja, nossa lógica fica totalmente
// desacoplada da camada de infraestrutura (camada que define como nossa
// aplicação comunica com o mundo externo)

import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

// esse constructor vai começar a receber uma dependência.
// Lebra do Dependency inversion principle, eu não vou
// instânciar um novo repositório, eu não vou usar diretamente
// meu repositório que salva os usuários. Eu vou depender de uma
// interface para que seja possível aplicar o Liskov Substitution
// principle e todo o Dependency inversion principle, ou seja, o
// meu CreateUserUseCase não sabe exatamente com qual tipo de repositório
// que ele está falando, se é um repositório do postgres, mysql, mongodb,
// para ele não interessa, ele vai só chamar os métodos, e depois podemos
// fazer a troca desses repositórios da maneira que a gente quiser
export class CreateUserUseCase {
  private usersRepository: IUsersRepository;
  private mailProvider: IMailProvider;

  constructor(usersRepository: IUsersRepository, mailProvider: IMailProvider) {
    // Aplicação da Dependency Inversion Principle. Eu não estou dependendo
    // diretamente da implementação do repositorio dos usuários, eu estou dependendo
    // apenas da abstração, da interface daquela implementação.

    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
    // Aplicação do Liskov Substitution Principle. A partir do momente que estamos
    // recebendo o usersRepository e falando que o tipo dele é um IUsersRepository,
    // ou seja, uma interface, um contrato que define quais são os métodos que vão
    // existir dentro do repositorio, não interessa qual repositório eu vou passar
    // para ele, se é um postgres, mysql, mongodb
  }

  async execute(data: ICreateUserRequestDTO) {
    // O useCase não é preocupado como nossa aplicação vai se comunicar com o banco, 
    // com uma camada de infraestrutura, camada externa.
    // O useCase é preocupado somente com a implementação da lógica, da regra de negócio
    // da aplicação
    const userAlreadyExist = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExist) {
      throw new Error('User already exists.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Equipe do Meu App',
        email: 'equipe@meuapp.com',
      },
      subject: 'Seja bem-vindo à plataforma',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    })
    // A criação do usuário não sabe exatamente como que está sendo feito o envio de email,
    // não sabe se tá sendo utilizado a Amazon SAS, nodemailer, mailtrap, etc, 
    // ele basicamente entende qual é o contrato, qual que é a forma que ele tem de
    // comunicação, qual é o protocolo de comunicação que existe para enviar um email.
    // Agora como que será enviado, o nosso caso de uso não tá preocupado, ou seja,
    // a gente está fazendo a inversão das dependências
  }
}

// A classe CreateUserUseCase tem uma única responsabilidade que é a criação de
// um usuário. Ela não tem a responsabilidade de como que esse usuário vai ser 
// salvo, se ele vai ser salvo no banco, se ele vai ser salvo no arquivo JSON, etc.
// A única responsabilidade dessa classe tem é de verificar se o usuário existe ou não,
// criar esse usuário.
// Como cada useCase tem apenas um método, chamado execute, a gente nunca vai ter
// uma lógica, replicada entre vários lugares da nossa aplicação, qualquer outro lugar
// da nossa aplicação que precisar criar um usuário, sempre vai passar por esse arquivo.
// Então eu tenho um único arquivo de detém toda lógica, toda regra de negócio de como
// criar um usuário dentro da minha aplicação.