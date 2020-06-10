import { TVariants, TCustomStyle, TSize } from '../../utils/types';

interface IButtonBase {
  customStyle?: TCustomStyle;
  size?: TSize;
  block?: boolean;
  outline?: boolean | 'withColor';
  icon?: React.ReactNode;
  iconRight?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  negative?: boolean;
}

export interface IButton
  extends React.HTMLAttributes<HTMLButtonElement>,
    IButtonBase {
  variant?: TVariants;
}

export interface IButtonStyled extends IButtonBase {
  variant: TVariants;
  as?: React.ElementType;
}
