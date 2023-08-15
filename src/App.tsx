import { useEffect, useState } from "react";
import IdeaBoard from "./components/IdeaBoard";
import Navbar from "./components/Navbar";
import toast from "react-hot-toast";

interface Idea {
  unique_key: string;
  title: string;
  description: string;
  created_at: string;
  edited_at: string;
}

function App() {
  const [data, setData] = useState<Idea[]>([]);

  //✅ Check local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("ideas");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [setData]);
  //✅ UPDATE LOCAL STORAGE, with new data
  const updateLocalStorage = (newData: Idea[]) => {
    localStorage.setItem("ideas", JSON.stringify(newData));
  };
  //✅ CREATE-IDEA: new idea, updateState & localStorage
  const handleCreateIdea = () => {
    const lazyKey = new Date().toISOString();
    const newIdea = [
      {
        unique_key: lazyKey,
        edited_at: "",
        created_at: lazyKey.split("T")[0],
        title: "",
        description: "",
      },
      ...data,
    ];
    setData(newIdea);
    updateLocalStorage(newIdea);
    toast.success("Successfully created idea!");
  };
  //✅ DELETE-IDEA: idea via unique_key, updateState & localStorage
  const handleDeleteIdea = (unique_key: string) => {
    const updatedData = data.filter(
      (element) => element.unique_key !== unique_key,
    );
    setData(updatedData);
    updateLocalStorage(updatedData);
    toast.success("Successfully deleted!");
  };
  //✅ EDIT-IDEA: via input change, updateState & localStorage
  const handleEditIdea = (
    index: number,
    title: string,
    description: string,
  ) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      title,
      description,
      edited_at: new Date().toISOString().split("T")[0],
    };
    setData(updatedData);
    updateLocalStorage(updatedData);
    toast.success("Successfully updated idea!");
  };

  return (
    //🎯 remove handle create idea function from the navbar
    <div className="h-full">
      <Navbar handleCreateIdea={handleCreateIdea} />
      <IdeaBoard
        data={data}
        handleDeleteIdea={handleDeleteIdea}
        handleCreateIdea={handleCreateIdea}
        handleEditIdea={handleEditIdea}
      />
    </div>
  );
}

export default App;
