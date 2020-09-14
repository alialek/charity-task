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
} from '@vkontakte/vkui';

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';

class VKPost extends React.Component {
	constructor(props) {
		super(props);
		this.go = this.go.bind(this);
		this.getAmount = this.getAmount.bind(this)
	}
	go(id) {
		window.location.hash = `#campaign=${id}`;
		this.props.setStory('viewer', 'base');
	}
	getAmount(sum) {
		let i = 0;
		setInterval(() => {
			i++
			return sum /= i
		}, 1000)
	}
	render() {
		const { id, post, platform } = this.props;

		return (
			<Div className="snippet">
				<div style={{ backgroundImage: `url(${post.picture})` }} className="snippet__picture"></div>
				<Div style={{paddingTop: '8px', paddingBottom: '8px'}}>
					<Text weight="semibold">{post.title}</Text>
					<Caption
						level="1"
						weight="regular"
					>{`${post.author.name} · Закончится ${post.author.until}`}</Caption>
					<Separator />
				</Div>
				<Div>
					<div style={{display: 'flex', justifyContent: "space-between"}}>
						<div>
							<Caption level="1" weight="regular">{`Собрано ${this.getAmount(post.sum)} ₽ из ${post.sum} ₽`}</Caption>
						</div>
						<div>
							<Button onClick={() => this.go(post._id)} mode="outline" >Помочь</Button>
						</div>
					</div>
				</Div>
			</Div>
		);
	}
}
const mapDispatchToProps = {
	setStory,
};

export default withPlatform(connect(null, mapDispatchToProps)(VKPost));
