// controller da criação do nosso usuário
// aquele que recebe a request do express e devolve uma resposta

// E pq não criei uma pastinha controllers?
// Um dos padrões que estou gostando de seguir na criação das minha API com node
// é o package by feature.
// Package by feature é um padrão onde estrutura as pastas da nossa aplicação
// por feature, por funcionalidade. Por exemplo, a funcionalide de criação de
// do usuário, todos os arquivos que são relacionados com a funcionalidade de
// criação do usuário eu coloco dentro da pasta CreateUser, dentro de useCases.
// Não interessa se é o controller, useCase, testes, tudo isso vai aqui dentro.
import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  // nós não estamos dependendo de uma implementação, 
  // a gente está dependendo de um contrato
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password
      })

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}