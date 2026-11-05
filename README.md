# Ritmo – Gestor de Tarefas

Aplicação web de gestão de tarefas desenvolvida em **HTML, CSS e JavaScript (sem frameworks), como projeto final de JavaScript do curso CESAE.

O nome **Ritmo** reflete a ideia de organizar o dia a dia ao teu próprio ritmo: planeia tarefas num calendário, acompanha o progresso e consulta o tempo e os feriados num só lugar.

## Funcionalidades

- **Login por email** – o primeiro acesso pede o nome; cada utilizador tem as suas tarefas, cidade e preferências guardadas separadamente.
- **Dashboard**
  - Saudação personalizada, data e hora atualizadas
  - Estatísticas: tarefas concluídas, ativas, em andamento e total
  - Barra de progresso com percentagem concluída e mensagem de celebração
  - Lista de tarefas de hoje
  - **Tempo atual** de uma cidade à escolha (Open-Meteo)
  - **Próximos feriados em Portugal** (Nager.Date)
- **Tarefas**
  - Criar, editar, concluir e remover tarefas, com data associada e validação
  - Filtros: Todas, Ativas, Em andamento, Concluídas
  - Pesquisa por texto
  - **Calendário mensal** navegável, com filtro por dia e destaque de feriados
- **Tema claro/escuro**
- **Layout responsivo** com menu lateral recolhível em ecrãs pequenos

## Tecnologias

| Área | Detalhes |
| --- | --- |
| Estrutura | HTML5 |
| Estilo | CSS3 (fonte Poppins via Google Fonts) |
| Lógica | JavaScript (ES6+), manipulação do DOM, `fetch` |
| Persistência | `localStorage` |
| APIs | [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api), [Open-Meteo Forecast](https://open-meteo.com/en/docs), [Nager.Date](https://date.nager.at/Api) |

Todas as APIs são públicas e **não requerem chave**.

## Estrutura do projeto

```
TarefaFinalJS/
├── index.html          # Página única (login + aplicação)
├── css/
│   └── style.css       # Estilos e temas
├── js/
│   ├── elementos.js    # Referências aos elementos do DOM
│   ├── script.js       # Login/logout, navegação, tema, data/hora
│   ├── apis.js         # Tempo (Open-Meteo) e feriados (Nager.Date)
│   ├── tarefas.js      # CRUD, filtros, pesquisa e contadores
│   ├── calendario.js   # Calendário mensal
│   └── eventos.js      # Registo dos event listeners
└── images/
    └── favicon.ico
```

## Como executar

Não é necessária instalação nem build.

1. Clona o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd TarefaFinalJS
   ```
2. Abre o `index.html` no browser (ou usa a extensão **Live Server** do VS Code).
3. Introduz um email, indica o teu nome e começa a organizar as tarefas.

> É preciso ligação à internet para o tempo, os feriados e as fontes.

## Notas

- Os dados ficam guardados apenas no `localStorage` do browser; limpar os dados do site apaga as tarefas.

## Autora

Bruna Gama – projeto final de JavaScript, CESAE.
