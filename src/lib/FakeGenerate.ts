// -  Pushing the Fake ideas to local storage for tempIdeaData.json development & testing
import tempData from "../assets/FakeIdeaData.json";

export default function generateIdeas() {
  const fakeIdeaData = tempData;
  localStorage.setItem("ideas", JSON.stringify(fakeIdeaData));
}
