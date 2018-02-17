import {MathComponents} from "./math-components";
import {ProducerComponents} from "./producer-components";
import {FilterComponents} from "./filter-components";
import {TransformComponents} from "./transform-components";
import {OutputComponents} from "./output-components";


export const AllComponents = [

  {title: "Producer Components", components: ProducerComponents},

  {title: "Math Components", components: MathComponents},

  {title: "Output Components", components: OutputComponents}
];

export const AllComponentsFlat = [...ProducerComponents ,...MathComponents, ...OutputComponents];