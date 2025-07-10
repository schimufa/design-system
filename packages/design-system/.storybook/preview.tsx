import type { Preview } from '@storybook/react';
import { ThemeDecorator } from './ThemeDecorator';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [ThemeDecorator],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'finance',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'finance', title: 'Finance Theme' },
          { value: 'logistics', title: 'Logistics Theme' },
          { value: 'sales', title: 'Sales Theme' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
