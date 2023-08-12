import { Trash2, Wand2 } from "lucide-react";
import { Button } from "./ui/button";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SubmitHandler, useForm } from "react-hook-form";
import { FormEvent } from "react";

interface CardProps {
  date: string;
  title: string;
  description: string;
  index: number; 
  handleDeleteIdea: () => void;
  handleEditIdea: (index: number, title: string, description: string) => void;
}
// const formSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   description: z
//     .string()
//     .min(1, "Description is required")
//     .max(140, "Maximum of 140 characters"),
// });

//type FormSchemaType = z.infer<typeof formSchema>;

const Card2: React.FC<CardProps> = ({ index, date, title, description, handleDeleteIdea, handleEditIdea }) => {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const updatedTitle = formElement.title;
    const updatedDescription = formElement.description;
    handleEditIdea(index, updatedTitle, updatedDescription);
  };


  return (
    <div className="h-72 min-h-fit w-64 px-3 py-3 border-b border-primary/10 bg-secondary transition duration-400 hover:scale-110 hover:bg-secondary/80 flex flex-col hover:drop-shadow-2xl rounded-lg">
      
      {/* HEADER */}
      <div className="w-full mt-3 flex justify-between ">
        {/* DATE */}
        <div className="text-xs font-light text-gray-500">{date}</div>

        {/* DELETE */}
        <div>
          <Button
            variant={"destructive"}
            size={"icon"}
            className="h-6 w-6 "
            onClick={handleDeleteIdea} // 🎯  ADD DELETE FUNCTIONALITY
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
      
      {/* FORM w/ TITLE & DESCRIPTION */}
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">

        {/* TITLE */}
        <div className="h-min-10 border-b-2 border-primary p-2 text-lg font-semibold text-center">
            <input 
              type="text" 
              id="title"
              className="bg-secondary text-center"
              placeholder="Write your title here"
              defaultValue={title}
            />
        </div>

        {/* DESCRIPTION */}
        <div className="h-min-[7rem] text-base pt-5 text-center">
            <input 
              type="text" 
              id="description"
              className="bg-secondary text-center w-full p-2.5 h-24 whitespace-pre-wrap"
              placeholder="Write your title here"
              defaultValue={description}
            />
        </div>

        {/* SUBMIT BUTTON */}
        {/* Create conditional to show only if edit has happened */}
        <div className="flex justify-center">
          <Button
            type="submit" 
            variant="premium" 
            className="w-32 justify-center"
          >
            <span>Save Edit</span> <Wand2 className="w-4 h-4 ml-2" />
          </Button>

        </div>


      </form>
      
    </div>
  );
};

export default Card2;
