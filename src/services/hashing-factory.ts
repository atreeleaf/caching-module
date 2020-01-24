import md5 from 'md5';
const CRC32 = (): string => '1616297f'; // sample hash func
const FNV1A = (): string => 'faf1eafe';
import { HashStrategiesEnum } from '../hashEnum';

/**
 * Takes in a string of desired hash strategy and outputs the correct corresponding hash function, or uses custom hash function injected by user.
 * @param hashStrategy string {HashStrategiesEnum} | {function<custom hash func>>}
 * @returns newHashStrategy {Function}
 */
const hashFuncFactory = (hashStrategy: HashStrategiesEnum | Function): Function => {
    let desiredHashFunction: Function;
    if (typeof hashStrategy === 'string') {
        // if hashStrategy is a function, then we can just use it directly
        switch (hashStrategy) {
            case 'CRC32':
                desiredHashFunction = CRC32;
                break;
            case 'FNV1A':
                desiredHashFunction = FNV1A;
                break;
            case 'MD5':
                desiredHashFunction = md5;
                break;
            default:
                throw new Error(`${hashStrategy} is not a supported hashStrategy.`);
        }
    } else if (typeof hashStrategy === 'function') {
        desiredHashFunction = hashStrategy;
    } else {
        throw new Error('Please input a supported hash strategy or custom hash function.');
    }
    return desiredHashFunction;
};

export default hashFuncFactory;
