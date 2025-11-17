module.exports = {
  defaultSeverity: 'warning',
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'variants', 'responsive', 'screen'],
        severity: 'off',
      },
    ],
    'order/properties-order': [
      [
        {
          groupName: 'Positioning',
          properties: ['position', 'z-index', 'top', 'right', 'bottom', 'left'],
        },
        {
          groupName: 'Display & Box Model',
          properties: [
            'display',
            'overflow',
            'box-sizing',
            'width',
            'height',
            'padding',
            'margin',
            'border',
            'border-top',
            'border-right',
            'border-bottom',
            'border-left',
            'border-radius',
          ],
        },
        {
          groupName: 'Color',
          properties: ['background', 'color'],
        },
        {
          groupName: 'Text',
          properties: [
            'font',
            'font-family',
            'font-size',
            'line-height',
            'text-align',
            'text-transform',
            'text-decoration',
            'letter-spacing',
            'word-break',
            'white-space',
          ],
        },
        {
          groupName: 'Other',
          properties: ['cursor', 'pointer-events', 'transition', 'transform', 'animation', 'box-shadow'],
        },
      ],
      { unspecified: 'ignore', severity: 'warning' },
    ],
  },
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**', 'CHANGELOG.md'],
};