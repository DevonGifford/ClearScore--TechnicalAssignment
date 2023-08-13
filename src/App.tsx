import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

//import IdeaBoard from "./components/IdeaBoard";
import IdeaBoard2 from "./components/IdeaBoar2";

interface Idea {
  unique_key: string;
  title: string;
  description: string;
  created_at: string;
  edited_at: string;
}

function App() {
  const [data, setData] = useState<Idea[]>([]);

  // ✅ Check local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("ideas");
    if (storedData) {
      setData(JSON.parse(storedData));
      console.log("Data retrieved from local storage:", storedData); //🤓
    }
  }, [setData]);

  // ✅ UPDATE LOCAL STORAGE, with new data
  const updateLocalStorage = (newData: Idea[]) => {
    console.log("saving to localstorage, new data: ", newData); //🤓
    localStorage.setItem("ideas", JSON.stringify(newData));
    console.log("data pushed to local storage"); //🤓
  };

  // ✅ CREATE-IDEA: new idea, updateState & localStorage
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
    console.log("New Idea data to be pushed to local storage: ", newIdea); //🤓
    //saveStateToLocalStorage();
    updateLocalStorage(newIdea);
  };

  // ✅ DELETE-IDEA: idea via unique_key, updateState & localStorage
  const handleDeleteIdea = (unique_key: string) => {
    const updatedData = data.filter(
      (element) => element.unique_key !== unique_key,
    );
    setData(updatedData);
    console.log(
      "Post deleted data to be pushed to local storage: ",
      updatedData,
    ); //🤓
    //saveStateToLocalStorage();
    updateLocalStorage(updatedData);
  };

  // ✅ EDIT-IDEA: via input change, updateState & localStorage
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
    console.log("Edited data to be pushed to local storage: ", updatedData); //🤓
    //saveStateToLocalStorage();
    updateLocalStorage(updatedData);
  };

  // Sort data by date and update state and local storage 🎯

  // Sort data alphabetically and update state and local storage🎯

  return (
    <div className="h-full">
      <Navbar handleCreateIdea={handleCreateIdea} />
      {/* <Filters & Search /> */}
      <IdeaBoard2
        data={data}
        handleDeleteIdea={handleDeleteIdea}
        handleCreateIdea={handleCreateIdea}
        handleEditIdea={handleEditIdea}
        // sortData={}
        // sortAlphabetical={}
      />
      {/* <IdeaBoard /> */}
    </div>
  );
}

export default App;

// THIS IS THE OLD WAY I WAS UPDATING LOCAL STORAGE....
// -------------------------------------------------------
// const saveStateToLocalStorage = () => {
//   const serializedData = data.map(idea => ({
//     unique_key: idea.unique_key,
//     title: idea.title,
//     description: idea.description,
//     created_at: idea.created_at,
//     edited_at: idea.edited_at,
//   }));
//   console.log("this is the data being pushed to LocalStorage via saveStateToLocalStorage", serializedData) //🤓
//   localStorage.setItem("ideas", JSON.stringify(serializedData));
// };
