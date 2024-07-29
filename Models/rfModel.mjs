import { readFileSync } from 'fs';
import { load } from 'pickle';

const loadModel = (modelPath) => {
  return load(readFileSync(modelPath));
};

export default loadModel;