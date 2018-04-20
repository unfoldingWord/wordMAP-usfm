export interface JSONObject {
    [key: string]: any
}

export default abstract class Compiler {

    /**
     * Runs the compiler on the input
     * @param {object} input - the json to compile
     * @return {string}
     */
    public run(input: JSONObject): string {
        const verses: string[] = [];
        if(Array.isArray(input)) {
            for(let i = 0; i < input.length; i ++) {
                verses.push(this.compileVerse(input[i]));
            }
        } else {
            verses.push(this.compileVerse(input));
        }
        return verses.join("\n");
    }

    /**
     * Compiles a single verse
     * @param {object} input - the verse to compile
     * @return {string}
     */
    abstract compileVerse(input: JSONObject): string;
}
