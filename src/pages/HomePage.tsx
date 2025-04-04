import {Link} from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {Button} from "../components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";

// Define available subjects
const availableSubjects = [
  {
    id: "github-actions",
    name: "GitHub Actions",
    path: "/github-actions",
    description: "Learn GitHub Actions automation",
  },
  {
    id: "docker",
    name: "Docker",
    path: "/docker",
    description: "Master containerization with Docker",
  },
];

// Total number of tiles to display
const TOTAL_TILES = 25;

export default function HomePage() {
  return (
    <div className='container mx-auto py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {Array.from({length: TOTAL_TILES}, (_, index) => {
          const subject = availableSubjects[index];

          if (subject) {
            return (
              <HoverCard key={subject.id}>
                <HoverCardTrigger asChild>
                  <Link
                    to={subject.path}
                    className='block transition-transform duration-200 hover:scale-105'
                  >
                    <Card className='h-full border-2 border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-xl bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm'>
                      <CardHeader className='space-y-1'>
                        <CardTitle className='text-xl font-bold'>
                          <span className='text-gray-900 dark:text-gray-100'>
                            {subject.name}
                          </span>
                        </CardTitle>
                        <CardDescription className='text-sm text-gray-600 dark:text-gray-400'>
                          {subject.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className='w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white transition-all duration-200'>
                          Start Learning
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className='w-80'>
                  <div className='space-y-2'>
                    <h4 className='text-sm font-semibold text-gray-900 dark:text-gray-100'>
                      {subject.name}
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
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
                className='h-full border border-dashed border-gray-300 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm opacity-70 transition-all duration-200 hover:opacity-100'
              >
                <CardHeader className='space-y-1'>
                  <CardTitle className='text-xl font-bold text-gray-500 dark:text-gray-500'>
                    Coming Soon
                  </CardTitle>
                  <CardDescription className='text-gray-400 dark:text-gray-400'>
                    New learning path will be available soon
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button disabled className='w-full' variant='secondary'>
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
