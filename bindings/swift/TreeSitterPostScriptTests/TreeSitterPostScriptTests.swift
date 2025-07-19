import XCTest
import SwiftTreeSitter
import TreeSitterPostscript

final class TreeSitterPostscriptTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_postscript())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Postscript grammar")
    }
}
