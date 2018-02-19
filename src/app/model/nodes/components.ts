import {MathComponents} from "./math-components";
import {ProducerComponents} from "./producer-components";
import {FilterComponents} from "./filter-components";
import {TransformComponents} from "./transform-components";
import {OutputComponents} from "./output-components";
import {numSocket} from "../sockets/sockets";


export const AllComponents = [
  {title: "Producer Components", components: ProducerComponents},
  {title: "Math Components", components: MathComponents},
  {title: "Filter Components", components: FilterComponents},
  {title: "Transform Components", components: TransformComponents},
  {title: "Output Components", components: OutputComponents}
];

export const AllComponentsFlat = [...ProducerComponents ,...MathComponents, ...OutputComponents];