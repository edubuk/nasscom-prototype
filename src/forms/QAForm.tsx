import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle, XCircle } from "lucide-react";

// Sample questions data with correct answers
const questions = [
  {
    id: "q1",
    question: "What is your preferred programming language?",
    options: ["JavaScript", "Python", "Java", "C++"],
    correctAnswer: "JavaScript",
  },
  {
    id: "q2",
    question: "How many years of experience do you have?",
    options: ["0-1 years", "2-3 years", "4-5 years", "6+ years"],
    correctAnswer: "0-1 years",
  },
  {
    id: "q3",
    question: "What is your preferred development environment?",
    options: ["VS Code", "IntelliJ IDEA", "Vim/Neovim", "Sublime Text"],
    correctAnswer: "VS Code",
  },
  {
    id: "q4",
    question: "Which database do you prefer?",
    options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
    correctAnswer: "PostgreSQL",
  },
  {
    id: "q5",
    question: "What is your favorite frontend framework?",
    options: ["React", "Vue.js", "Angular", "Svelte"],
    correctAnswer: "React",
  },
  {
    id: "q6",
    question: "How do you prefer to learn new technologies?",
    options: ["Hands-on projects", "Online courses", "Documentation", "Books"],
    correctAnswer: "Hands-on projects",
  },
  {
    id: "q7",
    question: "What is your preferred version control system?",
    options: ["Git", "SVN", "Mercurial", "Perforce"],
    correctAnswer: "Git",
  },
  {
    id: "q8",
    question: "Which operating system do you use for development?",
    options: ["Linux", "Windows", "macOS", "Multiple systems"],
    correctAnswer: "Linux",
  },
  {
    id: "q9",
    question: "What is your preferred testing approach?",
    options: [
      "Unit testing",
      "Integration testing",
      "E2E testing",
      "Manual testing",
    ],
    correctAnswer: "Unit testing",
  },
  {
    id: "q10",
    question: "How do you manage your project dependencies?",
    options: ["npm", "yarn", "pnpm", "pip"],
    correctAnswer: "npm",
  },
  {
    id: "q11",
    question: "What is your preferred cloud platform?",
    options: ["AWS", "Google Cloud", "Azure", "Heroku"],
    correctAnswer: "AWS",
  },
  {
    id: "q12",
    question: "Which design pattern do you use most often?",
    options: ["MVC", "Observer", "Singleton", "Factory"],
    correctAnswer: "MVC",
  },
  {
    id: "q13",
    question: "How do you prefer to handle state management?",
    options: ["Redux", "Context API", "Zustand", "MobX"],
    correctAnswer: "Redux",
  },
  {
    id: "q14",
    question: "What is your preferred CSS methodology?",
    options: ["BEM", "OOCSS", "SMACSS", "Atomic CSS"],
    correctAnswer: "BEM",
  },
  {
    id: "q15",
    question: "Which build tool do you prefer?",
    options: ["Vite", "Webpack", "Parcel", "Rollup"],
    correctAnswer: "Vite",
  },
  {
    id: "q16",
    question: "How do you prefer to handle API calls?",
    options: ["React Query", "Fetch API", "Axios", "SWR"],
    correctAnswer: "React Query",
  },
  {
    id: "q17",
    question: "What is your preferred deployment strategy?",
    options: [
      "Continuous deployment",
      "Blue-green deployment",
      "Rolling deployment",
      "Manual deployment",
    ],
    correctAnswer: "Continuous deployment",
  },
  {
    id: "q18",
    question: "Which monitoring tool do you prefer?",
    options: ["Sentry", "LogRocket", "Datadog", "New Relic"],
    correctAnswer: "Sentry",
  },
  {
    id: "q19",
    question: "How do you prefer to collaborate with your team?",
    options: ["Slack", "Microsoft Teams", "Discord", "Email"],
    correctAnswer: "Slack",
  },
  {
    id: "q20",
    question: "What motivates you most in your work?",
    options: [
      "Solving complex problems",
      "Learning new technologies",
      "Building user-friendly products",
      "Working with great teams",
    ],
    correctAnswer: "Solving complex problems",
  },
];

// Create dynamic schema based on questions
const createFormSchema = () => {
  const schemaObject: Record<string, z.ZodString> = {};

  questions.forEach((question) => {
    schemaObject[question.id] = z.string().min(1, "Please select an option");
  });

  return z.object(schemaObject);
};

const formSchema = createFormSchema();

const QAForm = ({
  storeOnBlockchainHandler,
}: {
  storeOnBlockchainHandler: () => void;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    passed: boolean;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    percentage: number;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...questions.reduce((acc, question) => {
        acc[question.id] = "";
        return acc;
      }, {} as Record<string, string>),
    },
  });

  const calculateScore = (values: z.infer<typeof formSchema>) => {
    let correctAnswers = 0;
    const totalQuestions = questions.length;

    questions.forEach((question) => {
      const userAnswer = values[question.id as keyof typeof values];
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const percentage = (correctAnswers / totalQuestions) * 100;
    const passed = percentage >= 70; // 70% passing criteria

    return {
      passed,
      score: correctAnswers,
      correctAnswers,
      totalQuestions,
      percentage: Math.round(percentage * 100) / 100,
    };
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);

    // Calculate the score
    const result = calculateScore(values);
    setAssessmentResult(result);
    setIsSubmitted(true);

    // Format answers for easier processing
    const answers = questions.map((question) => ({
      questionId: question.id,
      question: question.question,
      selectedAnswer: values[question.id as keyof typeof values],
      correctAnswer: question.correctAnswer,
      isCorrect:
        values[question.id as keyof typeof values] === question.correctAnswer,
    }));

    console.log("Assessment Result:", result);
    console.log("Detailed Answers:", answers);
  }

  const resetAssessment = () => {
    setIsSubmitted(false);
    setAssessmentResult(null);
    form.reset();
  };

  if (isSubmitted && assessmentResult) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Assessment Results
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="flex items-center justify-center mb-6">
              {assessmentResult.passed ? (
                <CheckCircle className="w-16 h-16 text-green-500 mr-4" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500 mr-4" />
              )}
              <div className="text-left">
                <h2
                  className={`text-2xl font-bold ${
                    assessmentResult.passed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {assessmentResult.passed ? "PASSED" : "FAILED"}
                </h2>
                <p className="text-gray-600 text-lg">
                  Score: {assessmentResult.correctAnswers}/
                  {assessmentResult.totalQuestions}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {assessmentResult.percentage}%
                </div>
                <div className="text-sm text-gray-600">Percentage</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {assessmentResult.correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {assessmentResult.totalQuestions -
                    assessmentResult.correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Incorrect Answers</div>
              </div>
            </div>

            <Alert
              className={`mb-6 ${
                assessmentResult.passed
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <AlertDescription
                className={
                  assessmentResult.passed ? "text-green-800" : "text-red-800"
                }
              >
                {assessmentResult.passed
                  ? `Congratulations! You have successfully passed the assessment with ${assessmentResult.percentage}%. The passing criteria was 70%.`
                  : `Unfortunately, you did not pass the assessment. You scored ${assessmentResult.percentage}%, but the passing criteria is 70%. Please  try again.`}
              </AlertDescription>
            </Alert>

            <div className="flex justify-center space-x-4">
              {!assessmentResult.passed && (
                <Button
                  onClick={resetAssessment}
                  variant="outline"
                  className="px-6 py-2"
                >
                  Retake Assessment
                </Button>
              )}

              {assessmentResult.passed && (
                <Button
                  onClick={storeOnBlockchainHandler}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 cursor-pointer"
                >
                  Submit result
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Assessment Questions
      </h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800 font-medium">
          📋 Instructions: Answer all questions to complete the assessment. You
          need to score 70% or higher to pass.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {questions.map((question, index) => (
                <FormField
                  key={question.id}
                  control={form.control}
                  name={question.id as any}
                  render={({ field }) => (
                    <FormItem className="bg-white p-4 rounded-lg border shadow-sm">
                      <FormLabel className="text-base font-medium">
                        {index + 1}. {question.question}
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="mt-2"
                        >
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={option}
                                id={`${question.id}-${optionIndex}`}
                                className="cursor-pointer"
                              />
                              <Label
                                htmlFor={`${question.id}-${optionIndex}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Submit Assessment
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default QAForm;
