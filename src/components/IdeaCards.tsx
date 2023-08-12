import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import empty from "../assets/empty.png";

interface Idea {
  unique_key: string;
  title: string;
  description: string;
  created_at: string;
  edited_at: string;
}

const IdeaCard = ({ data }: { data: Idea[] }): JSX.Element => {
  // console.log(data);

  if (!data || data.length === 0) {
    //🎯create sort functionality   || sortedData.length === 0
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <img src={empty} alt="Empty" className="grayscale" />
        </div>
        <p className="text-sm text-muted-foreground ml-8">No Ideas Found</p>
      </div>
    );
  }
  return (
    <div className="flex justify-center flex-row flex-wrap gap-8 pb-10 mx-10">
      {data.map((item) => (
        <div className="h-72 min-h-fit w-64 px-3 py-3 border-b border-primary/10 bg-secondary transition duration-400 hover:scale-110 hover:bg-secondary/80 flex flex-col hover:drop-shadow-2xl rounded-lg">
          <form onSubmit={() => {}}>
            <div className="w-full mt-auto flex justify-between ">
              <div className="text-xs font-light text-gray-500">
                {item.edited_at ? (
                  <p> Edited on: {item.edited_at} </p>
                ) : (
                  <p> Created on: {item.created_at}</p>
                )}
                {/* 🎯 fix the created at and updated at functionality  */}
              </div>

              <Button
                variant={"destructive"}
                size={"icon"}
                className="h-6 w-6 "
                onClick={() => {
                  localStorage.removeItem(item.unique_key);
                }} // 🎯  ADD DELETE FUNCTIONALITY
              >
                <Trash2 size={14} />
              </Button>
            </div>
            {/* HEADING */}
            <div className="h-min-10 border-b-2 border-primary p-2 text-lg font-semibold">
              {item.title}
            </div>
            {/* 🎯 Remember to truncate this after x amount of characters: https://tailwindcss.com/blog/multi-line-truncation-with-tailwindcss-line-clamp */}

            {/* DESCRIPTION */}
            <div className="h-min-[7rem] text-base pt-5">
              {" "}
              {item.description}{" "}
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};

export default IdeaCard;
