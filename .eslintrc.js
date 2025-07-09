module.exports = {
    root: true,
    extends: [
        '@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn'
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    env: {
        browser: true,
        es2020: true,
        node: true
    }
};