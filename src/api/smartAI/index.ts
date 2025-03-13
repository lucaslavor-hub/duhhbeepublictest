import { CreateFn } from '../types';
import { SmartAIResponse } from './types';

export const postSmartAI: CreateFn<{ image: string }, SmartAIResponse> = async ({ body }) => {
  const formData = new FormData();
  formData.append('image', {
    uri: body.image,
    name: 'photo.jpg',
    type: 'image/jpeg',
  } as any);

  const response = await fetch('https://0hpvlgqqgb.execute-api.us-east-2.amazonaws.com/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer je#D1pI01K0hx$pP`,
    },
    body: formData,
  });

  if (!response.ok) {
    const parsedErrorBody: { error: string } = await response.json();
    throw new Error(JSON.stringify(parsedErrorBody.error));
  }

  const parsedBody: SmartAIResponse = await response.json();
  return parsedBody;
};
