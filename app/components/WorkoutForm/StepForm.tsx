import { HiMinus, HiPlus } from "react-icons/hi";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import Input from "../Basic/Input";
import { IoCopyOutline } from "react-icons/io5";
import { Step } from "@/app/types";

export default function StepForm({ setIndex }: { setIndex: number }) {
  const { sets, setSets } = useWorkoutStore();

  const addStep = () => {
    const updatedSets = [...sets];
    updatedSets[setIndex].steps.push({ duration: 0, speed: 0, legend: "" });
    setSets(updatedSets);
  };

  const duplicateStep = (setIndex: number, stepIndex: number) => {
    const updatedSets = [...sets];
    const duplicatedStep = { ...updatedSets[setIndex].steps[stepIndex] };
    updatedSets[setIndex].steps.push(duplicatedStep);
    setSets(updatedSets);
  };

  const removeStep = (setIndex: number, stepIndex: number) => {
    const updatedSets = [...sets];
    updatedSets[setIndex].steps = updatedSets[setIndex].steps.filter(
      (_, i) => i !== stepIndex
    );
    setSets(updatedSets);
  };

  const handleStepChange = <T extends keyof Step>(
    setIndex: number,
    stepIndex: number,
    field: T,
    value: Step[T]
  ) => {
    const updatedSets = [...sets];
    updatedSets[setIndex].steps[stepIndex][field] = value;
    setSets(updatedSets);
  };

  const handleStepReorder = (result: DropResult) => {
    if (!result.destination) return;
    const updatedSets = [...sets];
    const steps = Array.from(updatedSets[setIndex].steps);
    const [reorderedStep] = steps.splice(result.source.index, 1);
    steps.splice(result.destination.index, 0, reorderedStep);
    updatedSets[setIndex].steps = steps;
    setSets(updatedSets);
  };

  return (
    <div className="flex flex-col gap-6">
      <DragDropContext onDragEnd={handleStepReorder}>
        <Droppable droppableId={`steps-${setIndex}`}>
          {(provided) => (
            <div
              className="flex flex-col gap-6"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {sets[setIndex].steps.map((step, stepIndex) => (
                <Draggable
                  key={stepIndex}
                  draggableId={`step-${stepIndex}`}
                  index={stepIndex}
                >
                  {(provided) => (
                    <div
                      className="relative bg-white p-4 border border-black rounded-md grid grid-cols-2 gap-4"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Input
                        name={`sets[${setIndex}].steps[${stepIndex}].legend`}
                        value={step.legend}
                        placeholder="Step Legend"
                        className="col-span-2"
                        onChange={(e) => {
                          const updatedSets = [...sets];
                          updatedSets[setIndex].steps[stepIndex].legend =
                            e.target.value;
                          setSets(updatedSets);
                        }}
                      />
                      <Input
                        name="duration"
                        type="number"
                        placeholder="Duration"
                        value={Number(step.duration)}
                        onChange={(e) =>
                          handleStepChange(
                            setIndex,
                            stepIndex,
                            "duration",
                            Number(e.target.value)
                          )
                        }
                        className="w-full"
                        suffix="s"
                      />
                      <Input
                        name="speed"
                        type="number"
                        placeholder="Speed"
                        value={Number(step.speed)}
                        onChange={(e) =>
                          handleStepChange(
                            setIndex,
                            stepIndex,
                            "speed",
                            Number(e.target.value)
                          )
                        }
                        suffix="KPH"
                        className="w-full"
                      />
                      <div className="absolute -top-3 -right-3 flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => duplicateStep(setIndex, stepIndex)}
                          className="bg-red-400 flex items-center justify-center w-6 h-6 border border-black rounded-full"
                        >
                          <IoCopyOutline />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeStep(setIndex, stepIndex)}
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
        onClick={addStep}
        className="rounded-md border border-black"
      >
        Add Step
      </button>
    </div>
  );
}
