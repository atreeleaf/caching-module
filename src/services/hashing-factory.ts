import md5 from 'md5';
const CRC32 = (): string => '1616297f'; // sample hash func
const FNV1A = (): string => 'faf1eafe';
import { HashStrategiesEnum } from '../hashEnum';

/**
 * Takes in a string of desired hash strategy and outputs the correct corresponding hash function
 * @enum hashStrategy {HashStrategies}
 * @returns newHashStrategy {Function}
 */
const hashFuncFactory = (hashStrategy: HashStrategiesEnum): Function => {
    let desiredHashFunction: Function;
    switch (hashStrategy) {
        case 'CRC32':
            desiredHashFunction = CRC32;
            break;
        case 'FNV1A':
            desiredHashFunction = FNV1A;
            break;
        default:
            desiredHashFunction = md5;
    }
    return desiredHashFunction;
};

export default hashFuncFactory;
