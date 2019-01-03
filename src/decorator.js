import { getVersion } from './util'

/**
 * 为class添加版本信息的装饰器
 * @returns { Function } 返回装饰器方法
 */
export const addVersion = () => {
    return function (target){
        if (typeof target !== 'function') throw new Error('this is not a constructor')
        target.prototype.version = getVersion()
    }
}