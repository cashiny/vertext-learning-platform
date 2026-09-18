export const textStyles = {
  display1: "font-display text-[48px] leading-[56px] font-bold",
  display2: "font-display text-[36px] leading-[44px] font-bold",
  heading1: "font-sans text-[28px] leading-[36px] font-semibold",
  heading2: "font-sans text-[22px] leading-[30px] font-semibold",
  heading3: "font-sans text-[18px] leading-[26px] font-medium",
  bodyLarge: "font-sans text-[16px] leading-[24px] font-normal",
  body: "font-sans text-[14px] leading-[20px] font-normal",
  small: "font-sans text-[12px] leading-[16px] font-normal",
} as const;

export type TextStyle = keyof typeof textStyles;
