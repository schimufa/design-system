import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  validateVersion,
  logVersionWarning,
  ComponentVersion,
} from '../../utils/version-manager';

export interface ButtonProps extends MuiButtonProps {
  version?: ComponentVersion;
}

const StyledButton = styled(MuiButton)<ButtonProps>`
  ${({ version }) => {
    switch (version) {
      case '2.0.0':
        return `
          border-radius: 20px;
          text-transform: none;
        `;
      default:
        return `
          border-radius: 4px;
          text-transform: uppercase;
        `;
    }
  }}
`;

/**
 * @version 1.0.0 - Initial button with uppercase text and sharp corners
 * @version 2.0.0 - Updated design with rounded corners and normal text case
 */
export const Button: React.FC<ButtonProps> = ({ version, ...props }) => {
  const validatedVersion = validateVersion('Button', version);

  // Log development warnings
  logVersionWarning('Button', validatedVersion);

  return <StyledButton version={validatedVersion} {...props} />;
};

Button.displayName = 'Button';

export default Button;
