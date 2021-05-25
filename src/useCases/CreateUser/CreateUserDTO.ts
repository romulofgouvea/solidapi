// data tranfer objeto - DTO
// quando a gente vai transferir um objeto de uma camada para a outra
// a gente utiliza o DTO, ou seja, dentro do controller eu estou na
// camada de infraestrutura, é a camada do mundo externo, é a camada
// que o usuário se comunica, é a camada onde se faz a ligação direta
// com algum protocolo (que nosso caso é o HTTP).
// Eae eu mudo para uma camada de dominio, que é a camada interna da
// nossa aplicação, que é o nosso useCase, eu preciso ter exatamente
// qual é o formato dos dados que vão ser transmitidos entre uma camada
// e outra.

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}