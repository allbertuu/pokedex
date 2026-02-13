# 🚀 Onboarding: Guia de Viagem pela Pokédex

> "O lixo de uns é o tesouro de outros."  
> No desenvolvimento, o que muitos negligenciam (documentação, clareza e facilidade de revisão), eu trato como prioridade. Este projeto não é apenas um consumo de API; é um reflexo de como organizo meu pensamento e facilito a vida de quem trabalha comigo.

Bem-vindo(a)! Se você é dev, gestor ou até mesmo leigo (e vou me esforçar pra alcançar você), este guia foi feito para que você não perca tempo tentando entender tudo *o que* eu fiz, mas sim para que possamos discutir *por que* tomei cada decisão.

## 📌 Sumário

* [✨ Funcionalidades](#-funcionalidades)
* [🧠 Decisões Técnicas](#-decisões-técnicas-lógica-tecnologias-e-paradigmas)
* [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
* [🚀 Próximos Passos (Roadmap)](#-próximos-passos-roadmap)
* [🏁 Como rodar e revisar o projeto](#-como-rodar-e-revisar-o-projeto)
* [🍮 Pausa para o Café](#-pausa-para-o-café)

---

## ✨ Funcionalidades

Aqui está o resumo das funcionalidades implementadas.

* **🔍 Busca:** Barra de busca funcional na página principal. Ao pressionar **Enter**, a lista é filtrada dinamicamente, priorizando a intenção do usuário.
* **📜 Listagem:** Lista de Pokémons pré-carregada para evitar telas vazias no primeiro acesso.
* **📑 Detalhes (incompleto):** Página dedicada para cada Pokémon, exibindo informações, estatísticas e gráficos.
* **🛣️ Roteamento Avançado:** Navegação multipáginas utilizando um sistema de rotas baseado em arquivos (`/home` e `/details/$pokemonName`).
* **♿ Acessibilidade (A11y):** Navegação completa via teclado. Use `Tab` para percorrer e `Enter` para selecionar.
* **🖼️ Fallback de Imagem:** Tratativa para Pokémons sem foto oficial com a clássica imagem do *"Quem é esse Pokémon?"*.
<img width="263" height="324" alt="image" src="https://github.com/user-attachments/assets/09ff6571-5fcc-4d5b-9c82-078c0ad1475c" />

### 🏆 Bonus!

Os seguintes itens extras que garantem a robustez do projeto:

* [x] **Error Handling:** Sistema de captura de erros com feedback visual e contato direto com o dev.
* [x] **Documentation:** Este guia completo de onboarding.
* [x] **Linting:** Configuração rigorosa com Biome para código limpo.
* [ ] **Charts (incompleto):** Visualização de stats com Recharts.
* [x] **Unit Testing:** Lógica central testada com Vitest.

## 🧠 Decisões técnicas (lógica, tecnologias e paradigmas)

Minha maior decisão técnica foi separar as responsabilidades da `PokemonsList`. Segui uma arquitetura **inspirada no MVC (Model-View-Controller)** adaptada ao ecossistema React.

<img width="614" height="127" alt="image" src="https://github.com/user-attachments/assets/960d177f-fa00-46f6-bc90-00e6e18e1f8e" />

### 1. A Camada de Serviço (Service Layer)
Isolei toda a comunicação externa e as regras de negócio em `src/services/pokedex.ts`.

* **Por que?** Desacoplamento total. Se a PokéAPI mudar seu contrato ou se precisarmos trocar a biblioteca de fetch, a interface do usuário permanece intacta.

* **O Ganho**: O código de negócio - as leis que regem o mundo real - não "vaza" para os componentes. Isso facilita a criação de Mocks para testes e centraliza a fonte única da verdade.

### 2. Separação de Preocupações (Smart Hook + Context)

Deleguei o controle de fluxo de dados (loading, erro, filtragem e fetching) para um **Custom Hook integrado ao Context**.

* **O Ganho:** A `PokemonsList` foca 100% na "View". Ela não sabe como os dados chegam; ela apenas os renderiza da melhor forma visual. Isso reduz a carga cognitiva e torna o código altamente testável.

### 3. UX na busca por Pokémon

* **Tratativa de 404:** Em vez de exibir um erro sistêmico, trato o "Not Found" como um estado da interface, informando amigavelmente que nenhum Pokémon foi encontrado.
* **Feedback Proativo:** Implementei uma forma de contato direto comigo que envia o erro automaticamente.
<img width="519" alt="image" src="https://github.com/user-attachments/assets/596c1d1c-a4dd-4aa3-8390-b2c1a9ef4e6a" />


## 🛠️ Tech Stack

> **Disclaimer:** Toda decisão técnica serve apenas para este snapshot do projeto. Não tenho remorso em mudar de ideia caso os requisitos mudem. A melhor decisão é a que resolve o problema do negócio com a ferramenta certa.

| Tecnologia | Por que usei? |
| --- | --- |
| **Vite** | Aplicação simples, poucas rotas e sem necessidade de SEO pesado. Custo de deploy menor (Static) sem precisar de servidor Node.js para SSR. |
| **TanStack Router** | Roteamento robusto com **Type Safety** absoluto e excelente suporte para *search params* (rota `/details`). |
| **TailwindCSS** | Optei por não usar libs de componentes (como AntDesign) para manter o bundle leve e ter controle total do design (algo que valorizo muito) sem "sobrescrever" estilos pesados. Cuidei para que a interface tivessse boa acessibilidade, ainda que dessa forma mais "crua". |
| **Biome** | Toolchain *all-in-one* para lint e format. Mais rápido que Prettier e com quase zero configuração. |
| **Vitest** | Rapidez e ótima DX para garantir que o "coração" da lógica esteja seguro, com bons testes automatizados. |
| **pokenode-ts** | Recomendação oficial da PokéAPI. Tipagem *built-in* que facilita a integração e paginação, além de função de cache configurado com Axios. |

#### 💡 Destaque Técnico: Arquivos `.d.ts`

Utilizei arquivos de definição de tipos específicos para não "sujar" o código de produção com tipos que não geram código executável, mantendo a compilação limpa e eficiente. Além de um contrato único do formato dos dados para toda a aplicação se basear.

## 🚀 Próximos Passos (Roadmap)

Se eu tivesse mais tempo (ou para uma V2), meu foco seria:

* **GraphQL:** Implementar para evitar *over-fetching* na home, buscando e organizando apenas os dados estritamente necessários para a listagem inicial.
* **Paginação:** Dessa forma a página inicial pode mostrar mais Pokémons e o usuário navegar na vasta coleção que existe. O módulo `pokenode-ts` facilita esse processo ainda mais.
* **Busca por termo incompleto (fuzzy search):** Eu percebi que a PokéAPI não permite pesquisar dessa forma nativamente, como um _fuzzy search_. A aplicação hoje busca por termos exatos, mas seria muito legal implementar isso de alguma forma no futuro. As soluções que pensei eram desnecessariamente complexas...

## 🏁 Como rodar e revisar o projeto:

1. Clone o repositório:

   ```bash
   git clone https://github.com/allbertuu/pokedex.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd pokedex
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra o navegador e acesse:

   ```bash
   http://localhost:3000
   ```

## 🧪 Testes

Para executar os testes, utilize o comando:

```bash
npm test
```

**Recomendação de Revisão:** Comece pelo arquivo `src/services/pokedex.ts` (a base), passe pelo `src/contexts/PokemonContext.tsx` (a orquestração) e termine nos componentes da pasta `pages/`.

---

## 🍮 Pausa para o Café

Se este projeto fosse um doce, seria um **pudim**: clássico, mas que exige a técnica certa para não ficar cheio de furinhos (bugs). Sou um desenvolvedor apaixonado por cultura japonesa, corredor amador e alguém que acredita que código limpo é, acima de tudo, um gesto de respeito aos meus colegas de equipe.

---

Fim.  
_Esse quam videri_
