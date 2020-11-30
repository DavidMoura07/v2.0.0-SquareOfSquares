const enum ErrorsTypes {
    NOT_FOUND = "NOT_FOUND",
    TERRITORY_OVERLAY = "TERRITORY_OVERLAY",
    INCOMPLETE_DATA = "TERRITORY_OVERLAY"
}

type TypesStrings = keyof typeof ErrorsTypes;