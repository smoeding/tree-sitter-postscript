package tree_sitter_postscript_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_postscript "github.com/smoeding/tree-sitter-postscript/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_postscript.Language())
	if language == nil {
		t.Errorf("Error loading Postscript grammar")
	}
}
