/*
  Pushing the ideas to local storage for tempIdeaData.json development
*/

//import tempIdeaData from "../assets/tempIdeaData.json";
import tempData from "../assets/FakeIdeaData.json";

export default function generateIdeas() {
  const fakeIdeaData = tempData;
  localStorage.setItem("ideas", JSON.stringify(fakeIdeaData));
}
