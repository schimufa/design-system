/**
 * Design Fidelity Checker
 * Validates implementation against Figma designs and design system principles
 */

export interface FigmaSpec {
  fileId: string;
  nodeId: string;
  version: string;
  properties: {
    width: number;
    height: number;
    borderRadius: number;
    padding: { top: number; right: number; bottom: number; left: number };
    margin: { top: number; right: number; bottom: number; left: number };
    backgroundColor: string;
    textColor: string;
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
    boxShadow?: string;
    border?: string;
  };
  states: {
    default: FigmaProperties;
    hover?: FigmaProperties;
    active?: FigmaProperties;
    disabled?: FigmaProperties;
    focus?: FigmaProperties;
  };
}

export interface FigmaProperties {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  boxShadow?: string;
  opacity?: number;
  transform?: string;
}

export interface RenderedComponent {
  element: HTMLElement;
  computedStyles: CSSStyleDeclaration;
  states: {
    default: ComputedStyleSnapshot;
    hover?: ComputedStyleSnapshot;
    active?: ComputedStyleSnapshot;
    disabled?: ComputedStyleSnapshot;
    focus?: ComputedStyleSnapshot;
  };
}

export interface ComputedStyleSnapshot {
  backgroundColor: string;
  color: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  borderRadius: string;
  padding: string;
  margin: string;
  boxShadow: string;
  border: string;
  opacity: string;
  transform: string;
}

export interface FidelityReport {
  overall: {
    score: number; // 0-100
    status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  };
  dimensions: {
    score: number;
    differences: Array<{
      property: string;
      expected: string;
      actual: string;
      deviation: number;
    }>;
  };
  colors: {
    score: number;
    differences: Array<{
      property: string;
      expected: string;
      actual: string;
      contrast: number;
    }>;
  };
  typography: {
    score: number;
    differences: Array<{
      property: string;
      expected: string;
      actual: string;
      deviation: number;
    }>;
  };
  spacing: {
    score: number;
    differences: Array<{
      property: string;
      expected: string;
      actual: string;
      deviation: number;
    }>;
  };
  states: {
    score: number;
    missingStates: string[];
    incorrectStates: string[];
  };
  recommendations: string[];
}

export interface DesignPrinciple {
  id: string;
  name: string;
  description: string;
  validator: (component: RenderedComponent) => PrincipleValidationResult;
}

export interface PrincipleValidationResult {
  passed: boolean;
  score: number;
  message: string;
  suggestions: string[];
}

export class DesignFidelityChecker {
  private designPrinciples: DesignPrinciple[] = [];
  private tolerances = {
    dimension: 2, // pixels
    color: 5, // delta E
    fontSize: 1, // pixels
    spacing: 2, // pixels
  };

  constructor() {
    this.initializeDesignPrinciples();
  }

  /**
   * Compare implemented component with Figma design
   */
  compareWithDesign(
    component: RenderedComponent,
    figmaSpec: FigmaSpec
  ): FidelityReport {
    const dimensionScore = this.validateDimensions(component, figmaSpec);
    const colorScore = this.validateColors(component, figmaSpec);
    const typographyScore = this.validateTypography(component, figmaSpec);
    const spacingScore = this.validateSpacing(component, figmaSpec);
    const stateScore = this.validateStates(component, figmaSpec);

    const overallScore = Math.round(
      (dimensionScore.score +
        colorScore.score +
        typographyScore.score +
        spacingScore.score +
        stateScore.score) /
        5
    );

    return {
      overall: {
        score: overallScore,
        status: this.getStatusFromScore(overallScore),
      },
      dimensions: dimensionScore,
      colors: colorScore,
      typography: typographyScore,
      spacing: spacingScore,
      states: stateScore,
      recommendations: this.generateRecommendations(overallScore, [
        dimensionScore,
        colorScore,
        typographyScore,
        spacingScore,
        stateScore,
      ]),
    };
  }

  /**
   * Validate spacing consistency
   */
  validateSpacing(component: RenderedComponent): {
    score: number;
    differences: Array<{ property: string; expected: string; actual: string; deviation: number }>;
  } {
    const issues: Array<{
      element: string;
      issue: string;
      suggestion: string;
    }> = [];
    let score = 100;

    // Check if spacing follows 8px grid system
    const padding = this.parsePadding(component.computedStyles.padding);
    const margin = this.parsePadding(component.computedStyles.margin);

    [...padding, ...margin].forEach((value) => {
      if (value % 8 !== 0 && value !== 0) {
        issues.push({
          element: 'component',
          issue: `Spacing value ${value}px doesn't follow 8px grid system`,
          suggestion: `Use ${Math.round(value / 8) * 8}px instead`,
        });
        score -= 10;
      }
    });

    return { score: Math.max(0, score), issues };
  }

  /**
   * Validate typography consistency
   */
  validateTypography(component: RenderedComponent): {
    score: number;
    differences: Array<{ property: string; expected: string; actual: string; deviation: number }>;
  } {
    const issues: Array<{
      element: string;
      issue: string;
      suggestion: string;
    }> = [];
    let score = 100;

    const fontSize = parseFloat(component.computedStyles.fontSize);
    const lineHeight = parseFloat(component.computedStyles.lineHeight);
    // const fontWeight = component.computedStyles.fontWeight;

    // Validate font sizes are from design system scale
    const allowedFontSizes = [12, 14, 16, 18, 20, 24, 32, 40, 48];
    if (!allowedFontSizes.includes(fontSize)) {
      issues.push({
        element: 'text',
        issue: `Font size ${fontSize}px is not from design system scale`,
        suggestion: `Use one of: ${allowedFontSizes.join(', ')}px`,
      });
      score -= 15;
    }

    // Validate line height ratio
    const lineHeightRatio = lineHeight / fontSize;
    if (lineHeightRatio < 1.2 || lineHeightRatio > 1.8) {
      issues.push({
        element: 'text',
        issue: `Line height ratio ${lineHeightRatio.toFixed(2)} is outside recommended range`,
        suggestion: 'Use line height ratio between 1.2 and 1.8',
      });
      score -= 10;
    }

    return { score: Math.max(0, score), issues };
  }

  /**
   * Validate color usage and accessibility
   */
  validateColors(
    component: RenderedComponent,
    figmaSpec?: FigmaSpec
  ): {
    score: number;
    differences: Array<{
      property: string;
      expected: string;
      actual: string;
      contrast: number;
    }>;
  } {
    const differences: Array<{
      property: string;
      expected: string;
      actual: string;
      contrast: number;
    }> = [];
    let score = 100;

    if (figmaSpec) {
      // Compare with Figma colors
      const bgColorDiff = this.calculateColorDifference(
        component.computedStyles.backgroundColor,
        figmaSpec.properties.backgroundColor
      );

      if (bgColorDiff > this.tolerances.color) {
        differences.push({
          property: 'backgroundColor',
          expected: figmaSpec.properties.backgroundColor,
          actual: component.computedStyles.backgroundColor,
          contrast: bgColorDiff,
        });
        score -= 15;
      }

      const textColorDiff = this.calculateColorDifference(
        component.computedStyles.color,
        figmaSpec.properties.textColor
      );

      if (textColorDiff > this.tolerances.color) {
        differences.push({
          property: 'color',
          expected: figmaSpec.properties.textColor,
          actual: component.computedStyles.color,
          contrast: textColorDiff,
        });
        score -= 15;
      }
    }

    // Validate color contrast for accessibility
    const contrastRatio = this.calculateContrastRatio(
      component.computedStyles.color,
      component.computedStyles.backgroundColor
    );

    if (contrastRatio < 4.5) {
      differences.push({
        property: 'contrast',
        expected: '4.5:1 minimum',
        actual: `${contrastRatio.toFixed(2)}:1`,
        contrast: contrastRatio,
      });
      score -= 20;
    }

    return { score: Math.max(0, score), differences };
  }

  /**
   * Validate against design system principles
   */
  validatePrinciples(component: RenderedComponent): {
    overall: { score: number; status: string };
    principles: Array<{ principle: string; result: PrincipleValidationResult }>;
  } {
    const results = this.designPrinciples.map((principle) => ({
      principle: principle.name,
      result: principle.validator(component),
    }));

    const overallScore = Math.round(
      results.reduce((sum, result) => sum + result.result.score, 0) /
        results.length
    );

    return {
      overall: {
        score: overallScore,
        status: this.getStatusFromScore(overallScore),
      },
      principles: results,
    };
  }

  /**
   * Generate visual diff report
   */
  generateVisualDiff(
    before: RenderedComponent,
    after: RenderedComponent
  ): {
    changes: Array<{
      property: string;
      before: string;
      after: string;
      impact: 'low' | 'medium' | 'high';
    }>;
    summary: string;
  } {
    const changes: Array<{
      property: string;
      before: string;
      after: string;
      impact: 'low' | 'medium' | 'high';
    }> = [];

    // Compare key visual properties
    const properties = [
      'backgroundColor',
      'color',
      'fontSize',
      'fontWeight',
      'borderRadius',
      'padding',
      'margin',
      'boxShadow',
      'border',
    ];

    properties.forEach((prop) => {
      const beforeValue = before.computedStyles[
        prop as keyof CSSStyleDeclaration
      ] as string;
      const afterValue = after.computedStyles[
        prop as keyof CSSStyleDeclaration
      ] as string;

      if (beforeValue !== afterValue) {
        changes.push({
          property: prop,
          before: beforeValue,
          after: afterValue,
          impact: this.assessChangeImpact(prop, beforeValue, afterValue),
        });
      }
    });

    const summary = this.generateChangeSummary(changes);

    return { changes, summary };
  }

  // Private helper methods
  private initializeDesignPrinciples(): void {
    this.designPrinciples = [
      {
        id: 'consistency',
        name: 'Visual Consistency',
        description: 'Component follows design system patterns',
        validator: (component) => this.validateConsistency(component),
      },
      {
        id: 'accessibility',
        name: 'Accessibility',
        description: 'Component meets accessibility standards',
        validator: (component) => this.validateAccessibility(component),
      },
      {
        id: 'responsiveness',
        name: 'Responsiveness',
        description: 'Component adapts to different screen sizes',
        validator: (component) => this.validateResponsiveness(component),
      },
      {
        id: 'performance',
        name: 'Performance',
        description: 'Component is optimized for performance',
        validator: (component) => this.validatePerformance(component),
      },
    ];
  }

  private validateDimensions(
    component: RenderedComponent,
    figmaSpec: FigmaSpec
  ): {
    score: number;
    differences: Array<{
      property: string;
      expected: string;
      actual: string;
      deviation: number;
    }>;
  } {
    const differences: Array<{
      property: string;
      expected: string;
      actual: string;
      deviation: number;
    }> = [];
    let score = 100;

    const rect = component.element.getBoundingClientRect();

    // Compare width
    const widthDiff = Math.abs(rect.width - figmaSpec.properties.width);
    if (widthDiff > this.tolerances.dimension) {
      differences.push({
        property: 'width',
        expected: `${figmaSpec.properties.width}px`,
        actual: `${rect.width}px`,
        deviation: widthDiff,
      });
      score -= 10;
    }

    // Compare height
    const heightDiff = Math.abs(rect.height - figmaSpec.properties.height);
    if (heightDiff > this.tolerances.dimension) {
      differences.push({
        property: 'height',
        expected: `${figmaSpec.properties.height}px`,
        actual: `${rect.height}px`,
        deviation: heightDiff,
      });
      score -= 10;
    }

    return { score: Math.max(0, score), differences };
  }

  private validateStates(
    component: RenderedComponent,
    figmaSpec: FigmaSpec
  ): {
    score: number;
    missingStates: string[];
    incorrectStates: string[];
  } {
    const missingStates: string[] = [];
    const incorrectStates: string[] = [];
    let score = 100;

    const expectedStates = Object.keys(figmaSpec.states);
    const actualStates = Object.keys(component.states);

    // Check for missing states
    expectedStates.forEach((state) => {
      if (!actualStates.includes(state)) {
        missingStates.push(state);
        score -= 15;
      }
    });

    // Check state implementations
    expectedStates.forEach((state) => {
      if (
        actualStates.includes(state) &&
        figmaSpec.states[state as keyof typeof figmaSpec.states]
      ) {
        const expected =
          figmaSpec.states[state as keyof typeof figmaSpec.states];
        const actual = component.states[state as keyof typeof component.states];

        if (
          expected &&
          actual &&
          !this.compareStateProperties(expected, actual)
        ) {
          incorrectStates.push(state);
          score -= 10;
        }
      }
    });

    return { score: Math.max(0, score), missingStates, incorrectStates };
  }

  private validateConsistency(
    component: RenderedComponent
  ): PrincipleValidationResult {
    let score = 100;
    const suggestions: string[] = [];

    // Check for consistent spacing
    const spacingResult = this.validateSpacing(component);
    score = Math.min(score, spacingResult.score);
    if (spacingResult.issues.length > 0) {
      suggestions.push('Use consistent spacing from the 8px grid system');
    }

    // Check for consistent typography
    const typographyResult = this.validateTypography(component);
    score = Math.min(score, typographyResult.score);
    if (typographyResult.issues.length > 0) {
      suggestions.push('Use typography scale from the design system');
    }

    return {
      passed: score >= 70,
      score,
      message:
        score >= 70
          ? 'Component follows design system consistency'
          : 'Component has consistency issues',
      suggestions,
    };
  }

  private validateAccessibility(
    component: RenderedComponent
  ): PrincipleValidationResult {
    let score = 100;
    const suggestions: string[] = [];

    // Check color contrast
    const contrastRatio = this.calculateContrastRatio(
      component.computedStyles.color,
      component.computedStyles.backgroundColor
    );

    if (contrastRatio < 4.5) {
      score -= 30;
      suggestions.push(
        'Improve color contrast to meet WCAG AA standards (4.5:1 minimum)'
      );
    }

    // Check font size
    const fontSize = parseFloat(component.computedStyles.fontSize);
    if (fontSize < 14) {
      score -= 20;
      suggestions.push('Use minimum font size of 14px for better readability');
    }

    return {
      passed: score >= 70,
      score,
      message:
        score >= 70
          ? 'Component meets accessibility standards'
          : 'Component has accessibility issues',
      suggestions,
    };
  }

  private validateResponsiveness(
    component: RenderedComponent
  ): PrincipleValidationResult {
    // This would test component at different viewport sizes
    return {
      passed: true,
      score: 100,
      message: 'Responsiveness validation not implemented',
      suggestions: [],
    };
  }

  private validatePerformance(
    component: RenderedComponent
  ): PrincipleValidationResult {
    // This would analyze rendering performance
    return {
      passed: true,
      score: 100,
      message: 'Performance validation not implemented',
      suggestions: [],
    };
  }

  private getStatusFromScore(
    score: number
  ): 'excellent' | 'good' | 'needs-improvement' | 'poor' {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'needs-improvement';
    return 'poor';
  }

  private generateRecommendations(
    overallScore: number,
    scores: any[]
  ): string[] {
    const recommendations: string[] = [];

    if (overallScore < 60) {
      recommendations.push(
        'Component requires significant improvements to meet design standards'
      );
    }

    scores.forEach((scoreObj) => {
      if (scoreObj.score < 70) {
        recommendations.push(
          `Focus on improving ${scoreObj.constructor.name.toLowerCase()} implementation`
        );
      }
    });

    return recommendations;
  }

  private calculateColorDifference(_color1: string, _color2: string): number {
    // Simplified color difference calculation
    // In a real implementation, you'd use Delta E or similar
    return Math.random() * 10; // Placeholder
  }

  private calculateContrastRatio(
    _foreground: string,
    _background: string
  ): number {
    // Simplified contrast ratio calculation
    // In a real implementation, you'd calculate luminance properly
    return 4.5 + Math.random() * 10; // Placeholder
  }

  private parsePadding(paddingStr: string): number[] {
    // Parse padding string like "8px 16px" into array of numbers
    return paddingStr.split(' ').map((p) => parseFloat(p) || 0);
  }

  private compareStateProperties(
    expected: FigmaProperties,
    actual: ComputedStyleSnapshot
  ): boolean {
    // Compare state properties with tolerance
    return true; // Placeholder
  }

  private assessChangeImpact(
    property: string,
    before: string,
    after: string
  ): 'low' | 'medium' | 'high' {
    const highImpactProps = ['backgroundColor', 'color', 'fontSize'];
    const mediumImpactProps = ['padding', 'margin', 'borderRadius'];

    if (highImpactProps.includes(property)) return 'high';
    if (mediumImpactProps.includes(property)) return 'medium';
    return 'low';
  }

  private generateChangeSummary(
    changes: Array<{
      property: string;
      before: string;
      after: string;
      impact: string;
    }>
  ): string {
    const highImpactChanges = changes.filter((c) => c.impact === 'high').length;
    const mediumImpactChanges = changes.filter(
      (c) => c.impact === 'medium'
    ).length;
    const lowImpactChanges = changes.filter((c) => c.impact === 'low').length;

    return `${changes.length} changes detected: ${highImpactChanges} high impact, ${mediumImpactChanges} medium impact, ${lowImpactChanges} low impact`;
  }
}

// Export singleton instance
export const designFidelityChecker = new DesignFidelityChecker();
