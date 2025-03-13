import { FlashList } from '@shopify/flash-list';
import { ScrollView, Spinner, Text, View, YStack } from 'tamagui';
import { VideoCard } from '../components/VideoCard';
import { useVideos } from '../hooks';
import React from 'react';

export const Videos = () => {
  const { videos, isLoading, fetchNextPage } = useVideos();

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center">
        <Spinner size="small" color="$brandBrown" />
      </YStack>
    );
  }

  return (
    <ScrollView
      onTouchEnd={() => fetchNextPage()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        padding: 28,
        display: 'flex',
        justifyContent: videos.length ? 'flex-start' : 'center',
        backgroundColor: '$brandWhite',
      }}
    >
      {!videos.length && <Text alignSelf="center">No videos were found.</Text>}
      {videos.length > 0 && (
        <View width="100%" height="100%">
          <FlashList
            numColumns={1}
            ItemSeparatorComponent={() => <View h={40} />}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return <VideoCard {...item} />;
            }}
            estimatedItemSize={50}
            data={videos}
          />
          <View height={50} />
        </View>
      )}
    </ScrollView>
  );
};
