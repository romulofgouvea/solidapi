// conecta a implementação do postgres e do mailtrap 
// com as interfaces e com nosso useCase

import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const postgresUsersRepository = new PostgresUsersRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider,
);

const createUserController = new CreateUserController(
  createUserUseCase
);

export { createUserUseCase, createUserController };

// Resumindo tudo que a gente fez:
// - desconectamos muito a camada de infra da nossa camada de domínio, nossa camada funcional
//   ou seja, toda camada que se conecta com o mundo externo, por exemplo um serviço de 
//   envio de email, ela vai ficar abstraida, ou seja, a gente tem os providers 
//   não são tocadas diretamente pelos nossos useCases quando a gente esta desenvolvendo,
//   por isso que criamos os contratos, para que a gente consiga aplicar o Liskov Substitution
//   principle e o Dependency Inversion Principle

// - aplicamos o Single Responsability Principle:
//   [x] o CreateUserUseCase tem a única responsabilidade de criar o usuário, faz algumas
//   verificações e cria o usuário
//   [x] o CreateUserControler tem a única responsabildade de receber a requisição de 
//   criação do usuário através do protocolo HTTP, processar essa requisição através do
//   nosso useCase e devolver uma resposta. Ou seja, a única responsabilidade dessa classe
//   é a comunicação do nossa aplicação com mundo externo através do protocolo HTTP
//   [x] o ICreateUserRequestDTO tem a única responsabilidade de determinar como vai ser
//   a transmissão dessa mensagem entre o controller e o useCase
//   etc