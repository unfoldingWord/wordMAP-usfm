import {Token} from "wordmap-lexer";
import Lexer from "wordmap-lexer/dist/Lexer";

/**
 * Represents a sentence
 */
export default class Sentence {

    /**
     * Loads a sentence from json
     * @param json
     * @return {Sentence}
     */
    public static fromJson(json: any): Sentence {
        const sentence = new Sentence();
        if (json.tokens && json.tokens.length && typeof json.tokens[0] === "string") {
            sentence.sentenceTokens = Lexer.tokenizeWords(json.tokens);
        } else {
            for (const t of json.tokens) {
                sentence.sentenceTokens.push(new Token({text: t.text, occurrence: t.occurrence, occurrences: t.occurrences}));
            }
        }

        sentence.sentenceText = json.text;
        sentence.contextID = json.metadata.contextId;
        return sentence;
    }

    private sentenceText: string = "";

    get text() {
        return this.sentenceText;
    }

    private sentenceTokens: Token[] = [];

    get tokens(): Token[] {
        return this.sentenceTokens;
    }

    /**
     * Returns the length of the sentence in tokens
     */
    get length(): number {
        return this.sentenceTokens.length;
    }

    private contextID: string = "";

    get context() {
        return this.contextID;
    }

    /**
     * Safely retrieves a token from the sentence
     * @param index
     */
    public getTokenSafely(index: number): Token {
        if (index >= 0 && index < this.sentenceTokens.length) {
            return this.sentenceTokens[index];
        } else {
            throw new Error(`Token index "${index}" is out of bounds. Accepted range is [0...${this.sentenceTokens.length - 1}]`);
        }
    }
}
