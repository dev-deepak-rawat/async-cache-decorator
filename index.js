const currTimeSec = () => Math.floor(Date.now() / 1000);

const shouldFetch = (time = '', comparator = '') => {
    const diff = currTimeSec() - time;
    return diff > comparator;
}

const getLocalStorage = (key = '') => JSON.parse(localStorage.getItem(key));

const setLocalStorage = (key = '', value) => localStorage.setItem(key, JSON.stringify({ timestamp: currTimeSec(), content: value }));

const asyncCacheDekorator = async ({ func, options = {}, args }) => {
    const { localStorageKey = '', cacheTimeInSec = '' } = options;
    const cache = getLocalStorage(localStorageKey);
    const { timestamp = '', content } = cache;
    const _shouldFetch = shouldFetch(timestamp, cacheTimeInSec);

    if (_shouldFetch) {
        const response = await func(args);
        setLocalStorage(localStorageKey, response);
        return response;
    }
    return content;
}

export default asyncCacheDekorator;
