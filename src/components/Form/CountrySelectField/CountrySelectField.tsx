import { Adapt, Select, Sheet } from 'tamagui';
import { Option } from '@/types';
import { Image } from 'expo-image';
import { Dimensions } from 'react-native';

type CountrySelectFieldProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  variant?: 'primary' | 'secondary';
};

export const CountrySelectField = ({
  value,
  onChange,
  placeholder = 'Select...',
  variant = 'primary',
  options,
}: CountrySelectFieldProps) => {
  const alphabeticOptions = options?.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select value={value} onValueChange={onChange}>
      <Select.Trigger
        width={Dimensions.get('window').width}
        bg={variant === 'secondary' ? '$brandGray' : 'white'}
        borderWidth={1}
        borderColor="#D4D4D4"
        borderRadius={12}
        px={12}
        py={16}
      >
        <Select.Value
          h="$4"
          fontSize="$sm"
          color="$brandBrown"
          opacity={!value ? 0.5 : 1}
          placeholder={placeholder}
        />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame bg="white" padding={16}>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group gap={8}>
            {alphabeticOptions?.map(({ value, label }, index) => {
              return (
                <Select.Item
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  height={24}
                  key={index}
                  index={index}
                  value={label}
                >
                  <Select.ItemText>{label}</Select.ItemText>
                  <Image source={value} style={{ width: 24, height: 24 }} />
                </Select.Item>
              );
            })}
            <Select.Label />
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
};
