import Compiler, {JSONObject} from "./Compiler";

/**
 * Compiles MAP data to USFM 3
 */
export default class USFM3Compiler extends Compiler {

    /**
     * Compiles a single verse to usfm
     * @param {JSONObject} verse
     * @return {string}
     */
    public compileVerse(verse: JSONObject): string {
        const lines: string[] = [];
        if (verse.hasOwnProperty("alignments")) {
            for (const alignment of verse["alignments"]) {
                const sourceNgram = alignment["sourceNgram"];

                // open alignment
                for (const token of sourceNgram) {
                    const meta: string[] = [];
                    meta.push(`x-content="${token.text}"`);
                    // TODO: grab additional metadata from token
                    lines.push(`\\zaln-s | ${meta.join(" ")}`)
                }

                // words
                const targetNgram = alignment["targetNgram"];
                for (const token of targetNgram) {
                    const meta: string[] = [];
                    // TODO: grab additional metadata from token
                    lines.push(`\\w ${token["text"]}|${meta.join(" ")}`);
                }

                // close alignment
                for (const token of sourceNgram) {
                    lines.push("\\zaln-e\\*");
                }
            }
        } else {
            throw new Error("Invalid verse object. Missing key 'alignments'");
        }
        return lines.join("\n");
    }
}
