import { BaseButton, BaseButtonProps } from "./BaseButton";

export function TertiaryButton({ ...props }: BaseButtonProps) {
  return (
    <BaseButton
      {...props}
      as="input"
      backgroundColor="BlueCrayola"
      color="White"
      disabledBackgroundColor="Platinum"
      disabledColor="AmericanSilver"
      fontWeight="700"
      hoverBackgroundColor="BrightNavyBlue"
    />
  );
}
