import React, { FC } from 'react';
import {
  View as RNView,
  ViewProps as RNViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

const MARGIN_VARIATIONS = {
  m: 'margin',
  ml: 'marginLeft',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  mx: 'marginHorizontal',
  my: 'marginVertical',
} as const;

const PADDING_VARIATIONS = {
  p: 'padding',
  pl: 'paddingLeft',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
} as const;
export const PADDING_PATTERN = new RegExp(`p[ltrbxy]?-([0-9]*)`);

type MarginLiterals = keyof typeof MARGIN_VARIATIONS;
// type NativeMarginModifierKeyType = typeof MARGIN_VARIATIONS[MarginLiterals];
type PaddingLiterals = keyof typeof PADDING_VARIATIONS;
type NativePaddingKeyType = typeof PADDING_VARIATIONS[PaddingLiterals];
type Modifier<T extends string> = Partial<Record<T, number>>;
type PaddingModifiers = Modifier<PaddingLiterals>;
type MarginModifiers = Modifier<MarginLiterals>;
type ContainerModifiers = PaddingModifiers & MarginModifiers;

export interface ViewProps
  extends Omit<RNViewProps, 'style'>,
    ContainerModifiers {
  /**
   * Set background color
   */
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const View: FC<ViewProps> = (props: any) => {
  console.log('View props', props);

  function generateModifiersStyle(
    options = {
      paddings: true,
      margins: true,
    }
  ) {
    //@ts-ignore
    const style: ExtractedStyle = {};

    if (options.paddings) {
      style.paddings = extractPaddingValues();
    }
    // if (options.margins) {
    //   style.margins = extractMarginValues(boundProps);
    // }

    return style;
  }
  function extractPaddingValues() {
    const paddings: Partial<Record<NativePaddingKeyType, number>> = {};
    const paddingPropsKeys = Object.keys(props).filter((key) =>
      PADDING_PATTERN.test(key)
    );
    paddingPropsKeys.forEach((key) => {
      console.log('key asdf asdf', key);
      if (props[key] === true) {
        const [paddingKey, paddingValue] = key.split('-') as [
          keyof typeof PADDING_VARIATIONS,
          string
        ];
        const paddingVariation = PADDING_VARIATIONS[paddingKey];
        if (!isNaN(Number(paddingValue))) {
          paddings[paddingVariation] = Number(paddingValue);
        }
      }
    });

    return paddings;
  }
  const { paddings } = generateModifiersStyle();
  console.log('paddings', paddings);
  return <RNView style={[paddings]}>{props.children}</RNView>;
};

export default View;
