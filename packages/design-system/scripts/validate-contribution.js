#!/usr/bin/env node

/**
 * Contribution Validation Script
 * 
 * Validates external contributions against design system standards
 * Usage: node scripts/validate-contribution.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI colors for output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function colorize(text, color) {
    return `${colors[color]}${text}${colors.reset}`;
}

function log(message, color = 'reset') {
    console.log(colorize(message, color));
}

function logSection(title) {
    console.log('\n' + colorize('='.repeat(60), 'cyan'));
    console.log(colorize(title, 'bright'));
    console.log(colorize('='.repeat(60), 'cyan'));
}

function logCheck(description, passed, details = '') {
    const icon = passed ? '✅' : '❌';
    const color = passed ? 'green' : 'red';
    log(`${icon} ${description}`, color);
    if (details) {
        log(`   ${details}`, 'reset');
    }
}

class ContributionValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.passed = 0;
        this.failed = 0;
    }

    addError(message) {
        this.errors.push(message);
        this.failed++;
    }

    addWarning(message) {
        this.warnings.push(message);
    }

    addPass() {
        this.passed++;
    }

    // Validate package.json structure
    validatePackageJson() {
        logSection('📦 PACKAGE.JSON VALIDATION');

        try {
            const packagePath = path.join(__dirname, '../package.json');
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

            // Check required fields
            const requiredFields = ['name', 'version', 'description', 'main', 'types'];
            requiredFields.forEach(field => {
                if (packageJson[field]) {
                    logCheck(`Has ${field}`, true);
                    this.addPass();
                } else {
                    logCheck(`Missing ${field}`, false);
                    this.addError(`Package.json missing required field: ${field}`);
                }
            });

            // Check scripts
            const requiredScripts = ['build', 'test', 'lint', 'typecheck'];
            requiredScripts.forEach(script => {
                if (packageJson.scripts && packageJson.scripts[script]) {
                    logCheck(`Has ${script} script`, true);
                    this.addPass();
                } else {
                    logCheck(`Missing ${script} script`, false);
                    this.addError(`Package.json missing required script: ${script}`);
                }
            });

        } catch (error) {
            logCheck('Package.json validation', false, error.message);
            this.addError('Failed to validate package.json');
        }
    }

    // Validate TypeScript configuration
    validateTypeScript() {
        logSection('🔷 TYPESCRIPT VALIDATION');

        try {
            execSync('pnpm typecheck', { stdio: 'pipe' });
            logCheck('TypeScript compilation', true);
            this.addPass();
        } catch (error) {
            logCheck('TypeScript compilation', false, 'Type errors found');
            this.addError('TypeScript compilation failed');
        }

        // Check for proper type exports
        try {
            const indexPath = path.join(__dirname, '../src/index.tsx');
            const indexContent = fs.readFileSync(indexPath, 'utf8');

            if (indexContent.includes('export type')) {
                logCheck('Exports TypeScript types', true);
                this.addPass();
            } else {
                logCheck('Exports TypeScript types', false);
                this.addWarning('Consider exporting TypeScript types');
            }
        } catch (error) {
            logCheck('Type export validation', false, error.message);
            this.addError('Failed to validate type exports');
        }
    }

    // Validate linting
    validateLinting() {
        logSection('🧹 LINTING VALIDATION');

        try {
            execSync('pnpm lint', { stdio: 'pipe' });
            logCheck('ESLint validation', true);
            this.addPass();
        } catch (error) {
            logCheck('ESLint validation', false, 'Linting errors found');
            this.addError('ESLint validation failed');
        }
    }

    // Validate testing
    validateTesting() {
        logSection('🧪 TESTING VALIDATION');

        try {
            const result = execSync('pnpm test --coverage --passWithNoTests', {
                stdio: 'pipe',
                encoding: 'utf8'
            });

            logCheck('Unit tests execution', true);
            this.addPass();

            // Check coverage
            if (result.includes('All files')) {
                const coverageMatch = result.match(/All files[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*(\d+\.?\d*)/);
                if (coverageMatch) {
                    const coverage = parseFloat(coverageMatch[1]);
                    if (coverage >= 80) {
                        logCheck(`Test coverage (${coverage}%)`, true);
                        this.addPass();
                    } else {
                        logCheck(`Test coverage (${coverage}%)`, false, 'Minimum 80% required');
                        this.addError(`Test coverage ${coverage}% is below minimum 80%`);
                    }
                }
            }
        } catch (error) {
            logCheck('Unit tests execution', false, 'Tests failed');
            this.addError('Unit tests failed');
        }
    }

    // Validate component structure
    validateComponentStructure() {
        logSection('🏗️ COMPONENT STRUCTURE VALIDATION');

        const componentsDir = path.join(__dirname, '../src/components');

        if (!fs.existsSync(componentsDir)) {
            logCheck('Components directory exists', false);
            this.addError('Components directory not found');
            return;
        }

        logCheck('Components directory exists', true);
        this.addPass();

        const components = fs.readdirSync(componentsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        components.forEach(componentName => {
            const componentDir = path.join(componentsDir, componentName);

            // Check for required files
            const requiredFiles = ['index.tsx'];
            const recommendedFiles = [`${componentName}.stories.tsx`, '__tests__'];

            requiredFiles.forEach(file => {
                const filePath = path.join(componentDir, file);
                if (fs.existsSync(filePath)) {
                    logCheck(`${componentName} has ${file}`, true);
                    this.addPass();
                } else {
                    logCheck(`${componentName} has ${file}`, false);
                    this.addError(`Component ${componentName} missing required file: ${file}`);
                }
            });

            recommendedFiles.forEach(file => {
                const filePath = path.join(componentDir, file);
                if (fs.existsSync(filePath)) {
                    logCheck(`${componentName} has ${file}`, true);
                    this.addPass();
                } else {
                    logCheck(`${componentName} has ${file}`, false);
                    this.addWarning(`Component ${componentName} missing recommended file: ${file}`);
                }
            });
        });
    }

    // Validate Storybook stories
    validateStorybook() {
        logSection('📚 STORYBOOK VALIDATION');

        try {
            execSync('pnpm build-storybook', { stdio: 'pipe' });
            logCheck('Storybook build', true);
            this.addPass();
        } catch (error) {
            logCheck('Storybook build', false, 'Build failed');
            this.addError('Storybook build failed');
        }

        // Check for story files
        const componentsDir = path.join(__dirname, '../src/components');
        if (fs.existsSync(componentsDir)) {
            const components = fs.readdirSync(componentsDir, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);

            let storiesFound = 0;
            components.forEach(componentName => {
                const storyFile = path.join(componentsDir, componentName, `${componentName}.stories.tsx`);
                if (fs.existsSync(storyFile)) {
                    storiesFound++;
                }
            });

            if (storiesFound > 0) {
                logCheck(`Found ${storiesFound} story files`, true);
                this.addPass();
            } else {
                logCheck('Story files found', false);
                this.addWarning('No story files found');
            }
        }
    }

    // Validate documentation
    validateDocumentation() {
        logSection('📖 DOCUMENTATION VALIDATION');

        // Check for README
        const readmePath = path.join(__dirname, '../README.md');
        if (fs.existsSync(readmePath)) {
            logCheck('README.md exists', true);
            this.addPass();
        } else {
            logCheck('README.md exists', false);
            this.addError('README.md not found');
        }

        // Check for CHANGELOG
        const changelogPath = path.join(__dirname, '../CHANGELOG.md');
        if (fs.existsSync(changelogPath)) {
            logCheck('CHANGELOG.md exists', true);
            this.addPass();
        } else {
            logCheck('CHANGELOG.md exists', false);
            this.addWarning('CHANGELOG.md not found');
        }

        // Check for component documentation
        const docsDir = path.join(__dirname, '../src/docs');
        if (fs.existsSync(docsDir)) {
            const docFiles = fs.readdirSync(docsDir).filter(file => file.endsWith('.mdx'));
            if (docFiles.length > 0) {
                logCheck(`Found ${docFiles.length} documentation files`, true);
                this.addPass();
            } else {
                logCheck('Component documentation found', false);
                this.addWarning('No MDX documentation files found');
            }
        } else {
            logCheck('Documentation directory exists', false);
            this.addWarning('Documentation directory not found');
        }
    }

    // Validate design specs
    validateDesignSpecs() {
        logSection('🎨 DESIGN SPECS VALIDATION');

        const designSpecsPath = path.join(__dirname, '../src/design-specs/index.ts');
        if (fs.existsSync(designSpecsPath)) {
            logCheck('Design specs file exists', true);
            this.addPass();

            try {
                const designSpecs = require(designSpecsPath);
                if (designSpecs.designSpecs && Object.keys(designSpecs.designSpecs).length > 0) {
                    logCheck('Design specs populated', true);
                    this.addPass();
                } else {
                    logCheck('Design specs populated', false);
                    this.addWarning('Design specs file exists but is empty');
                }
            } catch (error) {
                logCheck('Design specs validation', false, error.message);
                this.addError('Failed to validate design specs');
            }
        } else {
            logCheck('Design specs file exists', false);
            this.addError('Design specs file not found');
        }
    }

    // Validate build output
    validateBuild() {
        logSection('🏗️ BUILD VALIDATION');

        try {
            execSync('pnpm build', { stdio: 'pipe' });
            logCheck('Build execution', true);
            this.addPass();

            // Check for build outputs
            const distDir = path.join(__dirname, '../dist');
            if (fs.existsSync(distDir)) {
                logCheck('Build output directory exists', true);
                this.addPass();

                const buildFiles = fs.readdirSync(distDir);
                const hasJS = buildFiles.some(file => file.endsWith('.js'));
                const hasTypes = buildFiles.some(file => file.endsWith('.d.ts'));

                if (hasJS) {
                    logCheck('JavaScript build output', true);
                    this.addPass();
                } else {
                    logCheck('JavaScript build output', false);
                    this.addError('No JavaScript build output found');
                }

                if (hasTypes) {
                    logCheck('TypeScript declarations', true);
                    this.addPass();
                } else {
                    logCheck('TypeScript declarations', false);
                    this.addError('No TypeScript declaration files found');
                }
            } else {
                logCheck('Build output directory exists', false);
                this.addError('Build output directory not found');
            }
        } catch (error) {
            logCheck('Build execution', false, 'Build failed');
            this.addError('Build execution failed');
        }
    }

    // Generate final report
    generateReport() {
        logSection('📊 VALIDATION REPORT');

        const total = this.passed + this.failed;
        const successRate = total > 0 ? Math.round((this.passed / total) * 100) : 0;

        log(`Total Checks: ${total}`, 'blue');
        log(`Passed: ${this.passed}`, 'green');
        log(`Failed: ${this.failed}`, 'red');
        log(`Success Rate: ${successRate}%`, successRate >= 80 ? 'green' : 'red');

        if (this.warnings.length > 0) {
            log(`\nWarnings: ${this.warnings.length}`, 'yellow');
            this.warnings.forEach(warning => {
                log(`  ⚠️  ${warning}`, 'yellow');
            });
        }

        if (this.errors.length > 0) {
            log(`\nErrors: ${this.errors.length}`, 'red');
            this.errors.forEach(error => {
                log(`  ❌ ${error}`, 'red');
            });
        }

        log('\n' + colorize('='.repeat(60), 'cyan'));

        if (this.failed === 0) {
            log('🎉 All validations passed! Contribution is ready for review.', 'green');
            return true;
        } else {
            log('❌ Validation failed. Please fix the errors above before submitting.', 'red');
            return false;
        }
    }

    // Run all validations
    async runAll() {
        log(colorize('🔍 Design System Contribution Validator', 'bright'));
        log('Validating contribution against design system standards...\n');

        this.validatePackageJson();
        this.validateTypeScript();
        this.validateLinting();
        this.validateTesting();
        this.validateComponentStructure();
        this.validateStorybook();
        this.validateDocumentation();
        this.validateDesignSpecs();
        this.validateBuild();

        return this.generateReport();
    }
}

// Run validation if called directly
if (require.main === module) {
    const validator = new ContributionValidator();
    validator.runAll().then(success => {
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('Validation failed:', error);
        process.exit(1);
    });
}

module.exports = ContributionValidator;