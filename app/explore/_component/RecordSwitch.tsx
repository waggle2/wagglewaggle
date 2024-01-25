'use client'
import { ConfigProvider, Switch } from 'antd';

const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
};
export default function RecordSwitch() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#2FD714',
                }
            }}>
            <Switch defaultChecked={false} size='small' onChange={onChange} />
        </ConfigProvider>
    )
}

