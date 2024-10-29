import globals from 'globals'
import jsEslint from '@eslint/js'
import tsEslint from 'typescript-eslint'

const ignores = ['dist/*', 'build/*', 'node_modules/*', 'coverage/*', '.yarn/*']
const tsFiles = ['{src,test}/**/*.ts']

const commonJsRules = {
    'no-duplicate-imports': 'error',
    'no-unneeded-ternary': 'error',
    'prefer-object-spread': 'error',
    'no-unused-vars': ['error', { ignoreRestSiblings: true, args: 'none' }],
}

const languageOptions = {
    globals: {
        ...globals.node,
        ...globals.jest,
    },
    ecmaVersion: 2023,
    sourceType: 'module',
}

const cjsConfig = {
    files: ['{src,test}/**/*.{js,cjs}'],
    ignores,
    languageOptions: {
        ...languageOptions,
        sourceType: 'commonjs',
    },
    rules: commonJsRules,
}

const esmConfig = {
    files: ['{src,test}/**/*.mjs'],
    ignores,
    languageOptions,
    rules: commonJsRules,
}

const typescriptConfig = {
    files: tsFiles,
    ignores,
    rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        'require-await': 'off',
        'no-duplicate-imports': 'error',
        'no-unneeded-ternary': 'error',
        'prefer-object-spread': 'error',
        'no-console': 'error',
        'no-unused-vars': ['off'],
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, args: 'none' }],
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid',
            },
            { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
            { selector: 'property', format: ['camelCase', 'PascalCase'] },
            { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'typeLike', format: ['PascalCase'] },
            { selector: 'enumMember', format: ['PascalCase'] },
        ],
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'off',
    },
}

const typescriptRecommendedConfigs = [
    ...tsEslint.configs.recommended.map((config) => ({
        ...config,
        files: tsFiles,
        ignores,
    })),
    ...tsEslint.configs.stylistic.map((config) => ({
        ...config,
        files: tsFiles,
        ignores,
    })),
]

export default tsEslint.config(
    jsEslint.configs.recommended,
    cjsConfig,
    esmConfig,
    ...typescriptRecommendedConfigs,
    typescriptConfig,
)
