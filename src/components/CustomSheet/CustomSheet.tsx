import { ComponentProps, ReactNode, useState } from 'react';
import { Sheet, View } from 'tamagui';

type ChildrenProps = {
  open: boolean;
  openSheet: () => void;
  closeSheet: () => void;
};

type CustomSheetProps = {
  sheetScrollViewProps?: ComponentProps<typeof Sheet.ScrollView>;
  sheetFrameProps?: ComponentProps<typeof Sheet.Frame>;
  trigger: ({ open, openSheet, closeSheet }: ChildrenProps) => ReactNode;
  children: ({ open, openSheet, closeSheet }: ChildrenProps) => ReactNode;
} & Omit<ComponentProps<typeof Sheet>, 'children'>;

export const CustomSheet = ({
  trigger,
  sheetFrameProps,
  sheetScrollViewProps,
  children,
  ...rest
}: CustomSheetProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);

  const openSheet = () => setOpen(true);
  const closeSheet = () => setOpen(false);

  return (
    <View>
      {trigger({ open, openSheet, closeSheet })}

      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPointsMode="fit"
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        moveOnKeyboardChange
        animation="quick"
        {...rest}
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame bg="white" {...sheetFrameProps}>
          <Sheet.ScrollView contentContainerStyle={{ flex: 1 }} {...sheetScrollViewProps}>
            {children({ open, closeSheet, openSheet })}
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </View>
  );
};
