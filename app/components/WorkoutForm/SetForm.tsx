import { HiClipboardCopy, HiMinus, HiPlus } from "react-icons/hi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import StepForm from "./StepForm";
import Input from "../Basic/Input";
import { IoCopyOutline } from "react-icons/io5";

export default function SetForm() {
  const { sets, setSets } = useWorkoutStore();

  const addSet = () => {
    setSets([
      ...sets,
      { name: "", steps: [{ duration: 0, speed: 0, legend: "" }] },
    ]);
  };

  const handleSetChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value;
    setSets(updatedSets);
  };

  const duplicateSet = (index: number) => {
    const updatedSets = [...sets];
    const duplicatedSet = {
      ...updatedSets[index],
      steps: updatedSets[index].steps.map((step) => ({ ...step })),
    };
    setSets([...sets, duplicatedSet]);
  };

  const removeSet = (index: number) => {
    const updatedSets = sets.filter((_, i) => i !== index);
    setSets(updatedSets);
  };

  const handleSetReorder = (result) => {
    if (!result.destination) return;
    const updatedSets = Array.from(sets);
    const [reorderedSet] = updatedSets.splice(result.source.index, 1);
    updatedSets.splice(result.destination.index, 0, reorderedSet);
    setSets(updatedSets);
  };

  return (
    <div className="border border-black rounded-md p-4 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3>SETS</h3>
      </div>
      <DragDropContext onDragEnd={handleSetReorder}>
        <Droppable droppableId="sets">
          {(provided) => (
            <div className="flex flex-col gap-6" ref={provided.innerRef} {...provided.droppableProps}>
              {sets.map((set, setIndex) => (
                <Draggable
                  key={setIndex}
                  draggableId={`set-${setIndex}`}
                  index={setIndex}
                >
                  {(provided) => (
                    <div
                      className="relative border border-black rounded-md p-4 bg-white flex flex-col gap-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Input
                        name={`set_name_${setIndex}`}
                        value={set.name}
                        placeholder="Set Name"
                        onChange={(e) => {
                          const updatedSets = [...sets];
                          updatedSets[setIndex].name = e.target.value;
                          setSets(updatedSets);
                        }}
                      />
                      <StepForm setIndex={setIndex} />
                      <div className="absolute -top-3 -right-3 flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => duplicateSet(setIndex)}
                          className="bg-red-400 flex items-center justify-center w-6 h-6 border border-black rounded-full"
                        >
                          <IoCopyOutline />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSet(setIndex)}
                          className="bg-red-400 flex items-center justify-center w-6 h-6 border border-black rounded-full"
                        >
                          <HiMinus />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        type="button"
        onClick={addSet}
        className="w-full rounded-md border border-black"
      >
        Add Set
      </button>
    </div>
  );
}
