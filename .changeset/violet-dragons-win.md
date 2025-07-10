---
"@ab-inbev/demo": major
"@schimufa/design-system": major
---

Major update with theme system improvements and documentation enhancements

BREAKING CHANGES:
- Theme system now uses Material-UI's createTheme function
- Custom theme tokens replaced with MUI theme structure
- Dark mode support added through palette.mode

NEW FEATURES:
- Theme validation system with accessibility checks
- Comprehensive documentation and migration guides
- Enhanced Storybook examples with theme demonstrations
- Automated CI/CD pipeline with documentation deployment

MIGRATION STEPS:
1. Update theme imports to use MUI's createTheme
2. Replace custom color tokens with MUI palette system
3. Update component theme overrides
4. Run theme validation to ensure compliance

For detailed migration instructions, see the MIGRATION.md guide.
