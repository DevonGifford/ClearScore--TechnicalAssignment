import * as z from "zod";
import { formSchema } from "@/lib/zodFormSchema";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Trash2, Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

type FormSchemaType = z.infer<typeof formSchema>;

export interface CardProps {
  created: string;
  edited: string;
  title: string;
  description: string;
  index: number;
  handleDeleteIdea: () => void;
  handleEditIdea: (index: number, title: string, description: string) => void;
}

const IdeaCard: React.FC<CardProps> = ({
  index,
  created,
  edited,
  title,
  description,
  handleDeleteIdea,
  handleEditIdea,
}) => {
  const [charCount, setCharCount] = useState(0);
  const [editsMade, setEditsMade] = useState(false);
  //✅ Form validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  //✅ Submit edited Idea
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    handleEditIdea(index, data.title, data.description);
    setEditsMade(false);
  };

  return (
    <div className=" h-90 min-h-fit w-64 px-3 py-3 border-b border-primary/10 bg-secondary transition duration-400 hover:scale-110 hover:bg-secondary/80 flex flex-col rounded-lg">
      {/* HEADER */}
      <div className="w-full flex justify-between ">
        {/* DATE */}
        <div role="time-stamp" className="text-xs font-bold text-gray-500">
          {edited !== "" ? <p>Edited: {edited}</p> : <p>Created: {created}</p>}
        </div>
        {/* DELETE */}
        <div>
          <Button
            variant={"destructive"}
            size={"icon"}
            className="h-6 w-6 "
            onClick={handleDeleteIdea}
            aria-label={`delete idea button for ${title}`}
            role="delete-button"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
      {/* FORM w/ TITLE & DESCRIPTION */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        role="form"
      >
        {/* TITLE */}
        <div className="border-b-2 border-primary p-2 text-lg font-semibold text-center">
          <textarea
            id="title"
            data-testid="idea-card-title"
            className="bg-secondary text-center w-full resize-none overflow-hidden hover:overflow-auto"
            placeholder="Write your title here"
            defaultValue={title}
            {...register("title")}
            onChange={() => setEditsMade(true)}
          />
          {errors.title && (<span className=" text-red-700 text-sm">{errors.title?.message}</span>)}
        </div>
        {/* DESCRIPTION */}
        <div className="h-min-[7rem] text-base pt-1 text-center">
          <textarea
            id="description"
            data-testid="idea-card-description"
            className="bg-secondary text-center w-full p-2.5 h-44 whitespace-pre-wrap resize-none overflow-hidden hover:overflow-auto"
            placeholder="Write your description here"
            defaultValue={description}
            {...register("description")}
            onChange={(e) => {
              const newDescription = e.target.value;
              setCharCount(newDescription.length);
              setEditsMade(true);
            }}
          />
          {errors.description && (<span className=" text-red-700 text-sm">{errors.description?.message}</span>)}
        </div>
        {/* CHARACTER COUNTER */}
        {editsMade && ( //-Only show the character counter if edits have been made
          <div>
            <Progress role="progress-bar" className=" w-full" value={(charCount / 140) * 100} />{" "}
            <div role="char-countdown" className="flex justify-end text-xs font-bold text-gray-500">
              {charCount !== 0 ? (
                <span>{140 - charCount}</span>
              ) : (
                <span>{140 - description.length}</span>
              )}
            </div>
          </div>
        )}
        {/* SUBMIT BUTTON */}
        <div className="flex justify-center pt-1">
          {editsMade && ( //- Only show the submit button if edits have been made
            <Button
              data-testid="submit-save-button"
              role="button"
              type="submit"
              variant="premium"
              className="w-32 justify-center"
              disabled={isSubmitting || charCount > 140}
            >
              <span>Save Edit</span> <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default IdeaCard;
