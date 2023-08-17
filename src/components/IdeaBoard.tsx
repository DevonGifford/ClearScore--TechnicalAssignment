import { useState } from "react";
import toast from "react-hot-toast";
import IdeaCard from "./IdeaCard";
import { Button } from "./ui/button";
import {
  ArrowDown10,
  ArrowDownAZ,
  ArrowUpAZ,
  ListFilter,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Idea {
  unique_key: string;
  title: string;
  description: string;
  created_at: string;
  edited_at: string;
}

interface IdeaBoardProps {
  data: Idea[];
  handleCreateIdea: () => void;
  handleDeleteIdea: (unique_key: string) => void;
  handleEditIdea: (index: number, title: string, description: string) => void;
}

const IdeaBoard: React.FC<IdeaBoardProps> = ({
  data,
  handleDeleteIdea,
  handleEditIdea,
  handleCreateIdea,
}) => {
  //✅ SORT FUNCTIONALITY - sort based on title/date
  const [sortType, setSortType] = useState<"" | "date" | "alph" | "alph_rev">("");
  const sortedData = (data: Idea[], sortType: string)  => {
    switch (sortType) {
      case "alph":
        return data.sort((a, b) => a.title.localeCompare(b.title));
      case "alph_rev":
        return data.sort((a, b) => b.title.localeCompare(a.title));
      case "date":
        return data.sort((a, b) => {
          const dateA = a.edited_at || a.created_at;
          const dateB = b.edited_at || b.created_at;
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        });
      default:
        return data.slice();
    }          
  }
  const handleSortOrderChange = (newSortOrder: "" | "date" | "alph" | "alph_rev") => {
    setSortType(newSortOrder);
    toast.success("Sort successfully applied!", { position: "top-center" });
  };
  const sortedIdeaData = sortedData(data, sortType); 

  return (
    <>
      {/* SORTING DROPDOWN */}
      <div className="absolute translate-y-20 translate-x-10 x-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <ListFilter className="h-[2rem] w-[2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30 ml-10">
            <DropdownMenuLabel className="flex justify-center">
              Sort By
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSortOrderChange("")}>
              <Sparkles />
              <div className="pl-5">Default</div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortOrderChange("alph")}>
              <ArrowDownAZ />
              <div className="pl-5">Title A-Z</div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortOrderChange("alph_rev")}>
              <ArrowUpAZ />
              <div className="pl-5">Title Z-A</div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortOrderChange("date")}>
              <ArrowDown10 />
              <div className="pl-5">Date </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-center flex-row flex-wrap gap-8 pb-10 pt-32 mx-10">
        {/* ADD NEW IDEA */}
        <div className=" mx-14 h-40 min-h-fit w-40 mt-10 px-3 py-3 border-b border-primary/10 bg-secondary transition duration-400 hover:scale-110 hover:bg-secondary/80 flex flex-col hover:shadow-custom rounded-full">
          <div className="w-full flex justify-center items-center mt-1">
            <Button
              data-testid="create-idea-button"
              onClick={() => handleCreateIdea()}
              size="icon"
              variant="premiumCircle"
              className=" rounded-full h-32 w-32"
            >
              <PlusCircle className="w-12 h-12" />
              {/* THIS SHOULD OPEN THE MODAL... */}
            </Button>
          </div>
        </div>
        {/* MAP OVER CARDS */}
        {sortedIdeaData.map((item, index) => (
          <IdeaCard
            {...item}
            index={index}
            key={item.unique_key}
            created={item.created_at}
            edited={item.edited_at}
            title={item.title}
            description={item.description}
            handleDeleteIdea={() => handleDeleteIdea(item.unique_key)}
            handleEditIdea={(index, title, description) =>
              handleEditIdea(index, title, description)
            }
          />
        ))}
      </div>
    </>
  );
};

export default IdeaBoard;
