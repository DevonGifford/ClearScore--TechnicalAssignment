import { useReadLocalStorage } from "@/hooks/useReadLocalStorage";
import IdeaCard from "./IdeaCards";
//import Card from "./Card";

interface Idea {
  unique_key: string;
  title: string;
  description: string;
  created_at: string;
  edited_at: string;
}

const IdeaBoard = () => {
  const ideaData = useReadLocalStorage<Idea[]>("ideas");
  // console.log(ideaData);
  // console.log('render');

  return (
    <div className="pt-24 flex text-center justify-center align-middle">
      <IdeaCard data={ideaData as Idea[]} />
      {/* <Card 
        date={}
        title={}
        description={}
        handleChange={}
        deleteCard={}
      /> */}
    </div>
  );
};

export default IdeaBoard;
