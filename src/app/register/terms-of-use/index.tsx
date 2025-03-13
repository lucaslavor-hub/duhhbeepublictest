import { ScrollView, View } from 'tamagui';
import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { TermsDocument } from '@/modules/Auth/pages/Register';

export default function TermsOfUseScreen() {
  return (
    <BackgroundWrapper>
      <View h={120} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TermsDocument />
      </ScrollView>
    </BackgroundWrapper>
  );
}
