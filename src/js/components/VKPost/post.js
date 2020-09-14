import React from 'react';
import { connect } from 'react-redux';
import { setStory } from '../../store/router/actions';
import {
	Cell,
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
	Text,
	Caption,
	Button,
	Separator,
	IOS,
	Progress,
} from '@vkontakte/vkui';

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';

class VKPost extends React.Component {
	constructor(props) {
		super(props);
		this.go = this.go.bind(this);
		this.getDate = this.getDate.bind(this);
		this.state = {
			have: Math.floor(Math.random() * Number(this.props.post.sum)),
		};
	}
	go(id) {
		window.location.hash = `#campaign=${id}`;
		this.props.setStory('viewer', 'base');
	}
	getDate(time) {
		const date = time.split('T')[0];
		const [year, mounth, day] = date.split('-');
		return `${day}.${mounth}.${year}`;
	}
	render() {
		const { id, post, platform } = this.props;

		return (
			<Div className="snippet">
				<div style={{ backgroundImage: `url(${post.picture})` }} className="snippet__picture"></div>
				<Div className="snippet_footer">
					<Div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
						<Text weight="semibold" style={{ marginBottom: '2px' }}>
							{post.title}
						</Text>
						<Caption level="1" weight="regular" style={{ color: '#818C99', marginBottom: '7px' }}>{`${
							post.author.name
						} · Закончится ${this.getDate(post.until)}`}</Caption>
						<Separator wide />
					</Div>
					<Div style={{ paddingTop: '4px' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div style={{ width: '70%', textAlign: 'left' }}>
								<Caption
									level="1"
									weight="regular"
									style={{ marginBottom: '8px' }}
								>{`Собрано ${this.state.have} ₽ из ${post.sum} ₽`}</Caption>
								<InfoRow>
									<Progress value={(this.state.have / post.sum) * 100} />
								</InfoRow>
							</div>
							<div style={{ width: '30%', textAlign: 'right' }}>
								<Button onClick={() => this.go(post._id)} mode="outline">
									Помочь
								</Button>
							</div>
						</div>
					</Div>
				</Div>
			</Div>
		);
	}
}
const mapDispatchToProps = {
	setStory,
};

export default withPlatform(connect(null, mapDispatchToProps)(VKPost));
