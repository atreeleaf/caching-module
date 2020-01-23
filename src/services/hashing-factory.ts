process.env.NODE_CONFIG_DIR = '../config'
import { IConfig } from "config"
import * as config from "config"
import md5 from 'md5'
const CRC32 = ():string => '1616297f' // sample hash func
const FNV1A = ():string => 'faf1eafe'



const hashFuncFactory = (config: IConfig) :Function => {
    let hashStrategy : Function;
    switch(config.get('hashStrategy')) {
        case "CRC32":
            hashStrategy = CRC32
            break;
        case "FNV1A":
            hashStrategy = FNV1A
            break;
        default:
            hashStrategy = md5
    }
    return hashStrategy
}

export default hashFuncFactory