const prompt = require("prompt-sync")();

let livros = [];
const generos = ["narrativo", "épico", "dramatico", "lírico"];

function adicionarLivro() {
    const nome = prompt("Informe o nome do livro a ser adicionado: ");
    const autor = prompt("Informe o nome do autor da obra: ");
    const paginas = parseInt(prompt("Informe o tamanho do livro (número de páginas): "), 10);
    console.log("Gêneros Disponíveis: ", generos.join(", "));
    const genero = prompt("Informe o gênero do livro: ");

    if (!generos.includes(genero)) {
        console.log("Gênero inválido.");
        return;
    }

    livros.push({ nome, autor, paginas, genero });
    console.log("Livro adicionado com sucesso!");
}

function removerLivro(nome) {
    livros = livros.filter(livro => livro.nome !== nome);
}

function listarLivros() {
    if (livros.length === 0) {
        console.log("Nenhum livro na biblioteca.");
    } else {
        livros.forEach((livro, index) => {
            console.log(`${index + 1}. Nome: ${livro.nome}, Autor: ${livro.autor}, Páginas: ${livro.paginas}, Gênero: ${livro.genero}`);
        });
    }
}

function atualizarLivro(nome, novosDetalhes) {
    const index = livros.findIndex(livro => livro.nome === nome);
    if (index !== -1) {
        livros[index] = { ...livros[index], ...novosDetalhes };
        console.log("Livro atualizado com sucesso!");
    } else {
        console.log("Livro não encontrado.");
    }
}

function exibirMenu() {
    console.log(`
    === Olá usuário, seja bem vindo à biblioteca Lionsdev! ===

                    1. Adicionar livro
                    2. Listar livros
                    3. Atualizar um livro
                    4. Remover livro
                    0. Sair
    `);
}

while (true) {
    exibirMenu();
    const opcao = parseInt(prompt("Por favor, selecione a opção desejada: "), 10);

    switch (opcao) {
        case 1:
            adicionarLivro();
            break;
        case 2:
            listarLivros();
            break;
        case 3:
            const nomeParaAtualizar = prompt("Informe o nome do livro a ser atualizado: ");
            const novoNome = prompt("Novo nome do livro (deixe vazio para manter o atual): ");
            const novoAutor = prompt("Novo autor do livro (deixe vazio para manter o atual): ");
            const novasPaginas = prompt("Novo número de páginas (deixe vazio para manter o atual): ");
            const novoGenero = prompt("Novo gênero do livro (deixe vazio para manter o atual): ");

            const novosDetalhes = {};
            if (novoNome) novosDetalhes.nome = novoNome;
            if (novoAutor) novosDetalhes.autor = novoAutor;
            if (novasPaginas) novosDetalhes.paginas = parseInt(novasPaginas, 10);
            if (novoGenero) {
                if (!generos.includes(novoGenero)) {
                    console.log("Gênero inválido.");
                    break;
                }
                novosDetalhes.genero = novoGenero;
            }

            atualizarLivro(nomeParaAtualizar, novosDetalhes);
            break;
        case 4:
            const nomeParaRemover = prompt("Informe o nome do livro a ser removido: ");
            removerLivro(nomeParaRemover);
            console.log("Livro removido com sucesso!");
            break;
        case 0:
            console.log("Saindo...");
            process.exit();
        default:
            console.log("Opção inválida. Tente novamente.");
    }
}
