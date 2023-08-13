import { useState } from "react";
import { CopyPlus } from "lucide-react";
import { ModeToggle } from "./theme/theme-toggle";
import { Button } from "./ui/button";

import NewIdeaModal from "./theme/theme-modal";
import IdeaForm from "./IdeaForm";

interface NavBarProps {
  handleCreateIdea: () => void;
}

const Navbar: React.FC<NavBarProps> = ({ handleCreateIdea }) => {
  const [open, setOpen] = useState(false);

  const closeNewIdeaModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary h16">
        {/* LEFT SIDE */}
        <div className="flex gap-2">
          <h1 className=" md:block text-2xl sm:text-3xl md:text-4xl md:mb-1 font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-transparent bg-clip-text">
            IdeaBank
          </h1>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex gap-5">
          <Button
            size="default"
            variant="premium"
            className="mt-1"
            onClick={() => setOpen(true)} //🎯 +Idea functionality
          >
            <CopyPlus className="h-5 w-5 mr-2" /> NEW IDEA
          </Button>
          <ModeToggle />
        </div>
      </div>
      <NewIdeaModal open={open} onClose={() => setOpen(false)}>
        <IdeaForm
          closeFormModal={closeNewIdeaModal}
          handleCreateIdea={handleCreateIdea}
        />
      </NewIdeaModal>
    </>
  );
};

export default Navbar;
