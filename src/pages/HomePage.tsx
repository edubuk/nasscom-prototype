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
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Test from "./Test"
const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
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
  email: z.string({
    required_error: "Email is required",
  }),
  topic: z.string({
    required_error: "Topic is required",
  }),
});

const topics = [
  "AI",
  "Gen AI",
  "Agentic AI",
  "Blockchain",
  "Cybersecurity",
  "Cloud Computing",
];
const HomePage = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // await contactUs(values);
    // setModalOpen(false);
    form.reset();
  }
  console.log("form values", form.getValues());
  return (
    <div className="w-full flex flex-col items-center pt-20">
      <div className="max-w-4xl border w-full rounded-xl shadow-lg p-6">
        <h1 className="text-2xl tracking-tight">Fill up details</h1>

        {/* form component */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-9"
          >
            <div className="flex gap-5">
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
                      <div className=" flex flex-wrap gap-5">
                        {topics.map((topic, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setSelectedTopic(topic);
                              form.setValue("topic", topic);
                            }}
                            className={twMerge(
                              "max-w-44 w-full h-16 p-2 flex items-center justify-center border rounded-lg hover:bg-zinc-100/50 cursor-pointer",
                              topic === selectedTopic &&
                                "bg-green-500/10 border-green-500 hover:bg-green-500/10"
                            )}
                          >
                            {topic}
                          </div>
                        ))}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="px-20">
              <Button
                type="submit"
                className="w-full border border-white/25  font-poppins text-base bg-zinc-100/80 text-black hover:bg-opacity-90 cursor-pointer"
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Test />
    </div>
  );
};

export default HomePage;
