import { uuid } from 'uuidv4';

export class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      // Não deixar a responsabilidade de criar um id de um usuário para o banco de dados.
      // Como o banco de dados é uma interface externa, ou seja, é uma ferramenta que
      // pertence a camada de infraestrutura da aplicação, pode acontecer de algum dia
      // trocarmos de banco de dados, desconfigurar alguma coisa dentro do banco de dados,
      // como por exemplo o postgres, essa geração de uuid depende uma extensão habilitada
      // dentro do postgres. Pode ser que um dia a gente rode nossa aplicação em um postgres
      // que não tem essa extensão habilitada.

      // O que é feito aqui é criar o identificador das entidades da minha aplicação a partir
      // do próprio código e não deixar para uma responsabilidade do banco, não usar por exemplo
      // auto increment, ou qualquer coisa assim.
      this.id = uuid();
    }
  }
}