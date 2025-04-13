import * as fs from 'fs';
import * as readlineSync from 'readline-sync';

class Pessoa {
  constructor(
    public nome: string,
    public matricula: string,
    public endereco: string,
    public telefone: string
  ) {}

  toString(): string {
    return `${this.nome} (${this.matricula})`;
  }
}


class Membro extends Pessoa {
  constructor(
    nome: string,
    matricula: string,
    endereco: string,
    telefone: string
  ) {
    super(nome, matricula, endereco, telefone);
  }

  toString(): string {
    return `Membro: ${this.nome}, Matrícula: ${this.matricula}, Endereço: ${this.endereco}, Telefone: ${this.telefone}`;
  }
}




class Livro {
  constructor(
    private titulo: string,
    private autor: string,
    private isbn: string,
    private anoPublicacao: number
  ) {}

  
  getTitulo(): string {
    return this.titulo;
  }

  getAutor(): string {
    return this.autor;
  }

  getIsbn(): string {
    return this.isbn;
  }

  getAnoPublicacao(): number {
    return this.anoPublicacao;
  }


  setTitulo(titulo: string): void {
    this.titulo = titulo;
  }

  setAutor(autor: string): void {
    this.autor = autor;
  }

  setIsbn(isbn: string): void {
    this.isbn = isbn;
  }

  setAnoPublicacao(ano: number): void {
    this.anoPublicacao = ano;
  }

  
  exibirInformacoes(): string {
    return `Título: ${this.titulo}, Autor: ${this.autor}, ISBN: ${this.isbn}, Ano: ${this.anoPublicacao}`;
  }


  toJSON(): object {
    return {
      titulo: this.titulo,
      autor: this.autor,
      isbn: this.isbn,
      anoPublicacao: this.anoPublicacao,
    };
  }
}


class SistemaCadastroLivros {
  private livros: Livro[] = [];
  private arquivoLivros = 'livros.json';

  constructor() {
    this.carregarDados();
  }

  adicionarLivro(livro: Livro): void {
    this.livros.push(livro);
    this.salvarDados();
    console.log("Livro adicionado com sucesso!");
  }

  listarLivros(): void {
    if (this.livros.length === 0) {
      console.log("Nenhum livro cadastrado.");
    } else {
      this.livros.forEach((livro, index) => {
        console.log(`${index + 1}. ${livro.exibirInformacoes()}`);
      });
    }
  }

  atualizarLivro(indice: number, titulo?: string, autor?: string, isbn?: string, ano?: number): void {
    const livro = this.livros[indice];
    if (!livro) {
      console.log("Livro não encontrado.");
      return;
    }
    if (titulo) livro.setTitulo(titulo);
    if (autor) livro.setAutor(autor);
    if (isbn) livro.setIsbn(isbn);
    if (ano) livro.setAnoPublicacao(ano);

    this.salvarDados();
    console.log("Livro atualizado com sucesso!");
  }

  removerLivro(indice: number): void {
    if (indice < 0 || indice >= this.livros.length) {
      console.log("Índice inválido.");
      return;
    }
    this.livros.splice(indice, 1);
    this.salvarDados();
    console.log("Livro removido com sucesso!");
  }

  buscarLivroPorTitulo(titulo: string): Livro | undefined {
    return this.livros.find((livro) => livro.getTitulo().toLowerCase() === titulo.toLowerCase());
  }

  private salvarDados(): void {
    fs.writeFileSync(this.arquivoLivros, JSON.stringify(this.livros.map(l => l.toJSON()), null, 2));
  }

  private carregarDados(): void {
    if (fs.existsSync(this.arquivoLivros)) {
      const dados = JSON.parse(fs.readFileSync(this.arquivoLivros, 'utf-8'));
      this.livros = dados.map((l: any) => new Livro(l.titulo, l.autor, l.isbn, l.anoPublicacao));
    }
  }
}
class Emprestimo {
  devolvido: boolean = false;

  constructor(
    public livro: Livro,
    public membro: Membro,
    public dataEmprestimo: string,
    public dataDevolucao: string
  ) {}

  devolver() {
    this.devolvido = true;
    this.dataDevolucao = new Date().toLocaleString();
  }

  toString(): string {
    const devolucaoStatus = this.devolvido ? 'Devolvido' : 'Em aberto';
    return `Empréstimo: ${this.livro.exibirInformacoes()} | Membro: ${this.membro} | Data Emprestimo: ${this.dataEmprestimo} | Status: ${devolucaoStatus}`;
  }
}
  function salvarEmprestimos(emprestimos: Emprestimo[]): void {
    const data = JSON.stringify(emprestimos, null, 2);
    fs.writeFileSync('emprestimos.json', data, 'utf-8');
  }
  
  
  function carregarEmprestimos(): Emprestimo[] {
    if (fs.existsSync('emprestimos.json')) {
      const data = fs.readFileSync('emprestimos.json', 'utf-8');
      const emprestimosData = JSON.parse(data);
      return emprestimosData.map(
        (emprestimo: any) =>
          new Emprestimo(emprestimo.livro, emprestimo.membro, emprestimo.dataEmprestimo, emprestimo.dataDevolucao)
      );
    }
    return [];
  }
  function salvarMembros(membros: Membro[]): void {
    const data = JSON.stringify(membros, null, 2);
    fs.writeFileSync('membros.json', data, 'utf-8');
  }
  
  
  function carregarMembros(): Membro[] {
    if (fs.existsSync('membros.json')) {
      const data = fs.readFileSync('membros.json', 'utf-8');
      const membrosData = JSON.parse(data);
      return membrosData.map(
        (membro: any) =>
          new Membro(membro.nome, membro.matricula, membro.endereco, membro.telefone)
      );
    }
    return [];
  }


function menu() {
  const sistemaLivros = new SistemaCadastroLivros();
  let membros: Membro[] = carregarMembros();
  let emprestimos: Emprestimo[] = carregarEmprestimos();

  while (true) {
    console.log("\nSistema de Gerenciamento de Biblioteca");
    console.log("1. Cadastrar Membro");
    console.log("2. Listar Membros");
    console.log("3. Atualizar Membro");
    console.log("4. Remover Membro");
    console.log("5. Realizar Emprestimo");
    console.log("6. Listar Emprestimos Ativos");
    console.log("7. Registrar Devolucao");
    console.log("8. Cadastrar Livro");
    console.log("9. Listar Livros");
    console.log("10. Atualizar Livro");
    console.log("11. Remover Livro");
    console.log("12. Sair");

    const opcao = readlineSync.questionInt("Escolha uma opcao: ");

    switch (opcao) {
      case 1:
        const nome = readlineSync.question("Nome: ");
        const matricula = readlineSync.question("Matricula: ");
        const endereco = readlineSync.question("Endereco: ");
        const telefone = readlineSync.question("Telefone: ");
        const membro = new Membro(nome, matricula, endereco, telefone);
        membros.push(membro);
        salvarMembros(membros);
        console.log("Membro cadastrado com sucesso!");
        break;
      case 2:
        console.log("\nLista de Membros:");
        membros.forEach((membro) => console.log(membro.toString()));
        break;
      case 3:
        const matriculaUpdate = readlineSync.question("Informe a matricula do membro: ");
        const membroAtualizar = membros.find(m => m.matricula === matriculaUpdate);
        if (!membroAtualizar) {
          console.log("Membro nao encontrado.");
          break;
        }
        membroAtualizar.nome = readlineSync.question("Novo nome: ");
        membroAtualizar.endereco = readlineSync.question("Novo endereco: ");
        membroAtualizar.telefone = readlineSync.question("Novo telefone: ");
        salvarMembros(membros);
        console.log("Membro atualizado com sucesso!");
        break;
      case 4:
        const matriculaRemover = readlineSync.question("Informe a matricula do membro a ser removido: ");
        membros = membros.filter(m => m.matricula !== matriculaRemover);
        salvarMembros(membros);
        console.log("Membro removido com sucesso!");
        break;
      case 5:
        const livroTitulo = readlineSync.question("Titulo do Livro: ");
        const matriculaMembro = readlineSync.question("Matricula do Membro: ");
        const membroEmprestimo = membros.find((m) => m.matricula === matriculaMembro);
        if (!membroEmprestimo) {
          console.log("Membro nao encontrado!");
          break;
        }
        const livroEmprestimo = sistemaLivros.buscarLivroPorTitulo(livroTitulo);
        if (!livroEmprestimo) {
          console.log("Livro nao encontrado!");
          break;
        }
        const dataEmprestimo = new Date().toLocaleString();
        const emprestimo = new Emprestimo(livroEmprestimo, membroEmprestimo, dataEmprestimo, "");
        emprestimos.push(emprestimo);
        salvarEmprestimos(emprestimos);
        console.log("Emprestimo realizado com sucesso!");
        break;
      case 6:
        console.log("\nLista de Emprestimos Ativos:");
        emprestimos
          .filter((emp) => !emp.devolvido)
          .forEach((emp) => console.log(emp.toString()));
        break;
      case 7:
        const matriculaDevolucao = readlineSync.question("Matricula do Membro para devolucao: ");
        const emprestimoDevolucao = emprestimos.find(
          (emp) => emp.membro.matricula === matriculaDevolucao && !emp.devolvido
        );
        if (!emprestimoDevolucao) {
          console.log("Empréstimo nao encontrado ou ja devolvido.");
          break;
        }
        emprestimoDevolucao.devolver();
        salvarEmprestimos(emprestimos);
        console.log("Livro devolvido com sucesso!");
        break;
      case 8:
        const titulo = readlineSync.question("Titulo: ");
        const autor = readlineSync.question("Autor: ");
        const isbn = readlineSync.question("ISBN: ");
        const ano = readlineSync.questionInt("Ano de Publicacao: ");
        const livro = new Livro(titulo, autor, isbn, ano);
        sistemaLivros.adicionarLivro(livro);
        break;
      case 9:
        sistemaLivros.listarLivros();
        break;
      case 10:
        const indiceUpdate = readlineSync.questionInt("Informe o indice do livro a ser atualizado: ");
        const tituloUpdate = readlineSync.question("Novo titulo: ");
        const autorUpdate = readlineSync.question("Novo autor: ");
        const isbnUpdate = readlineSync.question("Novo ISBN: ");
        const anoUpdate = readlineSync.questionInt("Novo ano: ");
        sistemaLivros.atualizarLivro(indiceUpdate, tituloUpdate, autorUpdate, isbnUpdate, anoUpdate);
        break;
      case 11:
        const indiceRemover = readlineSync.questionInt("Informe o indice do livro a ser removido: ");
        sistemaLivros.removerLivro(indiceRemover);
        break;
      case 12:
        console.log("Saindo do sistema...");
        return;
      default:
        console.log("Opçao invalida! Tente novamente.");
        break;
    }
  }
}
menu();
