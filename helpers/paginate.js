"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalRow = exports.paginate = void 0;
const paginate = (page, pageSize) => {
    const offset = page * pageSize;
    const limit = pageSize;
    return { order: [
            ['apellido', 'ASC']
        ],
        offset, limit };
};
exports.paginate = paginate;
/**
 * @param count
 */
const totalRow = (count, pageSize) => {
    const pages = count / pageSize;
    if (pages.toString().includes(".")) {
        return parseInt(pages.toString()) + 1;
    }
    return pages;
};
exports.totalRow = totalRow;
