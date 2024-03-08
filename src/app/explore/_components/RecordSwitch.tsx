import { ConfigProvider, Switch } from 'antd';

type RecordSwitchProps = {
    onChange: (checked: boolean) => void; // Function that takes a boolean and returns void
    checked: boolean; // Boolean to indicate if the switch is checked
};

const RecordSwitch = ({ onChange, checked }: RecordSwitchProps) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#2FD714',
                },
            }}>
            <Switch checked={checked} size="small" onChange={onChange} />
        </ConfigProvider>
    );
};

export default RecordSwitch;
