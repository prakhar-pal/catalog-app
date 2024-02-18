function assert(param, message) {
    if(param && Array.isArray(param)) {
        param.map(p => {
            if(!!p) {
                throw new Error(message);
            }
        })
    }else if(!!param) {
        throw new Error(message);
    }
}

module.exports = {
    assert
}