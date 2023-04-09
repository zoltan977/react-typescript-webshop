import { RegularExpressions } from "./regularExpressions";

export const ErrorMessage = {
    UNAUTHORIZED:'Nincs hozzáférésed',
    PASSWORDS_DO_NOT_MATCH:'A jelszavaknak egyeznie kell',
    USER_EMAIL_ALREADY_EXISTS:'Ezzel az email-el már létezik felhasználó',
    PRODUCT_TITLE_ALREADY_EXISTS:'Ezzel a névvel már van termék',
    NOT_A_VALID_CATEGORY:'Nem érvényes kategória',
    NOT_A_VALID_USER:'Érvénytelen felhasználó',
    NOT_A_VALID_ID:'Érvénytelen id',
    NOT_NUMBER:'Nem szám',
    NOT_STRING:'Nem szöveg',
    NOT_POSITIVE:'Nem lehet negatív',
    NOT_INT:'Egész szám kell',
    INVALID_CREDENTIALS:'Felhasználónév vagy jelszó hibás',
    INVALID_URL:'URL formátum nem megfelelő',
    INVALID_EMAIL:'Email formátum nem megfelelő',
    DTO_VALIDATION_ERROR:'DTO_VALIDATION_ERROR',
    DATABASE_ERROR:'DATABASE_ERROR',
    NO_JWT_SECRET:'NO_JWT_SECRET',
    MIN_LENGTH: (length: string) => `Legalább ${length} karakter hosszú`,
    MATCHES: (propName: string, pattern: string) => {
        let ret = "";
        switch (pattern) {
            case `${RegularExpressions.AT_LEAST_ONE_NUMBER}`: ret = `${propName}-be kell hogy legyen egy szám`; break;
        }
        return ret;
    }
}