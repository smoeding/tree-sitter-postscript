/**************************************************************************
 *
 * Copyright (c) 2024 Stefan Möding
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */


module.exports = grammar({
  name: "postscript",

  extras: $ => [
    $.comment,
    /\n/,
    /\r/,
    /\s/,
  ],

  externals: $ => [
    $.structure_comment,
    $.literal_string,
    $.hexadecimal_string,
    $.base85_string,
    $.numeric,
  ],

  rules: {
    document: $ => repeat(choice(
      $.structure_comment,
      $._element,
    )),

    _element: $ => choice(
      $.string,
      $.numeric,
      $.array,
      $.procedure,
      $.dictionary,
      $.operator,
      $.literal,
    ),

    array: $ => seq('[', repeat($._element), ']'),
    procedure: $ => seq('{', repeat($._element), '}'),
    dictionary: $ => seq('<<', repeat($._element), '>>'),

    operator: _ => /[!"#$&'*+,\-.0-9:;=?@A-Z^_`a-z|~]+/,
    literal: _ => /\/\/?[!"#$&'*+,\-.0-9:;=?@A-Z^_`a-z|~]+/,

    string: $ => choice(
      seq('(', repeat(choice($.literal_string, $.escape_sequence)), ')'),
      seq('<', repeat($.hexadecimal_string), '>'),
      seq('<~', repeat($.base85_string), '~>'),
    ),

    escape_sequence: _ => choice(
      /\\[0-9]{1,3}/,
      /\\[^0-9]/,
    ),

    comment: _ => /%.*/,
  },
});
