import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const TvIcon = (props: SvgProps) => (
  <Svg width={20} height={22} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.039 1a14.616 14.616 0 0 0 3.653 3.893"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.306 17.778c.19 1.524 1.324 2.716 2.715 2.86 4.034.417 7.924.417 11.958 0 1.391-.144 2.526-1.336 2.715-2.86.408-3.274.408-6.38 0-9.654-.19-1.524-1.324-2.716-2.715-2.86a57.26 57.26 0 0 0-11.958 0C2.63 5.408 1.495 6.6 1.306 8.124a38.264 38.264 0 0 0 0 9.654Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.962 1a14.617 14.617 0 0 1-3.653 3.893"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M6 14.951c.841 1.13 2.318 1.881 4 1.881s3.159-.75 4-1.88"
    />
  </Svg>
);
