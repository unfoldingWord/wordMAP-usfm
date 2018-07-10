import Reference from "../Reference";

describe("Reference", () => {
    it("parses a context", () => {
        const result = Reference.buildFromContext("MAT001001");
        expect(result.book).toEqual("MAT");
        expect(result.chapter).toEqual(1);
        expect(result.verse).toEqual(1);
    });

    it("parses a large context", () => {
        const result = Reference.buildFromContext("MAT123456");
        expect(result.book).toEqual("MAT");
        expect(result.chapter).toEqual(123);
        expect(result.verse).toEqual(456);
    });

    it("parses an invalid context", () => {
        expect(() => {
            Reference.buildFromContext("MAT");
        }).toThrow();
    });

    it("renders as a string", () => {
        const reference = new Reference("GEN", 1, 1);
        expect(reference.toString()).toEqual("GEN 1:1");
        expect(`${reference}`).toEqual("GEN 1:1");
    });
});
