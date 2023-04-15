import { RegularExpressions } from "./regularExpressions";

export const ErrorMessage = {
    INVALID_CATEGORY: 'Érvénytelen kategória',
    INVALID_URL: 'URL formátum nem megfelelő',
    REQUIRED: 'Ki kell tölteni',
    IS_INT: 'Egész számot adj meg!',
    IS_NUMBER: 'Számot adj meg!',
    IS_POSITIVE: 'Nagyobb mint nulla!',
    INVALID_EMAIL: 'Email formátum nem megfelelő',
    PASSWORDS_DO_NOT_MATCH: 'A jelszavak nem egyeznek',
    DO_NOT_MATCH: (prop1: string, prop2: string) => `${prop1} és ${prop2} nem egyezik`,
    MIN_LENGTH: (length: string) => `Legalább ${length} karakter`,
    MATCHES: (propName: string, pattern: string) => {
        let ret = "";
        switch (pattern) {
            case `${RegularExpressions.AT_LEAST_ONE_NUMBER}`: ret = `${propName}-be kell egy szám`; break;
        }
        return ret;
    }
}
