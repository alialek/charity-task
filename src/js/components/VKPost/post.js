import React from 'react';
import {connect} from 'react-redux';

import {Cell,Separator, Div, List, Avatar, InfoRow, ModalPage, ModalPageHeader, PanelHeaderButton, withPlatform, IOS} from "@vkontakte/vkui";

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';

class VKPost extends React.Component {

    render() {
        const {id, post, platform} = this.props;

        return (
            <div >

            </div>
        );
    }

}

export default withPlatform(connect()(VKPost));
