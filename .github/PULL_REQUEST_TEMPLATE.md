# Pull Request

<!--
🚨 EXTERNAL CONTRIBUTORS: Please read the External Contribution Guide before submitting:
https://github.com/schimufa/design-system/blob/main/EXTERNAL_CONTRIBUTION_GUIDE.md
-->

## 📋 Changes Summary

<!-- Provide a clear and concise description of your changes -->

### What was changed?

<!-- Describe the specific changes made -->

### Why was this change needed?

<!-- Explain the motivation or problem this solves -->

### How was it implemented?

<!-- Brief technical overview of the implementation -->

## 🎨 Design Reference

<!-- ⚠️ REQUIRED: All changes must have approved design documentation -->

- **Design URL**: <!-- Link to Figma/design file -->
- **Design Version**: <!-- Figma version or hash -->
- **Design Ticket**: <!-- Format: [DESIGN-123] -->
- **Component(s) Affected**: <!-- List all affected components -->
- **Design Reviewer**: <!-- @mention design team member who approved -->

## 🔄 Type of Change

<!-- Select the type of change (check all that apply) -->

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update (changes to documentation only)
- [ ] 🎨 Style/UI update (changes that don't affect functionality)
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test updates

## 📊 Impact Assessment

### Version Impact

- [ ] **Patch** (bug fixes, small improvements)
- [ ] **Minor** (new features, backward compatible)
- [ ] **Major** (breaking changes)

### Theme Impact

- [ ] No theme changes
- [ ] Theme token updates (non-breaking)
- [ ] New theme variants added
- [ ] Breaking theme changes

### Bundle Size Impact

- [ ] No significant size change (< 5KB)
- [ ] Small increase (5-20KB)
- [ ] Large increase (> 20KB) - **Requires justification**

## 🧪 Testing Checklist

### Automated Tests

- [ ] **TypeScript compilation** passes (`pnpm typecheck`)
- [ ] **Linting** passes (`pnpm lint`)
- [ ] **Unit tests** pass (`pnpm test`)
- [ ] **Visual regression tests** pass (`pnpm test:visual`)
- [ ] **Build** succeeds (`pnpm build`)
- [ ] **Storybook** builds (`pnpm build-storybook`)

### Manual Testing

- [ ] **Cross-browser testing** (Chrome, Firefox, Safari, Edge)
- [ ] **Responsive design** testing (mobile, tablet, desktop)
- [ ] **Keyboard navigation** testing
- [ ] **Screen reader** testing (if applicable)
- [ ] **Theme switching** testing (all available themes)

### Quality Gates

- [ ] **Test coverage** ≥ 80%
- [ ] **Accessibility** audit passes (axe-core)
- [ ] **Performance** impact assessed
- [ ] **Design specs** validation passes

## 📚 Documentation Updates

<!-- Confirm all relevant documentation has been updated -->

- [ ] **Component documentation** (MDX files)
- [ ] **Storybook stories** added/updated
- [ ] **API documentation** (JSDoc comments)
- [ ] **Migration guide** (for breaking changes)
- [ ] **CHANGELOG.md** entry added
- [ ] **Design specs** mapping updated
- [ ] **README** updates (if needed)

## 🔧 Code Quality

### Standards Compliance

- [ ] Follows **TypeScript** best practices
- [ ] Uses **design tokens** (no hard-coded values)
- [ ] Implements **proper error handling**
- [ ] Includes **proper prop validation**
- [ ] Follows **component naming conventions**
- [ ] Uses **semantic HTML** elements

### Performance Considerations

- [ ] **Lazy loading** implemented where appropriate
- [ ] **Memoization** used for expensive calculations
- [ ] **Bundle splitting** considered
- [ ] **Tree shaking** friendly exports

## 🚨 Breaking Changes

<!-- ⚠️ REQUIRED for breaking changes -->

### What breaks?

<!-- List all breaking changes -->

### Migration Steps

<!-- Provide step-by-step migration instructions -->

```typescript
// Before (old API)

// After (new API)
```

### Affected Components

<!-- List all components that need updates -->

### Estimated Migration Effort

- [ ] **Low** (< 1 hour)
- [ ] **Medium** (1-4 hours)
- [ ] **High** (> 4 hours)

## 📸 Visual Evidence

### Screenshots

<!-- Add before/after screenshots for UI changes -->

| Before              | After               |
| ------------------- | ------------------- |
| <!-- Screenshot --> | <!-- Screenshot --> |

### Storybook Links

<!-- Provide links to relevant Storybook stories -->

- **Component Story**: <!-- Link to main story -->
- **Version Comparison**: <!-- Link to version comparison story -->
- **Theme Examples**: <!-- Link to theme examples -->

## 🔍 Review Checklist

### For Reviewers

- [ ] **Design alignment** verified against Figma
- [ ] **Code quality** meets standards
- [ ] **Test coverage** is adequate
- [ ] **Documentation** is complete and accurate
- [ ] **Breaking changes** are justified and documented
- [ ] **Performance impact** is acceptable
- [ ] **Accessibility** requirements are met

### For External Contributors

- [ ] Read the **External Contribution Guide**
- [ ] Followed **branch naming convention**
- [ ] Used proper **commit message format**
- [ ] Ran **contribution validation script** (`pnpm validate-contribution`)
- [ ] Addressed all **automated check failures**

## 🏷️ Labels

<!-- Add appropriate labels (maintainers will apply these) -->

**Component**: <!-- e.g., button, card, theme -->
**Priority**: <!-- low, medium, high, critical -->
**Status**: <!-- ready-for-review, needs-work, approved -->

## 🔗 Related Issues

<!-- Link to related issues, discussions, or PRs -->

- Closes #<!-- issue number -->
- Related to #<!-- issue number -->
- Depends on #<!-- PR number -->

## 📝 Additional Notes

### For Reviewers

<!-- Any specific areas you'd like reviewers to focus on -->

### Known Limitations

<!-- Any known issues or limitations with this implementation -->

### Future Improvements

<!-- Any planned follow-up work or improvements -->

---

## 📋 Pre-Submission Checklist

<!-- Complete this checklist before submitting your PR -->

- [ ] I have read the **External Contribution Guide**
- [ ] I have run `pnpm validate-contribution` and addressed all issues
- [ ] I have tested my changes across all supported browsers
- [ ] I have updated all relevant documentation
- [ ] I have added/updated tests for my changes
- [ ] I have verified accessibility compliance
- [ ] I have obtained design approval (if applicable)
- [ ] I understand this PR will be reviewed by the design system team

**By submitting this PR, I confirm that my contribution follows the design system standards and guidelines.**
