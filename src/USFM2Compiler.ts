import Compiler, {JSONObject} from "./Compiler";

/**
 * Compiles MAP data to USFM 2
 */
export default class USFM2Compiler extends Compiler {

    /**
     * Compiles a single verse to usfm
     * @param {JSONObject} verse
     * @return {string}
     */
    public compileVerse(verse: JSONObject): string {
        const words: string[] = [];
        if(verse.hasOwnProperty("alignments")) {
            for(const alignment of verse["alignments"]) {
                const ngram = alignment["targetNgram"];
                for(const token of ngram) {
                    words.push(token["text"]);
                }
            }
        } else {
            throw new Error("Invalid verse object. Missing key 'alignments'");
        }
        return words.join(" ");
    }
}
