import React from "react";
import {TextBlock} from "../../components/tools/TextBlock";
import {CodeSnippet} from "../../components/tools/CodeSnippet";
import {Quiz} from "../../components/tools/Quiz";
import {Resources} from "../../components/tools/Resources";
import {MermaidDiagram} from "../../components/tools/MermaidDiagram";

const DockerPage: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-8 space-y-8'>
      <h1 className='text-4xl font-bold mb-8 text-white'>
        Docker: Containerization Made Simple
      </h1>

      <TextBlock
        header='What is Docker?'
        text={
          <>
            Docker is a platform that enables developers to build, package, and
            distribute applications as lightweight, portable containers. These
            containers include everything needed to run an application: code,
            runtime, system tools, libraries, and settings. This solves the
            age-old problem of "it works on my machine" by ensuring consistent
            behavior across different environments.
          </>
        }
      />

      <TextBlock
        header='Why Use Docker?'
        text={
          <>
            Docker addresses several critical challenges in modern software
            development:
            <ul className='list-disc pl-6 mt-4 space-y-2'>
              <li>
                Environment consistency across development, testing, and
                production
              </li>
              <li>Rapid application deployment and scaling</li>
              <li>Resource isolation and efficient resource utilization</li>
              <li>Version control and component reuse</li>
              <li>Simplified dependency management</li>
            </ul>
          </>
        }
      />

      <MermaidDiagram
        diagramPath='/diagrams/docker-architecture.mmd'
        caption='Docker Architecture Overview'
      />

      <CodeSnippet
        code={`# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]`}
        language='dockerfile'
        fileName='Dockerfile'
        showLineNumbers={true}
      />

      <TextBlock
        header='Key Docker Concepts'
        text={
          <>
            Understanding Docker requires familiarity with several fundamental
            concepts:
            <ul className='list-disc pl-6 mt-4 space-y-2'>
              <li>
                <strong>Images:</strong> Read-only templates containing
                application code, libraries, dependencies, tools, and other
                files needed for an application to run
              </li>
              <li>
                <strong>Containers:</strong> Running instances of Docker images
                that can be created, started, stopped, moved, or deleted
              </li>
              <li>
                <strong>Dockerfile:</strong> A text document containing
                instructions to build a Docker image automatically
              </li>
              <li>
                <strong>Docker Hub:</strong> A cloud-based registry service for
                storing and sharing Docker images
              </li>
            </ul>
          </>
        }
      />

      <CodeSnippet
        code={`# Build the image
docker build -t myapp .

# Run the container
docker run -d -p 5000:5000 myapp

# List running containers
docker ps

# Stop a container
docker stop <container_id>

# Remove a container
docker rm <container_id>`}
        language='bash'
        fileName='docker-commands.sh'
        showLineNumbers={true}
      />

      <Quiz
        title='Docker Basics'
        question={{
          question: "What is a Docker container?",
          options: [
            {
              id: "A",
              text: "A virtual machine running a complete operating system",
            },
            {
              id: "B",
              text: "A lightweight, standalone executable package that includes everything needed to run an application",
            },
            {id: "C", text: "A physical server in a data center"},
            {id: "D", text: "A backup of application code"},
          ],
          correctAnswer: "B",
          explanation:
            "A Docker container is a lightweight, standalone executable package that includes the application code, runtime, system tools, libraries, and settings needed to run an application.",
        }}
      />

      <Quiz
        title='Docker Images'
        question={{
          question: "What is a Dockerfile used for?",
          options: [
            {id: "A", text: "To store Docker images"},
            {id: "B", text: "To run Docker containers"},
            {id: "C", text: "To define the steps to build a Docker image"},
            {id: "D", text: "To monitor Docker containers"},
          ],
          correctAnswer: "C",
          explanation:
            "A Dockerfile is a text document containing a series of instructions and commands used to automatically build a Docker image.",
        }}
      />

      <Resources
        title='Docker Learning Resources'
        links={[
          {
            title: "Official Docker Documentation",
            url: "https://docs.docker.com",
            description:
              "Comprehensive guide to Docker features, commands, and best practices",
          },
          {
            title: "Docker Hub",
            url: "https://hub.docker.com",
            description: "Docker's official repository for container images",
          },
          {
            title: "Docker Getting Started Guide",
            url: "https://docs.docker.com/get-started",
            description: "Step-by-step tutorial for Docker beginners",
          },
          {
            title: "Docker Compose Documentation",
            url: "https://docs.docker.com/compose",
            description:
              "Learn how to define and run multi-container Docker applications",
          },
        ]}
      />
    </div>
  );
};

export default DockerPage;
