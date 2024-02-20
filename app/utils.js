import path from 'node:path';
import { fileURLToPath } from 'node:url';
function assert(param, message) {
    if(param && Array.isArray(param)) {
        param.map(p => {
            if(!p) {
                throw new Error(message);
            }
        })
    }else if(!!param) {
        throw new Error(message);
    }
}

/**
 * @method getCurrentModuleDetails - equivalent to __dirname, __filename in
 */
function getCurrentModuleDetails(meta) {
    const filename = fileURLToPath(meta.url);
    const dirname = path.dirname(filename);
    return {
        dirname,
        filename
    };
}


export {
    assert,
    getCurrentModuleDetails
}
