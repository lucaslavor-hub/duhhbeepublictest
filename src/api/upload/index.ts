import { CreateFn } from '../types';
import { UploadBody } from './type';
import * as FileSystem from 'expo-file-system';
import { API_URL } from '@/config';

export const postUpload: CreateFn<UploadBody, FileSystem.FileSystemUploadResult> = async ({
  body,
}) => {
  return await FileSystem.uploadAsync(`${API_URL}/upload`, body.files, {
    httpMethod: 'POST',
    fieldName: 'files',
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    parameters: {
      ref: body.ref,
      refId: body.refId.toString(),
      field: body.field,
    },
    headers: {
      Authorization: `Bearer ${body.jwt}`,
    },
  });
};
