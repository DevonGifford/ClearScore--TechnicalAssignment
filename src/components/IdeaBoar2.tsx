import Card2 from "./Card2";
import { Button } from "./ui/button";
import { useMemo, useState } from "react";
import { ArrowDown10, ArrowDownAZ, ArrowUpAZ, ListFilter, PlusCircle, Sparkles } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";


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

const IdeaBoard2: React.FC<IdeaBoardProps> = ({
  data,
  handleDeleteIdea,
  handleEditIdea,
  handleCreateIdea,
}) => {
  const [sortOrder, setSortOrder] = useState<"" | "date" | "alph" | "alph_rev">("");

  // SORT FUNCTIONALITY - sort based on title/date...✅
  const sortedData = useMemo(() => {
    switch (sortOrder) {
      case "alph":
        return data.slice().sort((a, b) => a.title.localeCompare(b.title));
      case "alph_rev":
        return data.slice().sort((a, b) => b.title.localeCompare(a.title));
      case "date":
        return data.slice().sort((a, b) => {
          // Compare the createdAt and editedAt dates
          const dateA = a.edited_at || a.created_at; // Use editedAt if available, otherwise use createdAt
          const dateB = b.edited_at || b.created_at;
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        }); 
      default:
        return data;
    }
  }, [data, sortOrder]);


  return (
    <>
      {/* SORTING DROPDOWN */}
      <div className="absolute translate-y-20 translate-x-10 x-20">
        <DropdownMenu>

          <DropdownMenuTrigger asChild>
            <Button variant='secondary' size='icon'>
              <ListFilter className="h-[2rem] w-[2rem]"/> 
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-30 ml-10">
            <DropdownMenuLabel className="flex justify-center">Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* ADD FUNCTIONALIY TO THE BUTTONS 🎯 */}
            <DropdownMenuItem onClick={() => {setSortOrder("")}}>
              <Sparkles />
              <div className="pl-5">Default</div>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => {setSortOrder("alph")}}>
              <ArrowDownAZ />
              <div className="pl-5">Title A-Z</div>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => {setSortOrder("alph_rev")}}>
              <ArrowUpAZ />
              <div className="pl-5">Title Z-A</div>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => {setSortOrder("date")}}>
              <ArrowDown10 />
              <div className="pl-5">Date </div>
            </DropdownMenuItem>

          </DropdownMenuContent>

          </DropdownMenu>
      </div>
    
    
      <div className="flex justify-center flex-row flex-wrap gap-8 pb-10 pt-32 mx-10">
        
        {/* ADD NEW IDEA */}
        <div className=" mx-14 h-40 min-h-fit w-40 mt-10 px-3 py-3 border-b border-primary/10 bg-secondary transition duration-400 hover:scale-110 hover:bg-secondary/80 flex flex-col hover:drop-shadow-2xl rounded-full">
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


        {sortedData.map((item, index) => (
          <Card2
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

export default IdeaBoard2;
