# rn-datepicker
React Native datepicker组件，数字年月日选项（IOS Android 通用）

# 安装
```
npm install rn-datepicker --save
```

# 使用
```
import DatePicker from 'rn-datepicker'


export default ({}) => {


    let datePickerProps = {
        maxDate: '2020-01-01',
        minDate: '1990-01-01',
        initalDate: '2000-01-01',
        title: '标题',
        tips: 'tips',
        modalVisible: true,
        hidePickers: hidePickersFun,
        submitDate: chooseDateFun
    
    };
    

    return (
        <View>
            <DatePicker  {...datePickerProps}/>
        </View>
    )
}

```


<img src="https://github.com/qfight/Pucker/blob/master/images/down.png" height="160" >



# 属性

| 名称             | 类型     | 描述    |
|-----------------|----------|---------|
| maxDate         | String   | 可选最大日期 |
| minDate         | String   | 可选最小日期 |
| initalDate      | String   | 初始显示时间 |
| title           | String   | 标题（确认取消按钮中间） |
| tips            | String   | 说明，选项上方 |
| modalVisible    | Boolean  | 显示/收起 |
| hidePickers     | Function | 隐藏方法 |
| stysubmitDate   | Function | 选中日期方法 |
