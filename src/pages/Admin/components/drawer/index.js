import React from 'react';
import { Drawer } from 'antd';
import { observer } from 'mobx-react';

@observer
class CustomDrawer extends React.Component {
    render() {
        const {
            title='标题', closeDrawer, drawerVisible=false, children='', btnChildren='', className='', width=720
        } = this.props;
        return (
            <Drawer
                title={ title }
                width={ width }
                onClose={ closeDrawer }
                visible={ drawerVisible }
                bodyStyle={{ paddingBottom: 80 }}
                destroyOnClose={ true }
                className={ className }
            >
                { children }
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    { btnChildren }
                </div>
            </Drawer>
        );
    }
}

export default CustomDrawer;