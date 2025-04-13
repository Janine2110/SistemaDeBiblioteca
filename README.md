# SistemaDeBiblioteca
# 📚 Sistema de Gerenciamento de Biblioteca

Este projeto é um sistema de gerenciamento de biblioteca feito em TypeScript, que roda no console e salva os dados em arquivos `.json`. Ele permite cadastrar e gerenciar **membros**, **livros** e **empréstimos**, com interface interativa via terminal.

---

## 💡 Funcionalidades

```
Sistema de Gerenciamento de Biblioteca

1. Cadastrar Membro
2. Listar Membros
3. Atualizar Membro
4. Remover Membro
5. Realizar Empréstimo
6. Listar Emprestimos Ativos
7. Registrar Devolução
8. Cadastrar Livro
9. Listar Livros
10. Atualizar Livro
11. Remover Livro
12. Sair
```

---

## 🧠 Estrutura do Sistema

### 📁 Módulos
- **Pessoa / Membro**: Armazena nome, matrícula, endereço e telefone.
- **Livro**: Possui título, autor, ISBN e ano de publicação.
- **Empréstimo**: Relaciona um livro a um membro com data de empréstimo e status de devolução.

### 💾 Armazenamento
- `membros.json`: salva os dados dos membros
- `livros.json`: armazena os livros cadastrados
- `emprestimos.json`: guarda os registros de empréstimos

---

## 🧪 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-biblioteca.git
   cd sistema-biblioteca
   ```

2. Instale as dependências:
   ```bash
   npm install readline-sync
   ```

3. Compile (caso use TypeScript):
   ```bash
   tsc
   ```

4. Execute o sistema:
   ```bash
   node dist/index.js
   ```

---

## 🧰 Tecnologias Utilizadas

- TypeScript
- Node.js
- readline-sync
- FileSystem (fs)

---
