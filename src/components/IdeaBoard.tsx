import { useEffect, useState } from "react";
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
  const [sortedData, setSortedData] = useState<Idea[]>(data); //- Initialize sortedData with the initial data
  const [sortType, setSortType] = useState<"" | "date" | "alph" | "alph_rev">(
    "",
  );
  useEffect(() => {
    let sorted = [...data];
    switch (sortType) {
      case "alph":
        sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "alph_rev":
        sorted = sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date":
        sorted = sorted.sort((a, b) => {
          const dateA = a.edited_at || a.created_at;
          const dateB = b.edited_at || b.created_at;
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        });
        break;
      default:
        break;
    }
    setSortedData(sorted);
  }, [data, sortType]);

  const handleSortOrderChange = (
    newSortOrder: "" | "date" | "alph" | "alph_rev",
  ) => {
    setSortType(newSortOrder);
    toast.success("Sort successfully applied!", {
      position: "top-center",
    });
  };

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
              onClick={handleCreateIdea}
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
        {sortedData.map((item, index) => (
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
