import { t } from "elysia";

export const paginationDTO = {
    page: t.Optional(t.Numeric()),
    pageSize: t.Optional(t.Numeric())
}
