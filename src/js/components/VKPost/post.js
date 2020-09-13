import React from 'react';
import { connect } from 'react-redux';

import {
	Cell,
	Separator,
	Div,
	List,
	Avatar,
	InfoRow,
	ModalPage,
	ModalPageHeader,
	PanelHeaderButton,
	withPlatform,
	RichCell,
	Link,
	Title,
	IOS,
} from '@vkontakte/vkui';

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';

class VKPost extends React.Component {
	render() {
		const { id, post, platform } = this.props;

		return (
			<div>
				<Link href={`vk.com/app7595116?campain=${post._id}`} target="_blank">
					<RichCell
						className="custom-cell"
						multiline={true}
						before={
							<div className="icon-rich-cell" style={{ width: '90px', height: '90px' }}>
								<img
									src={post.picture}
									height="90"
									alt="Фотография к посту"
									width="90"
									className="icon-rich-cell photo-card"
								></img>
							</div>
						}
						caption={post.description}
					>
						<Title weight="semibold" style={{ marginBottom: '8px' }}>
							{post.title}
						</Title>
					</RichCell>
				</Link>
			</div>
		);
	}
}

export default withPlatform(connect()(VKPost));
