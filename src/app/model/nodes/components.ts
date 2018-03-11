import {MathComponents} from "./math-components";
import {ProducerComponents} from "./producer-components";
import {OutputComponents} from "./output-components";
import {FilterComponents} from "./filter-components";

export const AllComponents = [
  {title: "Producer Components", components: ProducerComponents},
  {title: "Math Components", components: MathComponents},
  {title: "Filter Components", components: FilterComponents},
  {title: "Output Components", components: OutputComponents}
];

export const AllComponentsFlat = [...ProducerComponents, ...MathComponents, ...FilterComponents, ...OutputComponents];