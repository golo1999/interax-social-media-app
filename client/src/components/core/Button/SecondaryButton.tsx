import { BaseButton, BaseButtonProps } from "./BaseButton";

// The gray button
export function SecondaryButton({ ...props }: BaseButtonProps) {
  return (
    <BaseButton
      {...props}
      backgroundColor="BlackOlive"
      color="White"
      hoverBackgroundColor="DarkLiver"
    />
  );
}
