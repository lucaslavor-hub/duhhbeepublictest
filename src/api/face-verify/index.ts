import * as FileSystem from 'expo-file-system';
import { CreateFn } from '../types';

export class FaceVerifyError {
  code: string;
  status: number;

  constructor(code: string, status: number) {
    this.code = code;
    this.status = status;
  }
}

export const postFaceVerify: CreateFn<{ image: string }, void> = async ({ body }) => {
  const response = await FileSystem.uploadAsync(
    'https://vistoriaapi.compute.capital/api/verify-face',
    body.image,
    {
      httpMethod: 'POST',
      fieldName: 'file',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      headers: {
        testredirect: 'true',
      },
    },
  );

  if (response.status !== 200) {
    const parsedErrorBody: { detail: string } = JSON.parse(response.body);
    throw new FaceVerifyError(parsedErrorBody.detail, response.status);
  }
};
