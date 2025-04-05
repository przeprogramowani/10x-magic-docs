import React from "react";
import { TextBlock } from "../../tools/TextBlock";
import { CodeSnippet } from "../../tools/CodeSnippet";
import { Quiz } from "../../tools/Quiz";
import { Resources } from "../../tools/Resources";
import { MermaidDiagram } from "../../tools/MermaidDiagram";

const GithubActionsPage: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Pierwsze kroki GitHub Actions: Automatyzacja przepływu pracy w repozytoriach
      </h1>

      <TextBlock
        header="Czym są GitHub Actions?"
        text="GitHub Actions to potężne narzędzie automatyzacji, które pozwala na tworzenie niestandardowych przepływów pracy (workflows) bezpośrednio w repozytoriach GitHub. Umożliwia automatyczne wykonywanie zadań takich jak testowanie, budowanie i wdrażanie aplikacji w odpowiedzi na różne zdarzenia w repozytorium.

Kluczowe zalety:
- **Integracja z GitHub**: Natywna integracja z repozytoriami i funkcjami GitHub
- **Elastyczność**: Możliwość tworzenia własnych akcji lub wykorzystania tysięcy gotowych z marketplace
- **Darmowy plan**: 2000 minut/miesiąc dla repozytoriów publicznych"
      />

      <MermaidDiagram
        diagramPath="/diagrams/github-actions-flow.mmd"
        caption="Architektura i przepływ pracy GitHub Actions"
      />

      <TextBlock
        header="Podstawowe pojęcia"
        text="W GitHub Actions występuje kilka kluczowych pojęć:

1. **Workflow** - Automatyczny proces składający się z jednego lub więcej zadań
2. **Event** - Zdarzenie, które wyzwala workflow (np. push, pull request)
3. **Job** - Zestaw kroków wykonywanych na tym samym runnerze
4. **Step** - Pojedyncze zadanie w ramach joba
5. **Action** - Najmniejsza, wielokrotnego użytku jednostka w workflow"
      />

      <CodeSnippet
        language="yaml"
        fileName="hello-world.yml"
        code={`name: Hello World Workflow

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Say Hello
        run: echo "Hello, GitHub Actions!"`}
      />

      <TextBlock
        header="Struktura plików workflow"
        text="Pliki workflow są przechowywane w katalogu `.github/workflows` w repozytorium. Każdy plik to osobny workflow napisany w formacie YAML. Workflow definiuje:

- Nazwę workflow
- Zdarzenia wyzwalające (triggers)
- Jeden lub więcej jobów
- Środowisko wykonania (runner)
- Kroki do wykonania"
      />

      <CodeSnippet
        language="yaml"
        fileName="build-test.yml"
        code={`name: Build and Test

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      - run: npm run build`}
      />

      <Quiz
        title="Sprawdź swoją wiedzę"
        question={{
          question: "Co to jest 'workflow' w GitHub Actions?",
          options: [
            { id: "A", text: "Pojedynczy skrypt wykonywany w repozytorium" },
            {
              id: "B",
              text: "Automatyczny proces składający się z jednego lub więcej zadań",
            },
            { id: "C", text: "Narzędzie do zarządzania repozytorium" },
            { id: "D", text: "System kontroli wersji" },
          ],
          correctAnswer: "B",
          explanation:
            "Workflow to automatyczny proces w GitHub Actions, który może zawierać wiele jobów i kroków, uruchamianych w odpowiedzi na określone zdarzenia w repozytorium.",
        }}
      />

      <Quiz
        title="Test praktyczny"
        question={{
          question: "Który plik konfiguracyjny jest wymagany do utworzenia GitHub Action?",
          options: [
            { id: "A", text: ".github/actions.yml" },
            { id: "B", text: ".github/workflows/[nazwa].yml" },
            { id: "C", text: "actions/workflow.yml" },
            { id: "D", text: ".actions/config.yml" },
          ],
          correctAnswer: "B",
          explanation:
            "Pliki konfiguracyjne GitHub Actions muszą być umieszczone w katalogu .github/workflows/ i mieć rozszerzenie .yml lub .yaml",
        }}
      />

      <Resources
        title="Dodatkowe materiały"
        links={[
          {
            title: "Dokumentacja GitHub Actions",
            url: "https://docs.github.com/en/actions",
            description: "Oficjalna dokumentacja z przykładami i najlepszymi praktykami",
          },
          {
            title: "GitHub Actions Marketplace",
            url: "https://github.com/marketplace?type=actions",
            description: "Gotowe akcje do wykorzystania w swoich workflow",
          },
          {
            title: "GitHub Actions - Pierwsze kroki",
            url: "https://docs.github.com/en/actions/quickstart",
            description: "Przewodnik szybkiego startu dla początkujących",
          },
        ]}
      />
    </div>
  );
};

export default GithubActionsPage;
