import type { InitializeResult, ServerCapabilities } from '@volar/language-server';
import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import { getLanguageServer } from '../server.js';

describe('Initialize', async () => {
	let initializeResult: InitializeResult;

	before(async function () {
		// First init can sometimes be slow in CI, even though the rest of the tests will be fast.
		this.timeout(50000);
		initializeResult = (await getLanguageServer()).initializeResult;
	});

	it('Can start server', async () => {
		expect(initializeResult).not.be.null;
	});

	it('Has proper capabilities', async () => {
		const capabilities: ServerCapabilities = {
			textDocumentSync: 2,
			workspace: {
				workspaceFolders: {
					changeNotifications: true,
					supported: true,
				},
			},
			selectionRangeProvider: true,
			foldingRangeProvider: true,
			linkedEditingRangeProvider: true,
			colorProvider: true,
			documentSymbolProvider: true,
			documentFormattingProvider: true,
			documentRangeFormattingProvider: true,
			documentOnTypeFormattingProvider: {
				firstTriggerCharacter: ';',
				moreTriggerCharacter: ['}', '\n'],
			},
			referencesProvider: true,
			implementationProvider: true,
			definitionProvider: true,
			typeDefinitionProvider: true,
			callHierarchyProvider: true,
			hoverProvider: true,
			renameProvider: { prepareProvider: true },
			signatureHelpProvider: { triggerCharacters: ['(', ',', '<'], retriggerCharacters: [')'] },
			completionProvider: {
				triggerCharacters: [
					'.',
					':',
					'<',
					'"',
					'=',
					'/',
					'-',
					'>',
					'+',
					'^',
					'*',
					'(',
					')',
					'#',
					'[',
					']',
					'$',
					'@',
					'{',
					'}',
					"'",
					'`',
					' ',
				],
				resolveProvider: true,
			},
			documentHighlightProvider: true,
			documentLinkProvider: {},
			codeLensProvider: {},
			semanticTokensProvider: {
				range: true,
				full: false,
				legend: {
					tokenTypes: [
						'namespace',
						'class',
						'enum',
						'interface',
						'typeParameter',
						'type',
						'parameter',
						'variable',
						'property',
						'enumMember',
						'function',
						'method',
					],
					tokenModifiers: [
						'declaration',
						'readonly',
						'static',
						'async',
						'defaultLibrary',
						'local',
					],
				},
			},
			codeActionProvider: {
				codeActionKinds: [
					'',
					'quickfix',
					'refactor',
					'refactor.extract',
					'refactor.inline',
					'refactor.rewrite',
					'source',
					'source.fixAll',
					'source.organizeImports',
				],
				resolveProvider: true,
			},
			inlayHintProvider: {},
			workspaceSymbolProvider: true,
		};

		expect(initializeResult.capabilities).to.deep.equal(capabilities);
	});
});
