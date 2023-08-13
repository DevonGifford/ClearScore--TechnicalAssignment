import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Wand2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  //const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    const existingDataString = localStorage.getItem("ideas");
    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : [];
    //console.log("existing data: ", existingData);

    // Generate lazy unique key
    const lazyKey = new Date().toISOString();
    //console.log("lazyuniqueID: ", lazyKey);
    
    // Get the current date in "YYYY-MM-DD" format
    const currentDate = lazyKey.split("T")[0];

    // Manipulate the data
    const newData = {
      unique_key: lazyKey,
      created_at: currentDate,
      edited_at: "", // Initialize empty edited_at date
      ...data, // Spread the submitted form data
    };

    // Update existing data with the new entry
    existingData.push(newData);
    //console.log(newData);

    // Update the localStorage
    localStorage.setItem("ideas", JSON.stringify(existingData));
    //console.log(existingData);

    // Close the modal after submit
    closeFormModal();
    window.location.reload();
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      {/* Heading */}
      <div className="space-y-2 w-full col-span-2">
        <h3 className="text-xl font-bold">Create your New Idea Card</h3>
        <p className="text-sm text-muted-foreground">
          Capture your brilliant ideas
        </p>
      </div>
      {/* Form Inputs */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-10">
        <div className="flex flex-col space-y-10">
          {/* HEADING  */}
          <div>
            <label htmlFor="title" className="">
              <h5 className="text-base font-medium">The Title</h5>
              <p className="text-sm text-muted-foreground">
                Give your idea a catchy and meaningful title that summarizes its
                essence.{" "}
              </p>
            </label>
            <input
              type="text"
              id="title"
              className=" bg-slate-300 text-black sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Write your title here"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-red-800 block mt-2">
                {errors.title?.message}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label htmlFor="description">
              <h5 className="text-base font-medium">The Description</h5>
              <p className="text-sm text-muted-foreground">
                Short and clear description of your idea, highlighting{" "}
              </p>
            </label>
            <input
              type="text"
              id="description"
              className=" bg-slate-300 text-black sm:text-sm rounded-lg block w-full p-2.5 h-24 whitespace-pre-wrap"
              placeholder="Write your description here"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-800 block mt-2">
                {errors.description?.message}
              </span>
            )}
          </div>
        </div>

        {/* PROGRESS BAR */}

        {/* SUBMIT BUTTON */}
        <div className="w-full flex justify-center">
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
    </div>
  );
};

export default IdeaForm;
