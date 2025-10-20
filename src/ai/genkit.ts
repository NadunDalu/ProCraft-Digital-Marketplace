import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const model = process.env.NEXT_PUBLIC_AI_MODEL || process.env.NEXT_PUBLIC_GENKIT_MODEL || 'gpt-5';

export const ai = genkit({
  plugins: [googleAI()],
  model,
});
