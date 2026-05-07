/**
 * @fileoverview Require from keywords to be aligned
 * @author Maël Nison
 * @copyright 2016 Maël Nison. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

import type {Rule}        from 'eslint';
import type * as ESTree   from 'estree';

import * as variableUtils from '../utils/variableUtils';

const rule: Rule.RuleModule = {
  meta: {
    fixable: `code`,
  },

  create(context) {
    let isFirstElement = true;

    function reportMissingReactImport(node: ESTree.Node) {
      const sourceCode = context.sourceCode;

      return context.report({
        node,
        message: `Missing React import.`,

        fix (fixer) {
          const lastToken = sourceCode.getLastToken(sourceCode.ast)!;
          return fixer.insertTextAfter(lastToken, `\nimport * as React from 'react';`);
        },
      });
    }

    function checkIfReactIsInScope(node: ESTree.Node) {
      if (!isFirstElement)
        return;

      isFirstElement = false;

      const variables = variableUtils.variablesInScope(context, node);
      if (variableUtils.findVariable(variables, `React`))
        return;

      reportMissingReactImport(node);
    }

    return {
      JSXOpeningElement: checkIfReactIsInScope,
      JSXOpeningFragment: checkIfReactIsInScope,
    };
  },
};

// eslint-disable-next-line arca/no-default-export
export default rule;
