import { getVideos } from '@/api/videos';
import { useGetInfinitePagination } from '@/hooks';
import { parseInfiniteData } from '@/utils/functions/parseInfiniteData';
import Toast from 'react-native-toast-message';

export const useVideos = () => {
  const { data, isLoading, fetchNextPage, isError } = useGetInfinitePagination({
    queryKey: 'videos',
    queryFunction: getVideos,
    params: {
      pagination: {
        pageSize: 25,
      },
      populate: ['videoUrl'],
    },
  });

  const formattedVideos = parseInfiniteData(data);

  const videos = formattedVideos.map((video) => ({
    id: video.id,
    uri: video.videoUrl?.url,
    title: video.title,
    duration: video.duration,
  }));

  if (isError) {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error while fetching videos.',
    });
  }

  return { videos, fetchNextPage, isLoading, isError };
};
