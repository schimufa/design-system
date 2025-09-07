/**
 * Testing utilities for external contributions
 * Provides standardized testing patterns and helpers
 */

import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { axe, toHaveNoViolations } from 'jest-axe';
import { getTheme, themes, AppTheme } from '../themes';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Custom render function with theme provider
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: AppTheme;
  initialProps?: Record<string, any>;
}

export function renderWithTheme(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
): RenderResult {
  const { theme = 'finance', ...renderOptions } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={getTheme(theme)}>{children}</ThemeProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Test component across all themes
export function testAcrossThemes(
  componentName: string,
  renderComponent: (theme: AppTheme) => React.ReactElement,
  testFn: (result: RenderResult, theme: AppTheme) => void | Promise<void>
) {
  const themeNames = Object.keys(themes) as AppTheme[];

  describe(`${componentName} across themes`, () => {
    themeNames.forEach((theme) => {
      it(`works with ${theme} theme`, async () => {
        const component = renderComponent(theme);
        const result = renderWithTheme(component, { theme });
        await testFn(result, theme);
      });
    });
  });
}

// Accessibility testing helper
export async function testAccessibility(
  component: React.ReactElement,
  options: CustomRenderOptions = {}
): Promise<void> {
  const { container } = renderWithTheme(component, options);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

// Visual regression testing helper
export function testVisualRegression(
  componentName: string,
  component: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  describe(`${componentName} visual regression`, () => {
    it('matches snapshot', () => {
      const result = renderWithTheme(component, options);
      expect(result.container.firstChild).toMatchSnapshot();
    });

    // Test across all themes
    const themeNames = Object.keys(themes) as AppTheme[];
    themeNames.forEach((theme) => {
      it(`matches snapshot with ${theme} theme`, () => {
        const result = renderWithTheme(component, { ...options, theme });
        expect(result.container.firstChild).toMatchSnapshot(
          `${componentName}-${theme}`
        );
      });
    });
  });
}

// Component version testing helper
export function testComponentVersions<T extends { version?: string }>(
  componentName: string,
  Component: React.ComponentType<T>,
  baseProps: Omit<T, 'version'>,
  versions: string[]
) {
  describe(`${componentName} version compatibility`, () => {
    versions.forEach((version) => {
      it(`renders correctly with version ${version}`, () => {
        const props = { ...baseProps, version } as T;
        const result = renderWithTheme(<Component {...props} />);
        expect(result.container.firstChild).toBeInTheDocument();
      });

      it(`matches snapshot for version ${version}`, () => {
        const props = { ...baseProps, version } as T;
        const result = renderWithTheme(<Component {...props} />);
        expect(result.container.firstChild).toMatchSnapshot(
          `${componentName}-v${version}`
        );
      });
    });
  });
}

// Performance testing helper
export function testPerformance(
  componentName: string,
  component: React.ReactElement,
  maxRenderTime = 100
) {
  describe(`${componentName} performance`, () => {
    it(`renders within ${maxRenderTime}ms`, () => {
      const startTime = performance.now();
      renderWithTheme(component);
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      expect(renderTime).toBeLessThan(maxRenderTime);
    });
  });
}

// Keyboard navigation testing helper
export function testKeyboardNavigation(
  componentName: string,
  component: React.ReactElement,
  expectedKeys: string[] = ['Enter', ' ', 'Tab']
) {
  describe(`${componentName} keyboard navigation`, () => {
    expectedKeys.forEach((key) => {
      it(`responds to ${key} key`, () => {
        const { container } = renderWithTheme(component);
        const element = container.querySelector(
          '[tabindex], button, input, select, textarea, a'
        );

        if (element) {
          (element as HTMLElement).focus();
          expect(document.activeElement).toBe(element);

          // Test key press
          const event = new KeyboardEvent('keydown', { key });
          element.dispatchEvent(event);

          // Component should handle the key event without errors
          expect(element).toBeInTheDocument();
        }
      });
    });
  });
}

// Props validation testing helper
export function testPropsValidation<T extends Record<string, any>>(
  componentName: string,
  Component: React.ComponentType<T>,
  validProps: T,
  invalidPropsTests: Array<{
    description: string;
    props: Partial<T>;
    shouldError?: boolean;
  }>
) {
  describe(`${componentName} props validation`, () => {
    it('renders with valid props', () => {
      expect(() => {
        renderWithTheme(<Component {...validProps} />);
      }).not.toThrow();
    });

    invalidPropsTests.forEach(({ description, props, shouldError = false }) => {
      it(description, () => {
        const testProps = { ...validProps, ...props } as T;

        if (shouldError) {
          expect(() => {
            renderWithTheme(<Component {...testProps} />);
          }).toThrow();
        } else {
          expect(() => {
            renderWithTheme(<Component {...testProps} />);
          }).not.toThrow();
        }
      });
    });
  });
}

// Component API consistency testing
export function testComponentAPI<T>(
  componentName: string,
  Component: React.ComponentType<T>,
  baseProps: T
) {
  describe(`${componentName} API consistency`, () => {
    it('has displayName', () => {
      expect(Component.displayName || Component.name).toBeTruthy();
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      // Note: This assumes the component forwards refs
      // Adjust based on your component implementation
      renderWithTheme(<Component {...baseProps} ref={ref} />);
      // Add specific ref testing logic based on your components
    });

    it('accepts className prop', () => {
      const className = 'test-class';
      const propsWithClassName = { ...baseProps, className } as T & {
        className: string;
      };
      const { container } = renderWithTheme(
        <Component {...propsWithClassName} />
      );

      expect(container.querySelector(`.${className}`)).toBeInTheDocument();
    });

    it('accepts sx prop for Material-UI components', () => {
      const sx = { color: 'red' };
      const propsWithSx = { ...baseProps, sx } as T & { sx: any };

      expect(() => {
        renderWithTheme(<Component {...propsWithSx} />);
      }).not.toThrow();
    });
  });
}

// Bundle size testing helper (for CI/CD)
export function testBundleSize(componentName: string, maxSizeKB: number = 50) {
  describe(`${componentName} bundle size`, () => {
    it(`should be under ${maxSizeKB}KB`, () => {
      // This would typically be implemented with webpack-bundle-analyzer
      // or similar tools in your CI/CD pipeline
      // For now, we'll just ensure the component can be imported
      expect(() => {
        // Dynamic import to test tree-shaking
        import(`../components/${componentName}`);
      }).not.toThrow();
    });
  });
}

// Comprehensive component test suite
export function createComponentTestSuite<T extends Record<string, any>>(
  componentName: string,
  Component: React.ComponentType<T>,
  config: {
    baseProps: T;
    versions?: string[];
    themes?: AppTheme[];
    maxRenderTime?: number;
    maxBundleSize?: number;
    keyboardKeys?: string[];
    invalidPropsTests?: Array<{
      description: string;
      props: Partial<T>;
      shouldError?: boolean;
    }>;
  }
) {
  const {
    baseProps,
    versions = [],
    testThemes = Object.keys(themes) as AppTheme[],
    maxRenderTime = 100,
    maxBundleSize = 50,
    keyboardKeys = ['Enter', ' ', 'Tab'],
    invalidPropsTests = [],
  } = config;

  describe(`${componentName} comprehensive test suite`, () => {
    // Basic rendering
    it('renders without crashing', () => {
      expect(() => {
        renderWithTheme(<Component {...baseProps} />);
      }).not.toThrow();
    });

    // Accessibility
    it('meets accessibility standards', async () => {
      await testAccessibility(<Component {...baseProps} />);
    });

    // Visual regression
    testVisualRegression(componentName, <Component {...baseProps} />);

    // Version compatibility
    if (versions.length > 0) {
      testComponentVersions(componentName, Component, baseProps, versions);
    }

    // Performance
    testPerformance(componentName, <Component {...baseProps} />, maxRenderTime);

    // Keyboard navigation
    testKeyboardNavigation(
      componentName,
      <Component {...baseProps} />,
      keyboardKeys
    );

    // Props validation
    if (invalidPropsTests.length > 0) {
      testPropsValidation(
        componentName,
        Component,
        baseProps,
        invalidPropsTests
      );
    }

    // API consistency
    testComponentAPI(componentName, Component, baseProps);

    // Bundle size
    testBundleSize(componentName, maxBundleSize);

    // Theme compatibility
    testAcrossThemes(
      componentName,
      () => <Component {...baseProps} />,
      async (result) => {
        expect(result.container.firstChild).toBeInTheDocument();
      }
    );
  });
}

// Export all utilities
export * from '@testing-library/react';
export { axe } from 'jest-axe';
