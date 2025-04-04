import React from "react";
import {TextBlock} from "../../components/tools/TextBlock";
import {CodeSnippet} from "../../components/tools/CodeSnippet";
import {MermaidDiagram} from "../../components/tools/MermaidDiagram";
import {Quiz} from "../../components/tools/Quiz";
import {Resources} from "../../components/tools/Resources";
import Layout from "../../components/Layout";

const GithubActionsPage: React.FC = () => {
  return (
    <Layout>
      <div className='space-y-8 p-6'>
        <TextBlock
          header='Understanding GitHub Actions'
          text='GitHub Actions is a powerful continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline. It enables you to create workflows that can build and test every pull request to your repository, or deploy merged pull requests to production.'
        />

        <TextBlock
          header='Problem Space'
          text='Before GitHub Actions, developers needed to:
          • Integrate multiple third-party CI/CD services
          • Maintain separate configurations across different platforms
          • Pay for multiple services with different billing models
          • Deal with limited integration capabilities with GitHub

          GitHub Actions solves these challenges by providing a native, integrated solution that works seamlessly with GitHub repositories.'
        />

        <MermaidDiagram
          diagramPath='/diagrams/github-actions-architecture.mmd'
          caption='GitHub Actions Architecture'
        />

        <CodeSnippet
          fileName='ci.yml'
          language='yaml'
          code={`name: CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Run tests
      run: npm test`}
        />

        <TextBlock
          header='Key Concepts'
          text='GitHub Actions is built around several key concepts:
          • Events: Specific activities that trigger a workflow
          • Workflows: Automated procedures defined in YAML files
          • Jobs: A set of steps that execute on the same runner
          • Steps: Individual tasks that run commands or actions
          • Actions: Reusable units of code that can be shared
          • Runners: Servers that run your workflows'
        />

        <Quiz
          title='GitHub Actions Basics'
          question={{
            question:
              "What file extension is used for GitHub Actions workflow files?",
            options: [
              {id: "A", text: ".yml/.yaml"},
              {id: "B", text: ".json"},
              {id: "C", text: ".xml"},
              {id: "D", text: ".config"},
            ],
            correctAnswer: "A",
            explanation:
              "GitHub Actions workflows are defined in YAML files, which use either .yml or .yaml extensions.",
          }}
        />

        <Resources
          title='Additional Resources'
          links={[
            {
              title: "GitHub Actions Documentation",
              url: "https://docs.github.com/en/actions",
              description:
                "Official documentation covering all aspects of GitHub Actions",
            },
            {
              title: "GitHub Actions Marketplace",
              url: "https://github.com/marketplace?type=actions",
              description: "Browse thousands of community-created actions",
            },
            {
              title: "GitHub Actions Starter Workflows",
              url: "https://github.com/actions/starter-workflows",
              description:
                "Collection of template workflows for various languages and tools",
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default GithubActionsPage;
