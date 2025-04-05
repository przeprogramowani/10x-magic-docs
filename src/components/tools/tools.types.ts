/**
 * Type definitions for the tool components with usage descriptions
 */

/**
 * Quiz Component
 *
 * Renders an interactive quiz with multiple-choice options.
 * Users can select an answer, check if it's correct, and see an explanation.
 *
 * Usage:
 * <Quiz
 *   title="Optional Title"
 *   question={{
 *     question: "What is React?",
 *     options: [
 *       { id: "A", text: "A JavaScript library" },
 *       { id: "B", text: "A programming language" },
 *       { id: "C", text: "A database system" },
 *       { id: "D", text: "A server technology" }
 *     ],
 *     correctAnswer: "A",
 *     explanation: "React is a JavaScript library for building user interfaces."
 *   }}
 * />
 */
export interface QuizOption {
  id: "A" | "B" | "C" | "D";
  text: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation?: string;
}

export interface QuizProps {
  title?: string;
  question: QuizQuestion;
}

/**
 * TextBlock Component
 *
 * Displays a header and markdown content in a styled container.
 * The text prop accepts markdown content which will be rendered as rich text.
 *
 * Usage:
 * <TextBlock
 *   header="Introduction"
 *   text="This is a **markdown** text with _formatting_."
 * />
 */
export interface TextBlockProps {
  header: string;
  text: string; // Markdown content
}

/**
 * CodeSnippet Component
 *
 * Displays formatted and syntax-highlighted code with optional file name
 * and line numbers. Includes a copy-to-clipboard feature.
 *
 * Usage:
 * <CodeSnippet
 *   code="const greeting = 'Hello World';\nconsole.log(greeting);"
 *   language="javascript"
 *   fileName="example.js"
 *   showLineNumbers={true}
 * />
 */
export interface CodeSnippetProps {
  code: string;
  language?: string; // defaults to "typescript"
  fileName?: string;
  showLineNumbers?: boolean; // defaults to true
}

/**
 * Resources Component
 *
 * Displays a list of resource links with titles and optional descriptions.
 *
 * Usage:
 * <Resources
 *   title="Additional Resources"
 *   links={[
 *     {
 *       title: "React Documentation",
 *       url: "https://reactjs.org/docs",
 *       description: "Official React documentation"
 *     },
 *     {
 *       title: "TypeScript Handbook",
 *       url: "https://www.typescriptlang.org/docs/"
 *     }
 *   ]}
 * />
 */
export interface ResourceLink {
  title: string;
  url: string;
  description?: string;
}

export interface ResourcesProps {
  title: string;
  links: ResourceLink[];
}

/**
 * MermaidDiagram Component
 *
 * Renders a Mermaid diagram from a file path.
 * Supports dynamic loading and rendering of Mermaid diagrams.
 *
 * Usage:
 * <MermaidDiagram
 *   diagramPath="/public/diagrams/flowchart.mmd"
 *   caption="System architecture diagram"
 * />
 */
export interface MermaidDiagramProps {
  diagramPath: string; // Path to the diagram file in public directory
  caption?: string;
}
