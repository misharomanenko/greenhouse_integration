// exports the tailwind config for runtime usage (useful colors in dataviz)
import resolveConfig from 'tailwindcss/resolveConfig';

import rawConfig from '../tailwind.config';

const tw = resolveConfig(rawConfig);
export default tw;
