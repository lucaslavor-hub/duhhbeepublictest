import { Text, YStack } from 'tamagui';
import { AnalysisCard } from './components';
import { AnalysisCardSecondary } from './components/AnalysisCardSecondary';
import { AnalysisFallback } from './components/AnalysisFallback';
import { useAnalysis } from './hooks/useAnalysis';
import { queryClient } from '@/lib/tanstack-query';
import { useEffect } from 'react';

export const Analysis = () => {
  const { analysis, analysisSecondary, isLoading } = useAnalysis();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }, []);

  if (isLoading) return <AnalysisFallback />;

  return (
    <YStack flex={1} alignItems="flex-start" gap={24}>
      <Text fontSize={22} fontWeight={600} color="$brandBrown">
        Here’s your analysis
      </Text>

      {/* ASK FOR CORRECT ASSET */}
      <YStack flex={1} width="100%" gap={24}>
        {analysis.map((item) => {
          return <AnalysisCard key={item.id} item={item} />;
        })}
        {analysisSecondary.map((item) => {
          return <AnalysisCardSecondary key={item.id} item={item} />;
        })}
      </YStack>
    </YStack>
  );
};
