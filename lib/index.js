/**
 * @file
 * @author VidaPu, jiamei.yao
 */

'use strict';

import React from 'react';
import { View, Text, TextInput, StyleSheet, Modal } from 'react-native';
import { Button, Picker } from 'qunar-react-native';
import rem from './rem';

/**
 * datepicker组件
 * @param {String} initalDate 线条颜色
 * @param {String} maxDate 可选最大日期
 * @param {String} minDate 可选最小日期
 * @param {String} title 标题（确认取消按钮中间）
 * @param {String} tips 说明，选项上方
 * @param {Boolean} modalVisible 显示/收起
 * @param {Function} hidePickers 隐藏方法
 * @param {Function} submitDate 选中日期方法
 * @returns {Component}
 */

export default class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            dateValue: '1980-01-01'
        };
    }

    componentWillMount() {
        if(this.props.initalDate) {
            this.setState({
                dateValue: this.props.initalDate
            })
        }
    }

    render() {
        let { maxDate, tips, title, minDate} = this.props;
        let updateDate = this.updateDate.bind(this);
        let dateArr = this.state.dateValue.split('-');
        let year = dateArr[0] || '1980';
        let month = dateArr[1] || '01';
        let day = dateArr[2] || '01';

        let {years, months, days} = this.setOptions(year, month, day, minDate, maxDate);

        return (
            <Modal visible={this.props.modalVisible}
                   transparent={true}
                   animationType="fade"
                   onRequestClose={this.onCancelHandler.bind(this)}>
                <View style={styles.body}>
                    <View style={styles.picker}>
                        <View style={styles.pickerCtrl}>
                            <Text style={styles.pickerBtn} onPress={this.onCancelHandler.bind(this)}>取消</Text>
                            <Text style={styles.pickerBtn}>{title}</Text>
                            <Text style={styles.pickerBtn} onPress={this.onSubmitHandler.bind(this)}>确定</Text>
                        </View>
                        {tips ? <View style={{alignItems: 'center'}}><Text style={styles.pickerTips}>{tips}</Text></View>: null}
                        <View style={styles.datePicker}>
                            <Picker
                                itemStyle={styles.datePickerItem}
                                selectedValue={year}
                                onValueChange={(value) => updateDate([value, month, day].join('-'))}>
                                {years.map((year) => {
                                    return <Picker.Item key={year} label={year+'年'} value={year} />
                                })}
                            </Picker>
                            <Picker
                                itemStyle={styles.datePickerItem}
                                selectedValue={month}
                                onValueChange={(value) => updateDate([year, value, day].join('-'))}>
                                {months.map((month) => {
                                    return <Picker.Item key={month} label={(+month)+'月'} value={month} />
                                })}
                            </Picker>
                            <Picker
                                itemStyle={styles.datePickerItem}
                                selectedValue={day}
                                onValueChange={(value) => updateDate([year, month, value].join('-'))}>
                                {days.map((day) => {
                                    return <Picker.Item key={day} label={(+day)+'日'} value={day} />
                                })}
                            </Picker>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    setOptions(year, month, day, minDate='1900-01-01', maxDate) {
        let mDateArr = maxDate.split('-');
        let mYear = parseInt(mDateArr[0], 10);
        let mMonth = parseInt(mDateArr[1], 10);
        let mDate = parseInt(mDateArr[2], 10);

        let minDateArr = minDate.split('-');
        let years = [], months = [], days = [];
        let maxYear = mYear, maxMonth = 12, maxDay = 0;
        let minYear = parseInt(minDateArr[0], 10),
            minMonth = parseInt(minDateArr[1], 10),
            minDay = parseInt(minDate[2], 10);
        let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

        switch (month){
            case '01':
            case '03':
            case '05':
            case '07':
            case '08':
            case '10':
            case '12':
                maxDay = 31;
                break;
            case '04':
            case '06':
            case '09':
            case '11':
                maxDay = 30;
                break;
            case '02':
                maxDay = isLeapYear ? 29 : 28;
                break;
            default:
                console.log('datePicker cal days error');
        }

        if(year == mYear) {
            maxMonth = mMonth;
            if(month == maxMonth){
                maxDay = mDate;
            }
        }

        //设置最小日期
        if(year != minYear) {
            minMonth = 1;
            minDay = 1;
        } else if(year == minYear && month != minMonth) {
            minDay = 1;
        }


        for(let y = minYear; y <= maxYear; y++){
            years.push(y + '');
        }
        for(let m = minMonth; m <= maxMonth; m++){
            months.push(('0' + m).substr(-2));
        }
        for(let d = minDay; d <= maxDay; d++){
            days.push(('0' + d).substr(-2));
        }

        return {years: years, months: months, days: days}
    }

    updateDate(date) {
        this.setState({dateValue: date});
    }

    onCancelHandler() {
        this.props.hidePickers();
    }

    onSubmitHandler() {
        this.props.hidePickers();
        this.props.submitDate(this.state.dateValue);
    }
}

const styles = StyleSheet.create({
    body: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },

    pickerCtrl: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },

    pickerBtn: {
        padding: 10,
        fontSize: 14,
        color: '#2aa9b9'
    },

    picker: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },

    pickerItem: {
        fontSize: 16
    },

    datePicker: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    datePickerItem: {
        width: 125 * rem
    }
});