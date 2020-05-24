import React, { Fragment } from 'react';
import { Comment, Avatar, Empty, Icon } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';

// 商品评价
@observer
class CommodityEvaluation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            action: null
        };
    }

    componentDidMount() {
        this.props.pid && state.selcommentsData({
            pid: this.props.pid
        });
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.pid != nextProps.pid ){
            this.props.pid && nextProps.pid && state.selcommentsData({
                pid: nextProps.pid
            });
        }
    }

    // 喜欢 / 不喜欢
    handleLike = (type, index, item={} ) => {
        let { nums, setNums02 } = state;
        const { id } = item;
        nums = toJS(nums);

        this.setState({
            [`action${index}`]: type
        });
        let result = nums[index][type] == item[type] ? nums[index][type]+1 : nums[index][type];
        setNums02(index, type, result);
        if( type == 'agree' ){
            setNums02(index, 'disagree', item['disagree']);
        }else{
            setNums02(index, 'agree', item['agree']);
        }
        nums[index][type] == item[type] && state.agreecommentsData({
            id, type, 
            agreeNum: type == 'agree' ? result : item['agree'],
            disagreeNum: type == 'agree' ? item['disagree'] : result
        });
    }

    render() {
        const { commentList, nums } = state;
        const { oauthCode } = $state;
        return (
            <div className='CommodityEvaluation'>
                {
                    commentList.length ? (
                        <Fragment>
                            {
                                commentList.map((item, index) => {
                                    return (
                                        <Comment
                                            key={ item.id }
                                            actions={ oauthCode && oauthCode != 401 ? [
                                                <span key="comment-basic-agree">
                                                    <Icon
                                                        type="like"
                                                        theme={ this.state[`action${index}`] === 'agree' ? 'filled' : 'outlined' }
                                                        onClick={ this.handleLike.bind(this, 'agree', index, item) }
                                                    />
                                                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{ nums[index] && nums[index]['agree'] ? nums[index]['agree'] : 0 }</span>
                                                </span>,
                                                <span key="comment-basic-disagree">
                                                    <Icon
                                                        type="dislike"
                                                        theme={ this.state[`action${index}`] === 'disagree' ? 'filled' : 'outlined'}
                                                        onClick={ this.handleLike.bind(this, 'disagree', index, item) }
                                                    />
                                                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{ nums[index] && nums[index]['disagree'] ? nums[index]['disagree'] : 0 }</span>
                                                </span>
                                            ] : [] }
                                            author={ item.uname }
                                            avatar={ <Avatar src={ item.avatar ? PUBLIC_URL + item.avatar : '' } alt="avatar" /> }
                                            content={
                                                <p style={{ fontSize: '14px' }}>{ item.content }</p>
                                            }
                                            datetime={ item.commentTime }
                                        />
                                    );
                                })
                            }
                        </Fragment>
                    ) : (
                        <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description='暂无评价' />
                    )
                }
            </div>
        );
    }
}

export default CommodityEvaluation;