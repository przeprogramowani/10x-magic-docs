import { Link } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";

interface Subject {
  id: string;
  name: string;
  path: string;
  description: string;
}

// Introduce a new Subject to present it on the home page grid
const availableSubjects: Subject[] = [
  {
    id: "github-actions",
    name: "Pierwsze kroki GitHub Actions",
    path: "/docs/github-actions",
    description:
      "Poznaj podstawy automatyzacji przepływu pracy w GitHub z wykorzystaniem GitHub Actions",
  },
];

// Total number of tiles to display
const TOTAL_TILES = 25;

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: TOTAL_TILES }, (_, index) => {
          const subject = availableSubjects[index];

          if (subject) {
            return (
              <HoverCard key={subject.id}>
                <HoverCardTrigger asChild>
                  <Link
                    to={subject.path}
                    className="block transition-transform duration-200 hover:scale-105"
                  >
                    <Card
                      className="h-full border-2 border-neutral-200 dark:border-neutral-800 shadow-lg dark:shadow-xl bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm"
                      data-testid="card"
                    >
                      <CardHeader className="space-y-1">
                        <CardTitle className="text-xl font-bold">
                          <span className="text-neutral-900 dark:text-neutral-100">
                            {subject.name}
                          </span>
                        </CardTitle>
                        <CardDescription className="text-sm text-neutral-600 dark:text-neutral-400">
                          {subject.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white transition-all duration-200">
                          Start Learning
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {subject.name}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {subject.description}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          } else {
            return (
              <Card
                key={`placeholder-${index}`}
                className="h-full border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur-sm opacity-70 transition-all duration-200 hover:opacity-100"
                data-testid="card"
              >
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl font-bold text-neutral-500 dark:text-neutral-500">
                    -
                  </CardTitle>
                  <CardDescription className="text-neutral-400 dark:text-neutral-400">
                    Use Agentic AI to create new learning paths
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button disabled className="w-full" variant="secondary">
                    Subject {index + 1}
                  </Button>
                </CardFooter>
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
}
