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
import {LuArrowUpRight} from "react-icons/lu";
import { SelectDropDown } from "@/components/SelectDropDown";
import {
  AiQuestions,
  AgenticAIQuestions,
  BlockchainQuestions,
  CloudComputingQuestions,
  CybersecurityQuestions,
  GenAiQuestions,
} from "@/data";
import { scrollToTop } from "@/lib/utils";
import EdubukWaterMark from "@/components/EdubukWaterMark";
import DataPage from "@/pages/DataPage";
import { regCertificates } from "@/pages/RegisterOnBlockchain";
import AddCertToLinkedIn from "@/pages/AddCertToLinkedIn";
import { Link } from "react-router-dom";
// Sample questions data with correct answers

// Create dynamic schema based on questions
const createFormSchema = (questions: any[]) => {
  const schemaObject: Record<string, z.ZodString> = {};

  questions.forEach((question) => {
    schemaObject[question.id] = z.string().min(1, "Please select an option");
  });

  return z.object(schemaObject);
};

const QAForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>(
    JSON.parse(localStorage.getItem("userFormData") || "{}").topic
  );

  const topicMap: Record<string, any[]> = {
    AI: AiQuestions,
    "Gen AI": GenAiQuestions,
    "Agentic AI": AgenticAIQuestions,
    Blockchain: BlockchainQuestions,
    Cybersecurity: CybersecurityQuestions,
    "Cloud Computing": CloudComputingQuestions,
  };

  const questions = topicMap[selectedTopic] || [];
  const formSchema = createFormSchema(questions); // providing selected topic questions to the schema
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
  // get the userData from localstorage;

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
    scrollToTop();
  }

  const resetAssessment = () => {
    setIsSubmitted(false);
    setAssessmentResult(null);
    form.reset();
  };

  // if assessment is submitted and assessment result is available then render the assessment result component;
  if (isSubmitted && assessmentResult) {
    return (
      <AssessmentResult
        assessmentResult={assessmentResult}
        selectedTopic={selectedTopic}
        resetAssessment={resetAssessment}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto md:p-6">
      <div className="my-6 md:my-0 md:mb-6">
        <h1 className="text-xl  lg:text-3xl font-bold tracking-tight mb-8 text-center">
          Assessment Questions for {selectedTopic}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <p className="">Select Another Topic</p>
          <SelectDropDown setSelectedTopic={setSelectedTopic} />
        </div>
      </div>

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
                        <span className="place-self-start md:place-self-auto">
                          {index + 1})
                        </span>
                        <span className="">{question.question}</span>
                        {/* <span className="text-red-500 ml-1">*</span> */}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="mt-2"
                        >
                          {question.options.map(
                            (option: any, optionIndex: number) => (
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
                            )
                          )}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {/* experimenting the changes */}
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              Submit Assessment
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

const AssessmentResult = ({
  assessmentResult,
  selectedTopic,
  resetAssessment,
}: {
  assessmentResult: any;
  selectedTopic: string;
  resetAssessment: () => void;
}) => {
  const [dataStatus, setState] = useState("Process started...");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const userFormData = JSON.parse(localStorage.getItem("userFormData") || "{}");

  function base64ToBlob(base64: string, contentType = "application/pdf") {
  const byteCharacters = atob(base64); // Decode base64
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) =>
    byteCharacters.charCodeAt(i)
  );
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

  const createAndUploadCert = async () => {
    try {
      setState("Generating certificate...");
      setLoading(true);
      let res: any = await fetch("https://edubukcvonchain.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userFormData.name,
          certificate_type: `${userFormData.topic}`,
        }),
      });
      const data = await res.json();
      console.log("Certificate ID:",data.cert_id);
      const response = base64ToBlob(data.pdf_base64)
      const file = new File([response], "document.pdf", {
        type: "application/pdf",
      });
      const formData = new FormData();
      formData.append("file", file);
      console.log("Certificate response:", response);
      if (data) {
        const id = data.cert_id;
        setState("Uploading certificate...");
        let upload: any = await fetch(
          "https://okto-v2.vercel.app/file/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        upload = await upload.json();
        console.log("Upload response:", upload);
        if (upload?.success && upload.url) {
          setUrl(upload.url);
          setState("Attaching QR Code...");
          const mappingUrl:any = await fetch(
            `https://okto-v2.vercel.app/qr/url-map`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id,
                url: upload.url,
              }),
            }
          );
          const mappedResponse:any = await mappingUrl.json();
          console.log("Mapping URL response:", mappedResponse);
          if(!mappedResponse.success) {
            return setState("Failed to map URL to QR code");
          }
          if(mappedResponse.success) {
          setState("Registering certificate on blockchain...");
          const certificateType = `${userFormData.topic}`;
          const txHash = await regCertificates({
            fileHash: upload.fileHashWithTimeStampExt,
            uri: upload.url,
            name: userFormData.name,
            certificateType: certificateType,
          });
          if (txHash) {
            setTxHash(txHash);
          }
        }
      }
      }
    } catch (error) {
      console.error("Error in creating and uploading certificate:", error);
      console.log("Error in creating and uploading certificate:", error);
      setLoading(false);
      setState("Error in generating certificate. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto md:p-6">
      {!loading && !txHash && (
        <div className="text-center mb-8">
          <h1 className="text-xl lg:text-3xl mt-5 lg:mt-0 lg:font-bold tracking-tight mb-4">
            Assessment Results for {selectedTopic}
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
            <EdubukWaterMark />
            <div className="flex justify-center space-x-4">
              <Button
                onClick={resetAssessment}
                variant="outline"
                className="px-6 py-2"
              >
                Retake Assessment
              </Button>

              {assessmentResult.passed && (
                <Button
                  onClick={createAndUploadCert}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 cursor-pointer"
                >
                  Submit result
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {loading && !txHash && <DataPage dataStatus={dataStatus} />}
      {txHash && (
        <div className="flex flex-col items-center justify-center h-[65vh] gap-10">
        <div className="flex justify-center items-center gap-10">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 py-3 px-3 border-1 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            View Certificate
          </a>
          <AddCertToLinkedIn
            certName={`CETA-${userFormData.topic} Module Completion Certificate`}
            organizationId={82553446}
            issueYear={2024}
            issueMonth={6}
            certUrl={url}
            certId={7890}
          />
          </div>
          <Link to="/verify-cert" className="flex justify-center items-center text-blue-600 underline">Would you like to verify your certificate on Blockchain <LuArrowUpRight className="w-5 h-5"/></Link>
        </div>
      )}
    </div>
  );
};

export default QAForm;
