/**
 * @file rem比例，在不同的屏幕尺寸上缩放
 * @author zdying
 */

'use strict';

import {StyleSheet, Dimensions} from 'react-native';

/**
 * 屏幕尺寸
 */
const {height:HEIGHT, width:WIDTH} = Dimensions.get('window');

/**
 * 基准宽度（也就是UI给的PSD中Iphone的宽度）
 * 注意：
 *      我们的设计师一般给的设计图都x2了，所以给的是750，
 *      而我们在写代码的时候，一般手动x0.5了，所以这里是375
 * @type {number}
 */
const BASE_WIDTH = 375;


/**
 * 计算一个rem值，计算方法：
 *    1:x = BASE_WIDTH:WIDTH ==> x = 1 * WIDTH / BASE_WIDTh
 */
export default 1 * WIDTH / BASE_WIDTH;