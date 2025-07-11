// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterPostScript",
    products: [
        .library(name: "TreeSitterPostScript", targets: ["TreeSitterPostScript"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterPostScript",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                "src/scanner.c",
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterPostScriptTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterPostScript",
            ],
            path: "bindings/swift/TreeSitterPostScriptTests"
        )
    ],
    cLanguageStandard: .c11
)
