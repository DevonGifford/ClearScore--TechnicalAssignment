import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Wand2 } from "lucide-react";
import generateIdeas from "@/lib/FakeGenerate";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(140, "Maximum of 140 characters"),
});
type FormSchemaType = z.infer<typeof formSchema>;

interface IdeaFormProps {
  closeFormModal: () => void;
  handleCreateIdea: () => void;
}

const IdeaForm = ({ closeFormModal }: IdeaFormProps) => {
  //🎯 const { toast } = useToast();

  //✅ Form validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  //✅ Submit New Idea
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    const existingDataString = localStorage.getItem("ideas");
    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : [];

    // Generate lazy unique key & current date
    const lazyKey = new Date().toISOString();
    const currentDate = lazyKey.split("T")[0];

    // Update existing data w/ new entry & update the localStorage
    const newData = {
      unique_key: lazyKey,
      created_at: currentDate,
      edited_at: "",
      ...data,
    };
    existingData.push(newData);
    localStorage.setItem("ideas", JSON.stringify(existingData));
    // Close the modal and refresh after submit
    closeFormModal();
    toast.success("New Idea Created");  //🎯 This isn't working properly - need to fix
    window.location.reload();
  };

  //✅ Generate Fake Ideas
  const generateFakeIdeas = () => {
    toast.success("Fake Ideas Successfully Generated")  //🎯 This isn't working properly - need to fix
    generateIdeas();
    closeFormModal();
    window.location.reload();
  };

  return (
    <div className="h-full p-1 md:p-4 md:space-y-2 max-w-3xl mx-auto">
      {/* HEADER */}
      <div className="md:space-y-2 w-full pb-4">
        <h3 className="md:text-xl font-bold">Create Your New Idea Card</h3>
        <p className="text-xs text-muted-foreground md:pb-2">
          Capture your brilliant ideas
        </p>
      </div>
      {/* Form Inputs */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 md:space-y-8 pb-10"
      >
        <div className="flex flex-col space-y-2 md:space-y-5">
          {/* HEADING  */}
          <div>
            <label htmlFor="title">
              <h5 className="text-sm md:text-base font-medium">The Title</h5>
              <p className="text-xs md:text-sm text-muted-foreground pb-2">
                Give your idea a catchy and meaningful title{" "}
              </p>
            </label>
            <input
              type="text"
              id="title"
              className=" bg-slate-300 text-black text-xs sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Write your title here"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-xs text-center md:text-base text-red-800 block mt-1">
                {errors.title?.message}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label htmlFor="description">
              <h5 className="text-sm md:text-base font-medium">
                The Description
              </h5>
              <p className="text-xs md:text-sm text-muted-foreground pb-2">
                Short and clear description of your idea{" "}
              </p>
            </label>
            <input
              type="text"
              id="description"
              className=" bg-slate-300 text-black text-xs sm:text-sm rounded-lg block w-full p-2.5 h-24 whitespace-pre-wrap"
              placeholder="Write your description here"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-xs text-center md:text-base text-red-800 block mt-1">
                {errors.description?.message}
              </span>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="w-full flex justify-center pt-2">
          <Button
            size="lg"
            variant="premium"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            <span>Save your Idea</span> <Wand2 className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>

      {/* GENERATE FAKE IDEA'S BUTTON */}
      <div className="w-full flex justify-center">
        <Button
          size="sm"
          variant="default"
          disabled={isSubmitting}
          onClick={generateFakeIdeas}
        >
          <span>Generate Fake Ideas</span> <Wand2 className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default IdeaForm;
