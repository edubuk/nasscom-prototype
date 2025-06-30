import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { scrollToTop } from "@/lib/utils";
import EdubukWaterMark from "@/components/EdubukWaterMark";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, {
      message: "Name is required",
    }),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .min(10, {
      message: "Phone number must be 10 digits",
    })
    .max(10, {
      message: "Phone number must be less than 10 digits",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  topic: z.string({
    required_error: "Topic is required",
  }),
});

// const topics = [
//   "AI",
//   "Gen AI",
//   "Agentic AI",
//   "Blockchain",
//   "Cybersecurity",
//   "Cloud Computing",
// ];
const topics = [
  { name: "AI", img: "/topics/ai.png" },
  { name: "Gen AI", img: "/topics/gen-ai.png" },
  { name: "Agentic AI", img: "/topics/agentic-ai.png" },
  { name: "Blockchain", img: "/topics/blockchain.png" },
  { name: "Cybersecurity", img: "/topics/cybersecurity.png" },
  { name: "Cloud Computing", img: "/topics/cloudcomputing.png" },
];

const UserForm = ({
  setIsFormSubmited,
}: {
  setIsFormSubmited: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  // const [userFormData, setUserFormData] = useState(
  //   JSON.parse(localStorage.getItem("userFormData") || "{}")
  // );
  const userFormData = JSON.parse(localStorage.getItem("userFormData") || "{}");
  const nextClickHandler = async () => {
    const isValid = await form.trigger();
    console.log(isValid);
    if (isValid) {
      // store the boolean and the data in localStorage
      localStorage.setItem("userFormSubmited", JSON.stringify(true));
      localStorage.setItem("userFormData", JSON.stringify(form.getValues()));
      setIsFormSubmited(true);
      scrollToTop();
    }
  };

  useEffect(() => {
    if (!userFormData) return;

    // Explicitly cast `openning` to the expected type for `form.reset`
    form.reset(userFormData as any);
    setSelectedTopic(userFormData.topic);
  }, []);
  console.log("form values", form.getValues());
  return (
    <>
      <h1 className="text-2xl tracking-tight">Fill your details</h1>

      {/* form component */}
      <Form {...form}>
        <form className="space-y-8 mt-9 md:p-4">
          <div className="flex flex-col md:flex-row gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Full Name <span className="text-red-500"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="focus:ring-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Phone <span className="text-red-500"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Email <span className="text-red-500"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1>Select your topic</h1>
            <FormField
              control={form.control}
              name="topic"
              render={() => (
                <FormItem className="flex-1">
                  <FormLabel>
                    Topic <span className="text-red-500"> *</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap  gap-5  justify-center mt-2">
                      {topics.map((topic, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setSelectedTopic(topic.name);
                            form.setValue("topic", topic.name);
                          }}
                          className={twMerge(
                            "max-w-32 md:max-w-44 w-full  p-2 flex items-center justify-center border rounded-lg hover:bg-zinc-100/50 cursor-pointer text-center shadow-md",
                            topic.name === selectedTopic &&
                              "bg-green-500/10 border-green-500 hover:bg-green-500/10"
                          )}
                        >
                          <img
                            src={topic.img}
                            alt="topic"
                            className="w-full rounded-md select-none pointer-events-none"
                          />
                        </div>
                      ))}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <EdubukWaterMark />
          <div className="md:px-20">
            <Button
              type="button"
              onClick={nextClickHandler}
              className="w-full border border-white/25   text-base  cursor-pointer"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UserForm;
