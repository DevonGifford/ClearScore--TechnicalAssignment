import { PlusCircle } from "lucide-react";
import Card2 from "./Card2";
import { Button } from "./ui/button";

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
  return (
    <div className="flex justify-center flex-row flex-wrap gap-8 pb-10 pt-32 mx-10">
      {/* <IdeaCard data={ideaData as Idea[]} /> */}
      {/* ADD NEW CARD FUNCTIONALITY 🎯 */}
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
      {data.map((item, index) => (
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
  );
};

export default IdeaBoard2;
