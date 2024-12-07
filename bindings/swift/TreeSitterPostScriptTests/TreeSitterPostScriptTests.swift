import XCTest
import SwiftTreeSitter
import TreeSitterPostScript

final class TreeSitterPostScriptTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_postscript())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading PostScript grammar")
    }
}
