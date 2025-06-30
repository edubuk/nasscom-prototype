import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDropDown({
  setSelectedTopic,
}: {
  setSelectedTopic: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleTopicChange = (value: string) => {
    const userData = localStorage.getItem("userFormData");
    setSelectedTopic(value);
    if (userData) {
      // parsing the stringify data ;
      const parsedData = JSON.parse(userData);
      parsedData.topic = value;

      localStorage.setItem("userFormData", JSON.stringify(parsedData));
    }
  };

  return (
    <Select onValueChange={handleTopicChange}>
      <SelectTrigger className="w-[180px]  border border-zinc-500/70 cursor-pointer">
        <SelectValue placeholder="Change topic" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Topics</SelectLabel>
          <SelectItem value="AI">AI</SelectItem>
          <SelectItem value="Gen AI">Gen AI</SelectItem>
          <SelectItem value="Agentic AI">Agentic AI</SelectItem>
          <SelectItem value="Blockchain">Blockchain</SelectItem>
          <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
          <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
