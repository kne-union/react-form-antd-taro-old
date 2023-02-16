import {View, Text} from '@tarojs/components'
import {List} from '@kne/antd-taro';
import Form, {
  Input, TextArea, Selector, Switch, SubmitButton, Picker, Slider, CheckList
} from '../../react-form-antd-taro';
import '@kne/antd-taro/lib/antd-taro.css';
import './index.scss'

const Index = () => {
  return <View className='index'>
    <Form onSubmit={(data) => {
      console.log('>>>>>>', data);
    }}>
      <List mode="card">
        <Input.Item name="name" label="姓名"/>
        <Input.Item name="phone" label="电话" rule="REQ TEL"/>
        <Selector.Item name="type" label="类型" rule="REQ" options={[{
          label: '选项一', value: '1',
        }, {
          label: '选项二', value: '2', disabled: true,
        }, {
          label: '选项三', value: '3',
        },]}/>
        <Picker.Item name="picker" label="选项" rule="REQ"
                     columns={[[{label: "选项一", value: "1"}, {label: "选项二", value: "2"}, {
                       label: "选项三", value: "3"
                     }], [{label: "选项一", value: "1"}, {label: "选项二", value: "2"}, {label: "选项三", value: "3"}]]}
        />
        <Picker.DatePicker.Item name="date" label="日期"/>
        <Picker.DatePickerRange.Item name="dateRange" label="日期范围" soFar/>
        <Switch.Item name="pass" label="是否通过"/>
        <Slider.Item name="count" label="数量"/>
        <CheckList.Item name="list" label="列表" options={[{label: "选项一", value: "1"}, {label: "选项二", value: "2"}, {label: "选项三", value: "3"}]}/>
        <TextArea.Item name="des" label="描述"/>
      </List>
      <SubmitButton>提交</SubmitButton>
    </Form>
    <Text>Hello world!</Text>
  </View>;
};

export default Index;
