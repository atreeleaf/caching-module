import { HashStrategiesEnum } from '../hashEnum';
import { SHA1, SHA256, MD5 } from 'crypto-js';

/**
 * Supported Hash Strategies
 */
export type HashStrategies = keyof typeof HashStrategiesEnum;

/**
 * Takes in a string of desired hash strategy and outputs the correct corresponding hash function, or uses custom hash function injected by user.
 * @param hashStrategy string {HashStrategiesEnum} | {function<custom hash func>>}
 * @returns newHashStrategy {Function}
 */

const hashFuncFactory = (hashStrategy: HashStrategies): Function => {
    let desiredHashFunction: Function;
    switch (hashStrategy) {
        case 'SHA1':
            desiredHashFunction = SHA1;
            break;
        case 'SHA256':
            desiredHashFunction = SHA256;
            break;
        case 'MD5':
            desiredHashFunction = MD5;
            break;
        default:
            throw new Error(`${hashStrategy} is not a supported hashStrategy.`);
    }
    return desiredHashFunction;
};

export default hashFuncFactory;
