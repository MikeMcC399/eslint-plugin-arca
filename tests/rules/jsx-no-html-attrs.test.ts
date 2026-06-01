/**
 * @fileoverview Ensure that each import in the file is correctly ordered relative to the others
 * @author Maël Nison
 * @copyright 2016 Maël Nison. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

import rule         from 'eslint-plugin-arca/sources/rules/jsx-no-html-attrs';
import {RuleTester} from 'eslint';

const languageOptions = {sourceType: `module`, ecmaVersion: 2015, parserOptions: {ecmaFeatures: {jsx: true}}} as const;
const ruleTester = new RuleTester();

ruleTester.run(`jsx-no-html-attrs`, rule, {
  valid: [{
    code: `<foo className="test"/>\n`,
    languageOptions,
  }, {
    code: `<foo data-foo="bar"/>\n`,
    languageOptions,
  }, {
    code: `<foo data-fooBar="qux"/>\n`,
    languageOptions,
  }, {
    code: `<foo srcSet="qux"/>\n`,
    languageOptions,
  }],
  invalid: [{
    code: `<foo class="test"/>\n`,
    output: `<foo className="test"/>\n`,
    languageOptions,
    errors: [{message: `This HTML attribute isn't formatted for use in React code.`}],
  }, {
    code: `<foo data-foo-bar="qux"/>\n`,
    output: `<foo data-fooBar="qux"/>\n`,
    languageOptions,
    errors: [{message: `This HTML attribute isn't formatted for use in React code.`}],
  }, {
    code: `<foo foo-bar="qux"/>\n`,
    output: `<foo fooBar="qux"/>\n`,
    languageOptions,
    errors: [{message: `This HTML attribute isn't formatted for use in React code.`}],
  }, {
    code: `<foo srcset="qux"/>\n`,
    output: `<foo srcSet="qux"/>\n`,
    languageOptions,
    errors: [{message: `This HTML attribute isn't formatted for use in React code.`}],
  }],
});
