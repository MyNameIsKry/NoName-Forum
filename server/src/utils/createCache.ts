import NodeCache from "node-cache";

export const createNodeCache = (stdTTL: number) => {
    const cache = new NodeCache({
        stdTTL: stdTTL,
        checkperiod: 10,
        deleteOnExpire: true
    });
    return cache;
};
