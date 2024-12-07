/**
 * @file PostScript grammar for tree-sitter
 * @author Stefan Möding <stm@kill-9.net>
 * @license BSD-2-Clause
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "postscript",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
