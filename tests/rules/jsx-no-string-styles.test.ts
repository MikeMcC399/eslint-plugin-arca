/**
 * @fileoverview Ensure that each import in the file is correctly ordered relative to the others
 * @author Maël Nison
 * @copyright 2016 Maël Nison. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

import rule         from 'eslint-plugin-arca/sources/rules/jsx-no-string-styles';
import {RuleTester} from 'eslint';

const languageOptions = {sourceType: `module`, ecmaVersion: 2015, parserOptions: {ecmaFeatures: {jsx: true}}} as const;
const ruleTester = new RuleTester();

ruleTester.run(`jsx-no-string-styles`, rule, {
  valid: [{
    code: `<foo style={{hello: "world"}}/>\n`,
    languageOptions,
  }, {
    code: `<foo style={{helloWorld: "foo"}}/>\n`,
    languageOptions,
  }],
  invalid: [{
    code: `<foo style="hello: world"/>\n`,
    output: `<foo style={{"hello":"world"}}/>\n`,
    languageOptions,
    errors: [{message: `Style props must be passed as objects.`}],
  }, {
    code: `<foo style={"hello: world"}/>\n`,
    output: `<foo style={{"hello":"world"}}/>\n`,
    languageOptions,
    errors: [{message: `Style props must be passed as objects.`}],
  }, {
    code: `<foo style={\`hello: world\`}/>\n`,
    output: `<foo style={{"hello":"world"}}/>\n`,
    languageOptions,
    errors: [{message: `Style props must be passed as objects.`}],
  }, {
    code: `<foo style="hello: world; foo: bar"/>\n`,
    output: `<foo style={{"hello":"world","foo":"bar"}}/>\n`,
    languageOptions,
    errors: [{message: `Style props must be passed as objects.`}],
  }, {
    code: `<foo style="hello-world: foo; foo-bar-baz: qux"/>\n`,
    output: `<foo style={{"helloWorld":"foo","fooBarBaz":"qux"}}/>\n`,
    languageOptions,
    errors: [{message: `Style props must be passed as objects.`}],
  }, {
    code: `<foo style="stroke-miterlimit: 1; fill: none; stroke-width: 10px; clip-path: url(#id); stroke: rgb(66, 66, 66);"/>\n`,
    output: `<foo style={{"strokeMiterlimit":1,"fill":"none","strokeWidth":10,"clipPath":"url(#id)","stroke":"rgb(66, 66, 66)"}}/>\n`,
    languageOptions,
    errors: [{message: `Style props must be passed as objects.`}],
  }],
});
