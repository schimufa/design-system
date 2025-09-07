/**
 * Comprehensive Button component tests for external contributions
 * This demonstrates the testing standards expected from external teams
 */

import { screen, fireEvent } from '@testing-library/react';
import { Button } from '../index';
import {
  renderWithTheme,
  testAccessibility,
  testVisualRegression,
  testComponentVersions,
  testPerformance,
  testKeyboardNavigation,
  testPropsValidation,
  testComponentAPI,
  createComponentTestSuite,
} from '../../test-utils/contribution-testing';

// Example of comprehensive component testing for external contributions
describe('Button Component - Contribution Standards', () => {
  // Basic functionality tests
  describe('Basic Functionality', () => {
    it('renders with text content', () => {
      renderWithTheme(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('handles click events', () => {
      const handleClick = jest.fn();
      renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports disabled state', () => {
      renderWithTheme(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Version compatibility tests
  describe('Version Compatibility', () => {
    testComponentVersions('Button', Button, { children: 'Test Button' }, [
      '1.0.0',
      '2.0.0',
    ]);

    it('applies correct styles for version 1.0.0', () => {
      renderWithTheme(<Button version="1.0.0">V1 Button</Button>);
      const button = screen.getByRole('button');

      // Check for version-specific styles
      expect(button).toHaveStyle({
        borderRadius: '4px',
        textTransform: 'uppercase',
      });
    });

    it('applies correct styles for version 2.0.0', () => {
      renderWithTheme(<Button version="2.0.0">V2 Button</Button>);
      const button = screen.getByRole('button');

      // Check for version-specific styles
      expect(button).toHaveStyle({
        borderRadius: '20px',
        textTransform: 'none',
      });
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('meets WCAG accessibility standards', async () => {
      await testAccessibility(<Button>Accessible Button</Button>);
    });

    it('supports ARIA labels', () => {
      renderWithTheme(<Button aria-label="Submit form">Submit</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-label', 'Submit form');
    });

    it('supports ARIA describedby', () => {
      renderWithTheme(
        <div>
          <Button aria-describedby="help-text">Action</Button>
          <div id="help-text">This button performs an action</div>
        </div>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
    });

    it('handles loading state accessibility', () => {
      renderWithTheme(<Button aria-busy="true">Loading...</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  // Keyboard navigation tests
  testKeyboardNavigation('Button', <Button>Keyboard Test</Button>);

  // Visual regression tests
  testVisualRegression(
    'Button',
    <Button variant="contained">Visual Test</Button>
  );

  // Performance tests
  testPerformance('Button', <Button>Performance Test</Button>);

  // Props validation tests
  testPropsValidation('Button', Button, { children: 'Valid Button' }, [
    {
      description: 'accepts valid variant prop',
      props: { variant: 'outlined' },
      shouldError: false,
    },
    {
      description: 'accepts valid size prop',
      props: { size: 'large' },
      shouldError: false,
    },
    {
      description: 'accepts valid color prop',
      props: { color: 'primary' },
      shouldError: false,
    },
  ]);

  // Component API consistency tests
  testComponentAPI('Button', Button, { children: 'API Test' });

  // Theme compatibility tests
  describe('Theme Compatibility', () => {
    const themes = ['finance', 'logistics', 'sales'] as const;

    themes.forEach((theme) => {
      it(`renders correctly with ${theme} theme`, () => {
        const { container } = renderWithTheme(
          <Button variant="contained">Themed Button</Button>,
          { theme }
        );

        expect(container.firstChild).toBeInTheDocument();
        expect(container.firstChild).toMatchSnapshot(`button-${theme}-theme`);
      });
    });
  });

  // Material-UI integration tests
  describe('Material-UI Integration', () => {
    it('supports Material-UI variant prop', () => {
      renderWithTheme(<Button variant="outlined">Outlined</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('MuiButton-outlined');
    });

    it('supports Material-UI size prop', () => {
      renderWithTheme(<Button size="large">Large Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('MuiButton-sizeLarge');
    });

    it('supports Material-UI color prop', () => {
      renderWithTheme(<Button color="secondary">Secondary</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('MuiButton-colorSecondary');
    });

    it('supports sx prop for custom styling', () => {
      renderWithTheme(
        <Button sx={{ backgroundColor: 'red' }}>Custom Styled</Button>
      );
      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    it('handles missing children gracefully', () => {
      expect(() => {
        renderWithTheme(<Button />);
      }).not.toThrow();
    });

    it('handles invalid version prop gracefully', () => {
      // This should fall back to default version
      expect(() => {
        renderWithTheme(<Button version={'invalid' as any}>Test</Button>);
      }).not.toThrow();
    });
  });

  // Integration tests
  describe('Integration', () => {
    it('works within forms', () => {
      renderWithTheme(
        <form onSubmit={jest.fn()}>
          <Button type="submit">Submit Form</Button>
        </form>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('works with React Router Link', () => {
      // Mock Link component for testing
      const MockLink = ({ children, ...props }: any) => (
        <a {...props}>{children}</a>
      );

      renderWithTheme(
        <Button component={MockLink} href="/test">
          Link Button
        </Button>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  // Edge cases
  describe('Edge Cases', () => {
    it('handles very long text content', () => {
      const longText =
        'This is a very long button text that might cause layout issues if not handled properly';

      renderWithTheme(<Button>{longText}</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveTextContent(longText);
      expect(button).toBeInTheDocument();
    });

    it('handles special characters in text', () => {
      const specialText = '🚀 Submit & Continue → 100%';

      renderWithTheme(<Button>{specialText}</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveTextContent(specialText);
    });

    it('handles rapid click events', () => {
      const handleClick = jest.fn();
      renderWithTheme(<Button onClick={handleClick}>Rapid Click</Button>);

      const button = screen.getByRole('button');

      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        fireEvent.click(button);
      }

      expect(handleClick).toHaveBeenCalledTimes(10);
    });
  });
});

// Example of using the comprehensive test suite
describe('Button Component - Comprehensive Test Suite', () => {
  createComponentTestSuite('Button', Button, {
    baseProps: { children: 'Test Button' },
    versions: ['1.0.0', '2.0.0'],
    maxRenderTime: 50, // ms
    maxBundleSize: 30, // KB
    keyboardKeys: ['Enter', ' ', 'Tab'],
    invalidPropsTests: [
      {
        description: 'handles invalid variant gracefully',
        props: { variant: 'invalid' as any },
        shouldError: false,
      },
    ],
  });
});
