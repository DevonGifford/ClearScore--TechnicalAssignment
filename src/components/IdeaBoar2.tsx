import { Wand2 } from "lucide-react";
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
  //handleCreateIdea,
}) => {


  return (
    <div className="flex justify-center flex-row flex-wrap gap-8 pb-10 pt-32 mx-10">
      {/* <IdeaCard data={ideaData as Idea[]} /> */}
      {data.map((item, index) => (
        <Card2
          {...item}
          index={index}
          key={item.unique_key}
          date={item.created_at}
          title={item.title}
          description={item.description}
          handleDeleteIdea={() => handleDeleteIdea(item.unique_key)}
          handleEditIdea={(index, title, description) =>
            handleEditIdea(index, title, description)  
          }      
          //handleChange={event => handleChange(item.unique_key)}
          //handleEditIdea={(event) => handleEditIdea(item.unique_key, event)}
        />
      ))}
      <div className="h-72 min-h-fit w-64 px-3 py-3 border-b border-primary/10 bg-secondary transition duration-400 hover:scale-110 hover:bg-secondary/80 flex flex-col hover:drop-shadow-2xl rounded-lg">
        <div className="w-full flex justify-center items-center mt-24">
          <Button
            size="lg"
            variant="premium"
          >
            <span>New Idea</span> <Wand2 className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IdeaBoard2;
